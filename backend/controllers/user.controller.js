const User = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, username, password, location } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists. Try a different one" });
    }
    const imageurl = req.file ? `/images/users/${req.file.filename}` : null;

    const newUser = new User({ name, username, password, location, imageurl });
    await newUser.save();
    res.status(201).json({ message: "Registration Successful!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or passwords" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      message: "Login successful",
      token,
      username,
      authorname: user.name,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getUser,
  addUser,
  userLogin,
};
