const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const listingroutes = require("./listingroutes.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const passport = require("passport");

router.get('/signup', (req, res) => {
    res.render('./users/signup.ejs');
})

router.post('/signup', wrapAsync(async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        const registeredUser =  await User.register(newUser, password);
        req.flash('success', 'Welcome');
        res.redirect('/listing');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));


router.get('/login', wrapAsync(async(req, res) => {
    res.render('./users/login.ejs');
}));

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
    wrapAsync(async(req, res) => {
    res.status(401).redirect('/listing');
}));

module.exports = router;