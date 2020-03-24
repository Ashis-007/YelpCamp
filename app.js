const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  request = require("request"),
  path = require("path"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelpdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const campgroundSchema = new mongoose.Schema({
  name: String,
  imageURL: String
});

const Campground = new mongoose.model("Campground", campgroundSchema);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log("Something went wrong!");
    } else {
      res.render("campgrounds", { campgrounds: campgrounds });
    }
  });
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.campgroundName;
  let imageURL = req.body.campgroundImage;
  let campground = new Campground({
    name: name,
    imageURL: imageURL
  });

  campground.save((err, campground) => {
    if (err) {
      console.log("Something went wrong");
    } else {
      console.log("The campground is saved in db");
      console.log(campground);
    }
  });

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.listen(5000);
