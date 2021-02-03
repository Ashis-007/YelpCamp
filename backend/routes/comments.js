const express = require("express"),
  router = express.Router({ mergeParams: true });

const Campground = require("../schema/campground"),
  Comment = require("../schema/comment");

const { isLoggedIn, checkCommentAuthor } = require("../middleware");

// NEW COMMENT Route
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }

    res.render("comments/new", { campground });
  });
});

// POST COMMENT Route
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      console.log(err);
    }

    const comment = req.body.comment;
    Comment.create(comment).then((comment) => {
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      comment.save();
      campground.comments.push(comment);
      campground.save();

      req.flash("success", "Comment posted successfully!");
      res.redirect("/campgrounds/" + campground._id);
    });
  });
});

// EDIT Route
router.get("/:comment_id/edit", isLoggedIn, checkCommentAuthor, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err || !comment) {
      console.log(err);
      req.flash("error", "Could not find the comment");

      return res.redirect("back");
    }

    res.render("comments/edit", { comment, campground_id: req.params.id });
  });
});

// UPDATE Route
router.put("/:comment_id", isLoggedIn, checkCommentAuthor, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, comment) => {
      if (err || !comment) {
        console.log(err);
        return res.redirect("back");
      }

      req.flash("success", "Comment updated successfully!");
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  );
});

// DESTROY Route
router.delete("/:comment_id", isLoggedIn, checkCommentAuthor, (req, res) => {
  Comment.deleteOne({ _id: req.params.comment_id }, (err) => {
    if (err) {
      console.log(err);
      req.flash("error", "Could not find the comment");
      return res.redirect("back");
    }
    req.flash("error", "Comment deleted successfully!");
    res.redirect(`/campgrounds/${req.params.id}`);
  });
});

module.exports = router;
