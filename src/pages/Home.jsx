import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Post } from "../components";
import { auth } from "../firebase";

const Home = () => {
  return (
    <div className='space-y-8 flex flex-col items-center'>
      <button
        onClick={() => {
          console.log(auth.currentUser);
        }}
      >
        Click to call api
      </button>
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
