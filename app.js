const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require("./models/listings.js");
const path = require('path');
const {urlencoded} = require("express");
const methodOverride = require("method-override");
const engine = require('ejs-mate')


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
}

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

    DbConnect().then(() => {
       console.log(`${process.env.MONGO_URI}`);
    }).catch((err) => {
        console.log(err);
    })
})


//Home route
app.get("/", (req, res) => {
    res.send("This is home page");
});


//index route
app.get('/listing', async (req, res) => {
    const hotels = await Listing.find({});
    res.status(200).render('./listing/index.ejs', { hotels });
});


//new route
app.get('/listing/new', (req, res) => {
    res.status(200).render('./listing/new.ejs');
});


//show route
app.get('/listing/:id', async (req, res) => {
    let id = req.params.id;
    const hotel = await Listing.findById(id);
    res.status(200).render('./listing/show.ejs', { hotel });
});

app.post('/listing', async (req, res) => {
    const newList = new Listing(req.body.list);
    await newList.save()
    res.redirect('/listing')
});


//edit route
app.get('/listing/:id/edit/', async (req, res) => {
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.status(200).render('./listing/edit.ejs', { data });
});

//update route
app.put('/listing/:id', async (req, res) => {
    let id = req.params.id;
    let update = req.body.list;
    await Listing.findByIdAndUpdate(id,{...update})
    res.redirect(`/listing/${id}`);
});

//delete route
app.delete('/listing/:id/delete', async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listing`);
});