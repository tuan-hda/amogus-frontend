import React from "react";
import { User } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";

const PostHeader = ({ scrutinize, name = "", email = "" }) => {
  return (
    <div className='flex justify-between'>
      <User src='https://i.pravatar.cc/150?u=a042581f4e29026704d' name={name}>
        <User.Link href='https://nextui.org/'>@{email}</User.Link>
      </User>

      <Dropdown>
        <Dropdown.Button light rounded icon={<HiDotsHorizontal className='relative left-[14px] -top-[1px]' />} />
        <Dropdown.Menu aria-label='Static Actions'>
          {scrutinize && (
            <Dropdown.Item key='approve' color='primary'>
              Duyệt
            </Dropdown.Item>
          )}
          {scrutinize && (
            <Dropdown.Item key='decline' color='error'>
              Không duyệt
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default PostHeader;
