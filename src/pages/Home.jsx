import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Post } from "../components";
import PostEditor from "../components/PostEditor";
import { auth } from "../firebase";

const Home = () => {
  return (
    <div className='space-y-8 flex flex-col items-center'>
      <PostEditor />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Home;
