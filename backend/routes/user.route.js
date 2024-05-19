const express = require("express");
const router = express.Router();
const {
  getUser,
  addUser,
  userLogin,
} = require("../controllers/user.controller");

const multer = require("multer");
const path = require("path");
const authenticateJWT = require("../middlewares/jwtauth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/users");
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${req.body.username}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("yes");
});
router.post("/register", upload.single("image"), addUser);
router.get("/:username",authenticateJWT , getUser);
router.post("/login", userLogin);

module.exports = router;
