import React from "react";
import { User } from "@nextui-org/react";

const Post = () => {
  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 px-1 bg-white h-[400px]'>
      <User src='https://i.pravatar.cc/150?u=a042581f4e29026704d' name='Ariana Wattson'>
        <User.Link href='https://nextui.org/'>@watsonari</User.Link>
      </User>
    </div>
  );
};

export default Post;
