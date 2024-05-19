const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalposts: {
      type: Number,
      required: false,
      default: 0,
    },

    helpcount: {
      type: Number,
      required: false,
      default: 0,
    },
    adoptcount: {
      type: Number,
      required: false,
      default: 0,
    },
    imageurl: {
      type: String,
      required: false,
    },
  },
  { Timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = () => {
  const Token = jwt.sign(
    {
      username: this.username,
    },
    "myprivatekey",
    { expiresIn: "7d" }
  );

  return Token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
