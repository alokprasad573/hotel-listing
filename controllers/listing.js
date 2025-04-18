const Listing = require('../models/listings.js');

module.exports.index = async (req, res) => {
    const hotels = await Listing.find({});
    res.status(200).render('./listing/index.ejs', {hotels});
}

module.exports.show = async (req, res, next) => {
    try {
        let id = req.params.id;
        const hotel = await Listing.findById(id).populate({path: "reviews", populate: {path : "author"}}).populate("owner");
        if (!hotel) {
            req.flash('error', 'Listing does not exist!');
            res.redirect('/listing');
        } else {
            res.status(200).render('./listing/show.ejs', {hotel, currUser: req.user});
        }

    } catch (err) {
        next(err);
    }
}

module.exports.create = async (req, res) => {
    const newList = new Listing(req.body.list);
    newList.owner = req.user._id;
    await newList.save()
    req.flash("success", "New Listing created!.")
    res.redirect('/listing');
}

module.exports.edit = async (req, res) => {
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.status(200).render('./listing/edit.ejs', {data});
}

module.exports.update = async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.list})
    req.flash("success", "Listing updated!.")
    res.redirect(`/listing/${id}`);
}

module.exports.destroy = async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!.")
    res.redirect(`/listing`);
}