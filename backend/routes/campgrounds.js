const express = require("express"),
  router = express.Router();
const Campground = require("../schema/campground");
const { isLoggedIn, checkCampgroundAuthor } = require("../middleware");
const campgroundController = require("../controllers/campgrounds");

// GET Route
router.get("/", campgroundController.getAllCampgrounds);

// POST Route
router.post("/", isLoggedIn, (req, res) => {
  let name = req.body.campgroundName,
    imageURL = req.body.campgroundImage,
    description = req.body.description,
    author = {
      id: req.user._id,
      username: req.user.username,
    };
  let campground = new Campground({
    name,
    imageURL,
    description,
    author,
  });

  campground.save((err, campground) => {
    if (err || !campground) {
      console.log(err);
    } else {
      console.log("The campground is saved in db");
      console.log(campground);
    }
  });

  req.flash("success", "Campground added successfully!");
  res.redirect("/campgrounds");
});

// SHOW Route
// router.get("/:id", (req, res) => {
//   Campground.findById(req.params.id)
//     .populate("comments")
//     .exec((err, campground) => {
//       if (err) {
//         console.log(err);
//         return res.redirect("back");
//       }
//       res.render("campgrounds/show", { campground });
//     });
// });

// EDIT Route
// router.get("/:id/edit", isLoggedIn, checkCampgroundAuthor, (req, res) => {
//   Campground.findById(req.params.id, (err, campground) => {
//     if (err || !campground) {
//       console.log(err);
//       return res.redirect("/campgrounds");
//     }

//     res.render("campgrounds/edit", { campground });
//   });
// });

// UPDATE Route
router.put("/:id", isLoggedIn, checkCampgroundAuthor, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, campground) => {
      if (err || !campground) {
        console.log(err);
        return res.redirect("/campgrounds");
      }
      req.flash("success", "Campground updated successfully!");
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  );
});

// DESTROY Route
router.delete(
  "/:id",
  isLoggedIn,
  checkCampgroundAuthor,
  campgroundController.deleteCampground
);

module.exports = router;
