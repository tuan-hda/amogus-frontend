import React, { useState } from "react";
import PostEditor from "../components/PostEditor";
import { Post } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className='space-y-8 flex flex-col items-center'>
      <PostEditor />

      {posts.map((p, i) => (
        <Post post={p} />
      ))}
    </div>
  );
};

export default Home;
