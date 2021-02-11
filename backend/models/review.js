const Review = require("../schema/review");
const Campground = require("../schema/campground");
const { reviewSchema } = require("../utils/schemas");

const validateReview = (review) => {
  return new Promise((resolve, reject) => {
    const { error } = reviewSchema.validate(review);
    if (error) {
      reject("Invalid review");
    } else {
      resolve();
    }
  });
};

const postReview = (id, review) => {
  return new Promise(async (resolve, reject) => {
    try {
      const campground = await Campground.findById(id).exec();
      let newReview = new Review(review);
      campground.reviews.push(review);
      await campground.save();
      newReview = await newReview.save();
      resolve(newReview);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const fetchReviews = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const campground = await Campground.findById(id)
        .populate("reviews")
        .exec();
      resolve(campground.reviews);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const editReview = () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteReview = (id, reviewId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Campground.findByIdAndUpdate(id, {
        $pull: {
          reviews: reviewId,
        },
      });
      await Review.findByIdAndDelete(reviewId).exec();
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  validateReview,
  postReview,
  fetchReviews,
  editReview,
  deleteReview,
};
