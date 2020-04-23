const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  request = require("request"),
  path = require("path"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local");

const Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user");

const seedDB = require("./seeds");
// seedDB();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
  res.locals.user = req.user;
  next();
});

mongoose
  .connect("mongodb://localhost:27017/yelpdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("===DB Connected==="));

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log("Something went wrong!");
    } else {
      res.render("campgrounds/campgrounds", { campgrounds });
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// POST Route
app.post("/campgrounds", (req, res) => {
  let name = req.body.campgroundName;
  let imageURL = req.body.campgroundImage;
  let campground = new Campground({
    name: name,
    imageURL: imageURL,
  });

  campground.save((err, campground) => {
    if (err) {
      console.log("Something went wrong");
    } else {
      console.log("The campground is saved in db");
      console.log(campground);
    }
  });

  res.redirect("campgrounds/campgrounds");
});

// SHOW Route
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, campground) => {
      if (err) {
        return res.status(404).json({
          error: "Could not get the campground",
        });
      }
      res.render("campgrounds/show", { campground });
    });
});

// NEW COMMENT Route
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }

    res.render("comments/new", { campground });
  });
});

// POST COMMENT Route
app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }

    const comment = req.body.comment;
    Comment.create(comment).then((comment) => {
      campground.comments.push(comment);
      campground.save();

      res.redirect("/campgrounds/" + campground._id);
    });
  });
});

// AUTH ROUTES

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("register");
      }

      passport.authenticate("local")(req, res, () => {
        res.redirect("/campgrounds");
      });
    }
  );
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

app.listen(5000);
