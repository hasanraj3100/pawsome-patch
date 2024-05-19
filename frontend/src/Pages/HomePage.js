import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import AllPosts from "../Components/AllPosts";
import { useEffect, useState } from "react";

function App() {
  return <HomePage />;
}

function HomePage() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAllPosts() {
      try {
        const response = await fetch("http://localhost:5000/post", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const res_data = await response.json();
          setPosts(res_data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllPosts();
  });
  return (
    <>
      <Header />
      <Navbar page="home" />
      <AllPosts posts={posts} page="home" />
    </>
  );
}

export default HomePage;
