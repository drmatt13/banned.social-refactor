const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  original_post_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add a user_id"],
  },
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
    trim: true,
  },
  og_image: {
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
  top_comment: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a comment id"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user_id"],
    },
    text: {
      type: String,
      trim: true,
    },
    og_image: {
      type: String,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  hashtags: {
    type: { String },
    default: {},
  },
  url: {
    type: String,
    trim: true,
  },
  last_modified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.Post || mongoose.model("Post", Schema);
