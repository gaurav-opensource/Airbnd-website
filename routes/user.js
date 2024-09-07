const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.get("/signup",  userController.renderSignup);


router.post(
    "/signup",
     wrapAsync(userController.signup)
    );


router.get("/Login",userController.renderLogin);


router.post(
    "/Login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/Login",
        failureFlash: true,
        }),
        userController.Login,
      );

router.get("/logout",userController.logout);


module.exports = router;