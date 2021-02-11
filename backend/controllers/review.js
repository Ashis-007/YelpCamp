const reviewModels = require("../models/review");

const postReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    const newReview = await reviewModels.postReview(id, review);
    res
      .status(200)
      .json({ msg: "Sucessfully posted new review", review: newReview });
  } catch (e) {
    console.log(e);
  }
};

const getAllReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = reviewModels.fetchReviews(id);
    res
      .status(200)
      .json({ msg: "Successfully fetched all reviews", data: reviews });
  } catch (e) {
    console.log(e);
  }
};

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  try {
    await reviewModels.deleteReview(id, reviewId);
    res.status(200).json({
      msg: "Successfully deleted review",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { postReview, deleteReview };
