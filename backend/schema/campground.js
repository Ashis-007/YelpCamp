const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// TODO: add images
const campgroundSchema = new Schema({
  name: String,
  images: [],
  description: String,
  location: String,
  price: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);
