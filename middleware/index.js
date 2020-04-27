// ALL middlewares go here

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in first");
  return res.redirect("/login");
};

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

exports.checkCommentAuthor = function (req, res, next) {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err || !comment) {
      console.log(err);
      req.flash("error", "Sorry! An unexpected error occured");
      return res.redirect(`/campgrounds/${req.params.id}`);
    } else if (comment.author.id.equals(req.user._id)) {
      return next();
    } else {
      req.flash("error", "You don't have permission to do that");
      return res.redirect("back");
    }
  });
};
