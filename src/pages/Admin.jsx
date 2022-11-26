import React, { useContext, useEffect, useState } from "react";
import { getAdminPost } from "../api/post";
import { Post } from "../components";
import UserContext from "../utils/UserProvider";

const Admin = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAdminPost()
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
      {posts.map((p, i) => (
        <Post post={p} key={i} scrutinize />
      ))}
    </div>
  );
};

export default Admin;
