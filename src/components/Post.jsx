import React from "react";
import { User } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";

const Post = () => {
  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white h-[400px]'>
      <div className='flex justify-between'>
        <User src='https://i.pravatar.cc/150?u=a042581f4e29026704d' name='Ariana Wattson'>
          <User.Link href='https://nextui.org/'>@watsonari</User.Link>
        </User>

        <Dropdown>
          <Dropdown.Button light rounded icon={<HiDotsHorizontal className='relative left-[14px] -top-[1px]' />} />
          <Dropdown.Menu aria-label='Static Actions'>
            <Dropdown.Item key='new'>Hide this post</Dropdown.Item>
            <Dropdown.Item key='report' color='error'>
              Report
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Post;
