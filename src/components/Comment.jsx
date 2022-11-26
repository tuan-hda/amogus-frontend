import { Button, Tooltip, User } from "@nextui-org/react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlane2Fill } from "react-icons/ri";

const Comment = () => {
  return (
    <div className='py-2 pr-2 flex items-start'>
      <Tooltip content={"Ariana"} color='invert'>
        <User src='https://i.pravatar.cc/150?u=a042581f4e29026704d'></User>
      </Tooltip>

      <TextareaAutosize
        placeholder='Bình luận'
        className='resize-none font-light flex-1 bg-[#E7E7E7] px-4 py-2 rounded-xl mr-4'
      />

      <Tooltip content={"Gửi bình luận"} color='invert'>
        <Button
          rounded
          css={{
            minWidth: "0",
            width: "40px",
          }}
          light
          icon={<RiSendPlane2Fill className='text-lg' />}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default Comment;
