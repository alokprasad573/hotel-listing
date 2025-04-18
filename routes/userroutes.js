const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const listingroutes = require("./listingroutes.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware")
const {signup, loginget, loginpost, logout} = require("../controllers/user.js");

//Signup Route
//Get Route
//Post Route
router.get('/signup', (req, res) => {
    res.render('./users/signup.ejs');
})

router.post('/signup', wrapAsync(signup));

//Login Route
//Get Route
//Post Route

router.get('/login', wrapAsync(loginget));

router.post('/login', saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
    wrapAsync(loginpost));

//Logout Route
//Get Route
router.get('/logout', wrapAsync(logout))

module.exports = router;