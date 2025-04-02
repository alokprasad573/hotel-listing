const mongoose = require("mongoose");
const Schema = mongoose.Schema

const newListings = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1741851374467-c53876940807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
        set: (val) => val === ""
            ? "https://images.unsplash.com/photo-1741851374467-c53876940807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
            : val,
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing", newListings)
module.exports = Listing
