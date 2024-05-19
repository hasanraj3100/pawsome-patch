const express = require("express");
const router = express.Router();
const {
  allPosts,
  addPost,
  upVotePost,
  downVotePost,
  postByUser,
  changeStatus,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/posts");
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.post("/postbyuser", postByUser);
router.get("/", allPosts);
router.post("/create", upload.single("image"), addPost);
router.post("/upvote", upVotePost);
router.post("/downvote", downVotePost);
router.post("/changestatus", changeStatus);
router.post("/update", upload.single("image"), updatePost);
router.post("/delete", deletePost);

module.exports = router;
