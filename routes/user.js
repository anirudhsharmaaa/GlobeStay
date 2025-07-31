const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//render signup form
router.get("/signup", userController.renderSignupForm);

//signup Route
router.post("/signup", wrapAsync(userController.signup));


//render Login from
router.get("/login", userController.renderLoginForm);


//login Route
router.post("/login",
    saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect : '/login', 
    failureFlash : true,
  }), 
  userController.login);


//logout
router.get("/logout", userController.logout);



module.exports = router;

