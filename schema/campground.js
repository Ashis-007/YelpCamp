const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Campground", campgroundSchema);
