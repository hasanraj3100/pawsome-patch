const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const authenticateJWT = require("./middlewares/jwtauth");

// database connection

mongoose
  .connect(
    "mongodb+srv://hasanraj3100:J5hx46J7I6hTHXHD@cluster0.vughnl0.mongodb.net/pawsomedb?retryWrites=true&w=majority&appName=Cluster0"
  )

  .then(() => console.log("Connected!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD", 
  credentials: true
}));
app.use("/images", express.static("images"));
app.use("/user", userRoute);
app.use("/post", authenticateJWT, postRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000);
