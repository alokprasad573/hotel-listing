const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const  {  reviewSchema }  = require('../schema.js');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware.js');

const listingroutes = require("./listingroutes.js");


//Review route
//Post Route
router.post('/reviews', isLoggedIn,validateReview, wrapAsync( async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    newReview.author = req.user;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`);
}));

//Delete Review Route
router.delete('/reviews/:reviewId', isLoggedIn,isReviewAuthor, wrapAsync( async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!.")
    res.redirect(`/listing/${id}`);
}));

module.exports = router;