import React, { useContext } from "react";
import { Post } from "../components";
import UserContext from "../utils/UserProvider";

const Admin = () => {
  const { user } = useContext(UserContext);

  // console.log(user);
  if (!user || (user && user.role !== "ADMIN")) return null;

  return (
    <div className='space-y-8 flex flex-col items-center'>
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
      <Post scrutinize />
    </div>
  );
};

export default Admin;
