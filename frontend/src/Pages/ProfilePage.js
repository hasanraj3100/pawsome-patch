import {
  Card,
  CardHeader,
  Container,
  Avatar,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AllPosts from "../Components/AllPosts";
import posts from "../data";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

// const userInfo = {
//   id: 1,
//   name: "John Wick",
//   userName: "john.wick.32",
//   location: "Dhaka, Bangladesh",
//   totalPosts: 23,
//   helpCount: 15,
//   adoptCount: 4,
//   imgURL:
//     "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
// };

function ProfilePage() {
  const { username } = useAuth();
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({
    name: "",
    userName: "",
    location: "",
    totalPosts: 0,
    helpCount: 0,
    adoptCount: 0,
    imgURL: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const res_data = await response.json();

        setUserInfo({
          userName: res_data.username,
          name: res_data.name,
          location: res_data.location,
          totalPosts: res_data.totalposts,
          helpCount: res_data.helpcount,
          adoptCount: res_data.adoptcount,
          imgURL: `http://localhost:5000${res_data.imageurl}`,
        });

        const response2 = await fetch("http://localhost:5000/post/postbyuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ username }),
        });

        if (response2.ok) {
          const postDatas = await response2.json();
          setPosts(postDatas);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  });

  // console.log("imageurl", userInfo.imgURL);

  return (
    <>
      <Header />
      <Navbar page="profile" />
      <UserInfo user={userInfo} />
      <AllPosts posts={posts} page={"profile"} />
    </>
  );
}

function UserInfo({ user }) {
  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ width: 150, height: 150 }}>
              <img
                srcSet={user.imgURL}
                alt={user.name}
                loading="lazy"
                height={150}
              />
            </Avatar>
          }
          title={
            <>
              <Typography variant="h4">{user.name}</Typography>
              <Typography variant="body1">@{user.userName}</Typography>
              <Typography variant="body1">{user.location}</Typography>
            </>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <Typography variant="button" sx={{ fontSize: 25 }}>
                {user.totalPosts}
              </Typography>
              <Typography variant="body1">Posts Created</Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography variant="button" sx={{ fontSize: 25 }}>
                {user.helpCount}
              </Typography>
              <Typography variant="body1">Helping Paws Count</Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography variant="button" sx={{ fontSize: 25 }}>
                {user.adoptCount}
              </Typography>
              <Typography variant="body1">Pets Adopted</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProfilePage;
