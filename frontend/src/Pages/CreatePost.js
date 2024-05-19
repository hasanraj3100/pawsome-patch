import {
  Box,
  Container,
  TextField,
  Typography,
  Alert,
  Button,
  Input,
} from "@mui/material";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Check, Cloud, CloudUpload, ErrorRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../store/auth";

function CreatePost() {
  return (
    <>
      <Header />
      <Navbar page="new" />
      <FormPost />
    </>
  );
}

function FormPost() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const username = localStorage.getItem("username");
  const authorname = localStorage.getItem("authorname");
  const token = localStorage.getItem("token");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("username", username);
    formData.append("authorname", authorname);

    try {
      const response = await fetch("http://localhost:5000/post/create", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("response from server", res_data);
        setShowMessage(true);

        setTitle("");
        setLocation("");
        setImage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container align="center" sx={{ p: 10 }}>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Typography variant="h4">Create New Post</Typography>
        <div style={{ padding: "10px" }}>
          <TextField
            required
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div style={{ padding: "15px" }}>
          <Typography variant="body1" sx={{ p: 1 }}>
            Choose an image:{" "}
          </Typography>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/png, image/jpeg"
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#FFBE98", width: "300px", color: "black" }}
        >
          Post
        </Button>
      </Box>

      {showMessage && <SuccessMessage />}
    </Container>
  );
}

function SuccessMessage() {
  return (
    <Alert severity="success">
      Thanks for sharing! Your post is now visible to others.
    </Alert>
  );
}

function ErrorMessaage() {
  return (
    <Alert severity="error">
      Oops! There seems to be a technical issue preventing your post from
      uploading
    </Alert>
  );
}

export default CreatePost;
