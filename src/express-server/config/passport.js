const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
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
        // Garantir que o user do GitHub existe na tabela MySQL
        await User.findOrCreate({
            where: { username: profile.username },
            defaults: {
                password: 'github_authenticated',
                firstName: profile.displayName || profile.username,
                apiKey: `key_${profile.id}` // Gera a chave para o endpoint /users 
            }
        });
        
        return done(null, profile);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;