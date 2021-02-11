exports.checkCampgroundAuthor = function (req, res, next) {
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      console.log(err);
      req.flash("error", "Sorry! An unexpected error occured");
      return res.redirect("/campgrounds");
    } else if (campground.author.id.equals(req.user._id)) {
      next();
    } else {
      req.flash("error", "You don't have permission to do that");
      return res.redirect("back");
    }
  });
};
