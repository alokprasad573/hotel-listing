const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const  {  reviewSchema }  = require('../schema.js');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware.js');
const {reviews, delreview} = require('../controllers/review.js');
const listingroutes = require("./listingroutes.js");


//Review route
//Post Route
router.post('/reviews', isLoggedIn,validateReview, wrapAsync(reviews));

//Delete Review Route
router.delete('/reviews/:reviewId', isLoggedIn,isReviewAuthor, wrapAsync(delreview));

module.exports = router;