const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  rating: Number,
  feedback: String
});

const FeedbackModel = mongoose.model("feedbacks", FeedbackSchema);
module.exports = FeedbackModel;
