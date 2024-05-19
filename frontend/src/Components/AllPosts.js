import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  ButtonGroup,
  Button,
  Link,
  Pagination,
  IconButton,
  Dialog,
  List,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import {
  ArrowDownward,
  ArrowUpward,
  Delete,
  Edit,
  MoreVert,
} from "@mui/icons-material";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AllPosts({ posts, page }) {
  return (
    <Container align="center" sx={{ p: 5, backgroundColor: "#E2BFB3" }}>
      {posts.map((post) => (
        <Post post={post} key={post._id} page={page} />
      ))}
      <PaginationComponent />
    </Container>
  );
}

function Post({ post, page }) {
  const { username, token } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  const upvote = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/upvote", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: post._id, username }),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("upvote response: ", res_data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const downvote = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/downvote", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: post._id, username }),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("upvote response: ", res_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleUpvote() {
    upvote();
  }

  function handleDownvote() {
    downvote();
  }

  function openOptions() {
    setOpenOption((curr) => !curr);
  }

  return (
    <Card
      sx={{
        maxWidth: 650,
        marginTop: 5,
        boxShadow: 5,
        backgroundColor: "#F7DED0",
      }}
    >
      <CardHeader
        align="left"
        title={post.title}
        subheader={post.date + " at " + post.time + " by " + post.authorname}
        action={
          page === "profile" && (
            <>
              <IconButton aria-label="settings" onClick={openOptions}>
                <MoreVert />
              </IconButton>
              <PostOptions open={openOption} close={openOptions} post={post} />
            </>
          )
        }
      />
      <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="button">Location: {post.location}</Typography>
        <Typography variant="h5" sx={{ paddingRight: "15px" }}>
          {post.availability ? "Available" : "Adopted"}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="250"
        image={`http://localhost:5000${post.imageurl}`}
        alt={post.title}
      />

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonGroup size="large" aria-label="large button group">
          <Button key="upvote" sx={{ p: 0.8 }} onClick={handleUpvote}>
            <ArrowUpward /> Upvote
            <Typography
              variant="body1"
              sx={{ color: "black", paddingLeft: "5px" }}
            >
              {post.upvote}
            </Typography>
          </Button>
          <Button key="downvote" sx={{ p: 0.8 }} onClick={handleDownvote}>
            <ArrowDownward /> Downvote
            <Typography
              variant="body1"
              sx={{ color: "black", paddingLeft: "5px" }}
            >
              {post.downvote}
            </Typography>
          </Button>
        </ButtonGroup>

        {page === "home" ? (
          <ContactAuthorButton />
        ) : (
          <ChangeStatusButton post={post} />
        )}
      </CardActions>
    </Card>
  );
}

function PaginationComponent() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Pagination count={3} shape="rounded" />;
    </div>
  );
}

function ChangeStatusButton({ post }) {
  const { token } = useAuth();
  const changePostStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/changestatus", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: post._id }),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("status change response: ", res_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = () => {
    changePostStatus();
  };

  return (
    <Button
      color="inherit"
      key={1}
      variant="button"
      href=""
      onClick={handleStatusChange}
      sx={{ flexShrink: 0, textDecoration: "none" }}
    >
      {post.availability ? "Mark as Adopted" : "Mark as Available"}
    </Button>
  );
}

function ContactAuthorButton() {
  return (
    <Link
      color="inherit"
      key={1}
      variant="button"
      href="/contact"
      sx={{ flexShrink: 0, textDecoration: "none" }}
    >
      Contact Author
    </Link>
  );
}

function PostOptions({ post, open, close }) {
  const { setPost } = useAuth();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);

  function handleEdit() {
    setPost(post);
    navigate("/edit");
  }

  function handleClose() {
    close();
  }

  function tryDelete() {
    setOpenDelete(true);
  }

  function cancelDelete() {
    setOpenDelete(false);
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose an action</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters key="1">
          <ListItemButton onClick={handleEdit}>
            <Edit />
            <ListItemText primary={"Edit Post"} />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters key="2">
          <ListItemButton onClick={tryDelete}>
            <Delete />
            <ListItemText primary={"Delete Post"} />
          </ListItemButton>
          <AsksDeletion
            handleClose={cancelDelete}
            open={openDelete}
            post={post}
          />
        </ListItem>
        <ListItem disableGutters key="3">
          <ListItemButton onClick={handleClose}>
            <ListItemText primary={"Cancel"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

function AsksDeletion({ handleClose, open, post }) {
  const { token } = useAuth();
  const { username } = useAuth();
  const deletePost = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/delete", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: post._id, username: username }),
      });

      if (response.ok) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you would like to delete the post?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This can not be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deletePost} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AllPosts;
