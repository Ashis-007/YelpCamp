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
