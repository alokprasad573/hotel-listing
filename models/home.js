const mongoose = require('mongoose');
const Schema = mongoose.Schema

const home = new Schema({
    HotelType: {
        type: String,
        required: true,
    },
    description : String,
    image : String,
})

const HomeList = mongoose.model('HomeList', home);
module.exports = HomeList;