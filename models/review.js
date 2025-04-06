const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { reviewSchema } = require('../schema.js');
const User = require("./user.js");

const newReview = new Schema({
    name: {
        type: String,
        required: true,
    },
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Review = mongoose.model('Review',newReview);
module.exports = Review;