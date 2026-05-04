const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const config = require('../services/config');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
    clientID: config.GITHUB.CLIENT_ID,
    clientSecret: config.GITHUB.CLIENT_SECRET,
    callbackURL: config.GITHUB.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;

    try {
        const userEmail = (profile.emails && profile.emails.length > 0) 
            ? profile.emails[0].value 
            : `${profile.username}@github.com`;
        // Garantir que o user do GitHub existe na tabela MySQL
        const [user, created] = await User.findOrCreate({
           where: { email: userEmail },
            defaults: {
                password: 'github_authenticated',
                firstName: profile.displayName || profile.username,
                lastName: '',}
        });
        
        return done(null, profile);
    } catch (err) {
        return done(err, null);
    }
}));
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE.CLIENT_ID, 
    clientSecret: config.GOOGLE.CLIENT_SECRET,
    callbackURL: config.GOOGLE.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = (profile.emails && profile.emails.length > 0) 
            ? profile.emails[0].value 
            : `${profile.id}@gmail.com`;

        const [user, created] = await User.findOrCreate({
            where: { email: userEmail },
            defaults: {
                password: 'google_authenticated', 
                firstName: profile.name?.givenName || profile.name?.displayName || 'Utilizador Google',
                lastName: profile.name?.familyName || 'Google'
            }
        });
        
        return done(null, user);
    } catch (err) {
        console.error("Erro no Passport Google:", err);
        return done(err, null);
    }
}));
passport.use(new DiscordStrategy({
    clientID: config.DISCORD.CLIENT_ID,
    clientSecret: config.DISCORD.CLIENT_SECRET,
    callbackURL: config.DISCORD.CALLBACK_URL,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = profile.email || `${profile.id}@discord.com`;
        const [user, created] = await User.findOrCreate({
            where: { email: userEmail },
            defaults: {
                password: 'discord_authenticated',
                firstName: profile.global_name || profile.username,
                lastName: ' '
            }
        });
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
module.exports = passport;