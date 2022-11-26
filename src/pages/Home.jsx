import React from "react";
import { Post } from "../components";

const Home = () => {
  return (
    <div className='flex flex-col items-center'>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </div>
  );
};

export default Home;
