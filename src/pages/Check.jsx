import React, { useContext, useEffect, useState } from "react";
import { getPost } from "../api/post";
import { Post } from "../components";
import UserContext from "../utils/UserProvider";

const Check = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost()
      .then((data) => {
        // console.log(data.data);
        setPosts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(user);
  if (!user || (user && user.role !== "ADMIN")) return null;

  return (
    <div className='space-y-8 flex flex-col items-center'>
      {posts.map((p, i) => {
        if (p.post.isActivity) return <Post post={p} key={i} checkin scrutinize />;
      })}
    </div>
  );
};

export default Check;
