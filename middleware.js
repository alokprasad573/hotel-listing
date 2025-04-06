 const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const {listingSchema} = require('./schema.js');
const  {reviewSchema}  = require('./schema.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You are must be logged in.');
        return res.redirect('/login');
    } else {
        next();
    }
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found.');
        return res.redirect('/listings');
    }

    if (!listing.owner.equals(req.user?._id)) { // Use req.user instead of res.locals.currUser
        req.flash('error', 'You are not the owner of this listing.');
        return res.redirect(`/listing/${id}`);
    }

    next();
}


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    // let review = await Review.findById(reviewId);
    // if (!review) {
    //     req.flash("error", "Review not found.");
    //     return res.redirect(`/listing/${id}`);
    // }
    //
    let listings = await Listing.findById(id); // Fetch the actual listing document
    // if (!listings) {
    //     req.flash("error", "Listing not found.");
    //     return res.redirect(`/listing/${id}`);
    // }

    if (!listings.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listing/${id}`);
    }

    next();
};

//Function for server side validation
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");

        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


//Function for server side validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map ( (el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}