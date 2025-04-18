const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require("../models/listings.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const {listingSchema} = require('../schema.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');
const {index, show, create, edit, update, destroy} = require('../controllers/listing.js');

//index route
router.get('/', wrapAsync(index));


//new route
router.get('/new', isLoggedIn, (req, res) => {
    res.status(200).render('./listing/new.ejs');
});


//Show route
router.get('/:id', wrapAsync(show));


//Create Route
router.post('/', isLoggedIn, validateListing, wrapAsync(create));

//Edit route
router.get('/:id/edit/',isLoggedIn, isOwner, wrapAsync(edit));

//Update route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(update));

//Delete route
router.delete('/:id/delete', isLoggedIn, isOwner, wrapAsync(destroy));

module.exports = router;