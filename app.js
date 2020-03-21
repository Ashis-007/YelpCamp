const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const mongoose = require("mongoose");

/* mongoose.connect("mongodb://localhost:27017/yelpdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); */

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/campgrounds", (req, res) => {
    res.render("campground");
});

const Campground = new mongoose.model("Campground", {
    name: String,
    imageURL: String
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.campgroundName;
    let imageURL = req.body.campgroundImage;
    let campground = new Campground({
        name: name,
        imageURL: imageURL
    });
    campground.save();
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(5000);
