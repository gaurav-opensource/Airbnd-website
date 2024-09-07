const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const listingController =require("../controllers/listings.js");


const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg); // Ensure the error message is passed correctly
  } else {
    next();
  }
};

  router.route("/")
    .get(isLoggedIn,wrapAsync(listingController.index))   
    .post(
      isLoggedIn,
       validateListing,
       wrapAsync(listingController.createListing)
      );

  // New Route
  router.get("/new",isLoggedIn ,listingController.renderNewForm);



  router.route("/:id")
  .get(  wrapAsync(listingController.showListing))
  .put(  isLoggedIn,  wrapAsync(listingController.renderUpadetForm))
  .delete( isLoggedIn, validateListing,  wrapAsync(listingController.DeleteListing)
 );  // isOwner, 



 // Edit Route 
router.get("/:id/edit",
  isLoggedIn,
  // isOwner,
   wrapAsync(listingController.renderEditForm)
  );


  module.exports = router;
