const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


router.post('/auth/apikey', async (req, res) => {
    const { apikey } = req.body;
    if (!apikey) return res.redirect('/');
    try {
        const user = await User.findOne({ where: { apiKey: apikey } });
        if (!user) return res.redirect('/?apikey_status=invalid');
        return res.redirect(`/?apikey_status=valid&name=${encodeURIComponent(user.firstName)}&email=${encodeURIComponent(user.email)}`);
    } catch (err) {
        res.redirect('/');
    }
});

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
    req.session.authMethod = 'github';
    req.session.save(() => { res.redirect("/"); });
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    req.session.authMethod = 'google';
    req.session.save(() => { res.redirect("/"); });
});

router.get("/auth/discord", passport.authenticate("discord", { scope: ["identify", "email"] }));
router.get("/auth/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    req.session.authMethod = 'discord';
    req.session.save(() => { res.redirect("/"); });
});

router.get("/auth/register", (req, res) => {
    res.render("register", { error: req.query.error });
});

router.post("/auth/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.redirect("/auth/register?error=email_exists");
        const newApiKey = crypto.randomBytes(32).toString('hex');
        await User.create({ firstName, lastName, email, password: password, apiKey: newApiKey });
        res.redirect("/?apikey_status=registered");
    } catch (err) {
        res.redirect("/auth/register?error=server_error");
    }
});

router.post("/auth/basic/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.redirect("/?error=invalid_credentials");
        }
        const loginUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
        req.login(loginUser, (err) => {
            if (err) return res.redirect("/?error=server_error");
            req.session.authMethod = 'basic';
            req.session.save(() => { res.redirect("/"); });
        });
    } catch (err) {
        res.redirect("/?error=server_error");
    }
});

router.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.authMethod = null;
        res.redirect("/");
    });
});

module.exports = router;