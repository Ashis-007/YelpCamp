const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  request = require("request"),
  path = require("path"),
  mongoose = require("mongoose");

const Campground = require("./models/campground"),
  Comment = require("./models/comment");
const seedDB = require("./seeds");

// seedDB();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/yelpdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("===DB Connected==="));

// Schema/Model

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
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }

    res.render("comments/new", { campground });
  });
});

// POST COMMENT Route
app.post("/campgrounds/:id/comments", (req, res) => {
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

app.listen(5000);
