const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const path = require('path');
const {urlencoded} = require("express");
const methodOverride = require("method-override");
const engine = require('ejs-mate')
const wrapAsync = require("./utlis/wrapAsync.js");
const ExpressError = require("./utlis/ExpressError.js");
const  { listingSchema }  = require('./schema.js');
const  { reviewSchema } = require('./schema.js');

const listingroutes = require('./routes/listingroutes.js');

dotenv.config();
const PORT = process.env.PORT || 8000;

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.engine('ejs', engine);

//Connecting to Database
let DbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

//Function for server side validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map ( (el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//home route
app.get('/home', wrapAsync( async (req, res) => {
    res.status(200).render('./listing/home.ejs');
}));

app.use('/listing', listingroutes);

//Review route
//Post Route

app.delete('/listing/:id/reviews/:reviewId',  wrapAsync( async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));

app.post('/listing/:id/reviews', validateReview, wrapAsync( async (req, res) => {
      const listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.reviews);
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();

     res.redirect(`/listing/${listing._id}`);
}));


//Delete Review Route
app.delete('/listing/:id/reviews/:reviewId',  wrapAsync( async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));




app.all('*', (req, res,next) => {
    next(new ExpressError(404,'Page Not Found'));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('./listing/error.ejs', { message: message });
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/home`);

    DbConnect().then(() => {
        console.log(`${process.env.MONGO_URI}`);
    }).catch((err) => {
        console.log(err);
    })
})

