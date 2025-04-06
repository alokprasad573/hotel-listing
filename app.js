const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {urlencoded} = require("express");
const methodOverride = require("method-override");
const engine = require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require("./utlis/ExpressError.js");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingRoute = require('./routes/listingroutes.js');
const reviewRoute = require('./routes/reviewroutes.js');
const userRoute = require('./routes/userroutes.js');


dotenv.config();
const PORT = process.env.PORT || 8000;

//Connecting to Database
let DbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/home`);

    DbConnect().then(() => {
        console.log(`${process.env.MONGO_URI}`);
    }).catch((err) => {
        console.log(err);
    })
});


app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engine);

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

//Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.get('/', (req, res) => {
    res.send('I am root.')
})


app.use('/listing', listingRoute);
app.use('/listing/:id/reviews', reviewRoute);
app.use('/', userRoute);



app.all('*', (req, res,next) => {
    next(new ExpressError(404,'Page Not Found'));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('./listing/error.ejs', { message: message });
});




