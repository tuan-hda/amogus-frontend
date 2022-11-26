import React, { useContext, useEffect, useState } from "react";
import PostEditor from "../components/PostEditor";
import { Post } from "../components";
import { getPost } from "../api/post";
import UserContext from "../utils/UserProvider";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);

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
      {user && <PostEditor role={user?.role} />}

      {posts.map((p, i) => (
        <Post post={p} key={i} />
      ))}
    </div>
  );
};

export default Home;
