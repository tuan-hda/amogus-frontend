import React, { useEffect, useState } from "react";
import PostEditor from "../components/PostEditor";
import { Post } from "../components";
import { getPost } from "../api/post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost()
      .then((data) => {
        setPosts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
