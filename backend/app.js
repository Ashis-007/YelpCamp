const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  flash = require("connect-flash");
const morgan = require("morgan");

const User = require("./schema/user");

const campgroundRoutes = require("./routes/campgrounds"),
  commentRoutes = require("./routes/comments"),
  authRoutes = require("./routes/auth");

// const seedDB = require("./seeds");
// seedDB();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(morgan("dev"));

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "What might this be...?",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.user = req.user; //passing user
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// LOCAL DATABASE
/* mongoose
  .connect("mongodb://localhost/yelpdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("===DB Connected==="))
  .catch((err) => {
    console.log(err);
  }); */

// CLOUD DATABASE
mongoose
  .connect(
    "mongodb+srv://ashis007:IamAshis007@cluster0-u0lk8.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("=== DB Connected ==="))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000);
