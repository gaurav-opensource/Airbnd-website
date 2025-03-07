const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
//PHASE-b 1
const ejsMate = require("ejs-mate");//1 create templet or layout

const ExpressError = require("./utils/ExpressError.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const listingRouter = require("./routes/listing.js");
const reviews= require("./routes/review.js");
const userRouter= require("./routes/user.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOption ={
  secret: 'connecthfjfdjfg',
  resave: false,
  saveUninitialized: true,
  cookie : {
    expires : Date.now() + 2* 24*60*60*1000,
    maxAge: 2* 24*60*60*1000,
    httpOnly: true
  },
  
};
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});


app.use(session(sessionOption));
app.use(flash());


 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());



 app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error =req.flash("error");
  res.locals.currUser =req.user;
 next();
 });





const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, error);
  } else {
    next();
  }
};


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);


// Review
//post Rougth





// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong!" } = err;
//  res.status(statusCode).render("error.ejs" , {message});
// res.status(statusCode).send(message);
// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});