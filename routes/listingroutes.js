const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require("../models/listings.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const {listingSchema} = require('../schema.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');

//index route
router.get('/', wrapAsync(async (req, res) => {
    const hotels = await Listing.find({});
    res.status(200).render('./listing/index.ejs', {hotels});

}));


//new route
router.get('/new', isLoggedIn, (req, res) => {
    res.status(200).render('./listing/new.ejs');
});


//Show route
router.get('/:id', wrapAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        const hotel = await Listing.findById(id).populate({path: "reviews", populate: {path : "author"}}).populate("owner");
        if (!hotel) {
            req.flash('error', 'Listing does not exist!');
            res.redirect('/listing');
        } else {
            res.status(200).render('./listing/show.ejs', {hotel, currUser: req.user});
        }

    } catch (err) {
        next(err);
    }
}));


//Create Route
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newList = new Listing(req.body.list);
    newList.owner = req.user._id;
    await newList.save()
    req.flash("success", "New Listing created!.")
    res.redirect('/listing');

}));

//Edit route
router.get('/:id/edit/',isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.status(200).render('./listing/edit.ejs', {data});
}));

//Update route
router.put('/:id',
    isLoggedIn,
    isOwner,
    validateListing, wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.list})
    req.flash("success", "Listing updated!.")
    res.redirect(`/listing/${id}`);
}));

//Delete route
router.delete('/:id/delete', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!.")
    res.redirect(`/listing`);
}));

module.exports = router;