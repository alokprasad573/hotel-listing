const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const listingroutes = require("./listingroutes.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");

router.get('/signup', (req, res) => {
    res.render('./users/signup.ejs');
})

router.post('/signup', wrapAsync(async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        const registeredUser =  await User.register(newUser, password);


        //Automatic Signup Method.
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome');
            res.redirect('/listing');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));


router.get('/login', wrapAsync(async(req, res) => {
    res.render('./users/login.ejs');
}));

router.post('/login',
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
    wrapAsync(async(req, res) => {
    let redirectUrl = res.locals.redirectUrl || '/listing';
    res.status(401).redirect(redirectUrl);
}));


router.get('/logout', wrapAsync(async(req, res, next) => {
    req.logout((error) => {
        if (error) {
            next(error);
        }
        req.flash('success', 'You are logged out.');
        res.redirect('/listing');
    });
}))

module.exports = router;