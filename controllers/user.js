const User = require('../models/user.js');

//Signup Route
module.exports.signup = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        const registeredUser =  await User.register(newUser, password);


        //Automatic Signup Method.
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome');
            res.redirect('/listing');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

//Login Route
//Get Route
//Post Route

module.exports.loginget = async(req, res) => {
    res.render('./users/login.ejs');
}

module.exports.loginpost = async(req, res) => {
    let redirectUrl = res.locals.redirectUrl || '/listing';
    res.status(401).redirect(redirectUrl);
}


//Logout Route
//Get Route
module.exports.logout = async(req, res, next) => {
    req.logout((error) => {
        if (error) {
            next(error);
        }
        req.flash('success', 'You are logged out.');
        res.redirect('/listing');
    });
}