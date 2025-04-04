const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require("./models/listings.js");
const HomeList = require("./models/home.js");
const path = require('path');
const {urlencoded} = require("express");
const methodOverride = require("method-override");
const engine = require('ejs-mate')
const wrapAsync = require("./utlis/wrapAsync.js");
const ExpressError = require("./utlis/ExpressError.js");
const  listingSchema  = require('./schema.js');



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

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map ( (el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//home route
app.get('/home', wrapAsync( async (req, res) => {
   const homelist = await HomeList.find({})
    res.status(200).render('./listing/home.ejs', { hotels : homelist });
}));


//index route
app.get('/listing', wrapAsync (async (req, res) => {
    const hotels = await Listing.find({});
    res.status(200).render('./listing/index.ejs', { hotels });

}));


//new route
app.get('/listing/new', (req, res) => {
    res.status(200).render('./listing/new.ejs');
});


//Show route
app.get('/listing/:id', wrapAsync (async (req, res) => {
    try {
        let id = req.params.id;
        const hotel = await Listing.findById(id);
        res.status(200).render('./listing/show.ejs', { hotel });
    } catch (err) {
        next(err);
    }
}));


//Create Route
app.post('/listing', validateListing, wrapAsync (async (req, res) => {

    const newList = new Listing(req.body.list);
    await newList.save()
    res.redirect('/listing');

}));

//Edit route
app.get('/listing/:id/edit/', wrapAsync (async (req, res) => {
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.status(200).render('./listing/edit.ejs', { data });
}));

//Update route
app.put('/listing/:id', validateListing, wrapAsync( async (req, res) => {
    let id = req.params.id;
    let update = req.body.list;
    await Listing.findByIdAndUpdate(id,{...update})
    res.redirect(`/listing/${id}`);
}));

//Delete route
app.delete('/listing/:id/delete', wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.render('./listing/delete.ejs', { message: "Listing deleted successfully!" });
}));


app.all('*', (req, res,next) => {
    next(new ExpressError(404,'Page Not Found'));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('./listing/error.ejs', { message: message });
    // res.status(statusCode).send(message);
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}home`);

    DbConnect().then(() => {
        console.log(`${process.env.MONGO_URI}`);
    }).catch((err) => {
        console.log(err);
    })
})

