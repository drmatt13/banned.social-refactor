const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "Please add a user_id"],
    trim: true,
    length: [25, "please make sure length of userId is 25"],
  },
  profile_id: {
    type: String,
    required: [true, "Please add a profile_id"],
    trim: true,
    length: [25, "please make sure length of userId is 25"],
  },
  post: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  hashtags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.Post || mongoose.model("Post", Schema);
