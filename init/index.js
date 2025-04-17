const mongoose = require("mongoose");
const initData = require("./listingdata.js");
const Listing = require("../models/listings.js");
const User = require("../models/user.js");


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
    initData.data = initData.data.map( (obj) => ({
        ...obj,
        owner: "68015309e86e35fc2acb9e1e"
    }));
    let res = await Listing.insertMany(initData.data);
}


initDB().then(() => {
    console.log(`Database initialized.`);
}).catch((err) => {
    console.log(err);
})

