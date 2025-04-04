const mongoose = require("mongoose");
const ListingData = require("./listingdata.js");
const Listing = require("../models/listings.js");
const HomeData = require("./homedata.js");
const HomeList = require("../models/home.js");

const MONGODB_URI = "mongodb://localhost:27017/HotelFinder";

let DbConnect = async () => {
    await mongoose.connect(MONGODB_URI);
}

DbConnect().then(() => {
    console.log(MONGODB_URI);
}).catch((err) => {
    console.log(err);
})


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(ListingData.data);
    await HomeList.deleteMany({});
    await HomeList.insertMany(HomeData.data);
}


initDB().then(() => {
    console.log(`Database initialized.`);
}).catch((err) => {
    console.log(err);
})

