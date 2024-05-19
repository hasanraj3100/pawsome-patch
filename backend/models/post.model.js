const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    required: false,
    default: 0,
  },
  downvote: {
    type: Number,
    required: false,
    default: 0,
  },
  availability: {
    type: Boolean,
    required: false,
    default: true,
  },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
