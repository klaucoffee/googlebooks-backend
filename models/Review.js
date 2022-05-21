const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema({
  userId: { type: String },
  reviewId: { type: String },
  bookTitle: { type: String },
  review: { type: String },
  createdOn: { type: String },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
