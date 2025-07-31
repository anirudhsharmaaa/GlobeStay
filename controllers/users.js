const User = require("../models/user.js");



//render Signup Form
module.exports.renderSignupForm = (req, res)  => {
    res.render("users/signup.ejs");
};

//render Login from
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};



//signup Route
module.exports.signup = async(req, res) => {
    try{
      let {username, email, password} = req.body;
      const newUser = new User({email, username});
      const registredUser = await User.register(newUser, password);
      console.log(registredUser);
      req.login(registredUser , (err) => {
        if(err){
            next(err);
        }
        req.flash("success", "Welcome to GlobeStay :)");
        res.redirect("/listings");
      });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//login route
module.exports.login = async(req,res) => {
    req.flash("success","Welcome Back to GlobeStay :)")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


//logout
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "logged out Succcessfully");
        res.redirect("/listings");
    });
};