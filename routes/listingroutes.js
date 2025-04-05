const express = require('express');
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const  { listingSchema, reviewSchema }  = require('../schema.js');

//Function for server side validation
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map ( (el) => el.message).join(",");

        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}



//index route
router.get('/', wrapAsync (async (req, res) => {
    const hotels = await Listing.find({});
    res.status(200).render('./listing/index.ejs', { hotels });

}));


//new route
router.get('/new', (req, res) => {
    res.status(200).render('./listing/new.ejs');
});


//Show route
router.get('/:id', wrapAsync (async (req, res, next) => {
    try {
        let id = req.params.id;
        const hotel = await Listing.findById(id).populate('reviews');
        res.status(200).render('./listing/show.ejs', { hotel });
    } catch (err) {
        next(err);
    }
}));


//Create Route
router.post('/', validateListing, wrapAsync (async (req, res) => {
    const newList = new Listing(req.body.list);
    await newList.save()
    res.redirect('/listing');

}));

//Edit route
router.get('/:id/edit/', wrapAsync (async (req, res) => {
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.status(200).render('./listing/edit.ejs', { data });
}));

//Update route
router.put('/:id', validateListing, wrapAsync( async (req, res) => {
    let id = req.params.id;
    let update = req.body.list;
    await Listing.findByIdAndUpdate(id,{...update})
    res.redirect(`/listing/${id}`);
}));

//Delete route
router.delete('/:id/delete', wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.render('./listing/delete.ejs', { message: "Listing deleted successfully!" });
}));

module.exports = router;