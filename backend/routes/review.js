const express = require("express"),
  router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/review");

const { isLoggedIn, checkCommentAuthor } = require("../middleware");

// POST
router.post("/", isLoggedIn, reviewController.postReview);

// GET
router.get("/", isLoggedIn, reviewController);

// UPDATE
// router.put("/:comment_id", isLoggedIn, checkCommentAuthor, (req, res) => {
//   Comment.findByIdAndUpdate(
//     req.params.comment_id,
//     req.body.comment,
//     (err, comment) => {
//       if (err || !comment) {
//         console.log(err);
//         return res.redirect("back");
//       }

//       req.flash("success", "Comment updated successfully!");
//       res.redirect(`/campgrounds/${req.params.id}`);
//     }
//   );
// });

// DELETE
router.delete(
  "/:reviewId",
  isLoggedIn,
  checkCommentAuthor,
  reviewController.deleteReview
);

module.exports = router;
