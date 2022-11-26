import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Post } from "../components";
import { auth } from "../firebase";

const Home = () => {
  return (
    <div className='space-y-8 flex flex-col items-center'>
      <Post></Post> <Post></Post>
      <Post></Post>
      <Post></Post> <Post></Post>
      <Post></Post>
      <Post></Post> <Post></Post>
      <Post></Post>
      <Post></Post> <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </div>
  );
};

export default Home;
