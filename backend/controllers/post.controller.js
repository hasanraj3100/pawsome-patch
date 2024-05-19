const Post = require("../models/post.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { format } = require("date-fns");

const allPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postByUser = async (req, res) => {
  try {
    const { username } = req.body;
    const posts = await Post.find({ username });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, authorname, username, location } = req.body;
    const imageurl = req.file ? `/images/posts/${req.file.filename}` : null;
    const date = format(new Date(), "d MMMM yyyy");
    const time = format(new Date(), "hh:mm a");
    const newPost = new Post({
      title,
      authorname,
      username,
      location,
      imageurl,
      date,
      time,
    });
    const post = await newPost.save();
    const user = await User.findOne({ username });
    user.totalposts += 1;
    await user.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id, title, location, imageurl } = req.body;
    console.log("post id", req.body.title);
    const url = req.file ? `/images/posts/${req.file.filename}` : imageurl;
    const date = format(new Date(), "d MMMM yyyy");
    const time = format(new Date(), "hh:mm a");

    const postID = new mongoose.Types.ObjectId(id);
    const post = await Post.findById(postID);

    post.title = title;
    post.location = location;
    post.imageurl = url;
    post.date = date;
    post.time = time;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const upVotePost = async (req, res) => {
  try {
    const { id, username } = req.body;
    const postID = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ username });
    const userID = user._id;

    const post = await Post.findById(postID);

    if (post.upvotedBy.includes(userID)) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this post" });
    }

    if (post.downvotedBy.includes(userID)) {
      post.downvotedBy.pull(userID);
      post.downvote -= 1;
    }

    post.upvotedBy.push(userID);
    post.upvote += 1;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const downVotePost = async (req, res) => {
  try {
    const { id, username } = req.body;
    const postID = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ username });
    const userID = user._id;

    const post = await Post.findById(postID);

    if (post.downvotedBy.includes(userID)) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this post" });
    }

    if (post.upvotedBy.includes(userID)) {
      post.upvotedBy.pull(userID);
      post.upvote -= 1;
    }

    post.downvotedBy.push(userID);
    post.downvote += 1;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.body;
  console.log("receivedd ", id);
  const postID = new mongoose.Types.ObjectId(id);
  const post = await Post.findById(postID);

  post.availability = !post.availability;
  await post.save();
  res.status(200).json({ message: "post status changed" });
};

const deletePost = async (req, res) => {
  const { id, username } = req.body;
  const postID = new mongoose.Types.ObjectId(id);

  const succeses = await Post.findByIdAndDelete(postID);

  const user = await User.findOne({ username: username });

  user.totalposts -= 1;

  await user.save();

  res.status(200);
};

module.exports = {
  addPost,
  allPosts,
  upVotePost,
  downVotePost,
  postByUser,
  changeStatus,
  updatePost,
  deletePost,
};
