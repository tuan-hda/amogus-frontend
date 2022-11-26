import { Tooltip, Button } from "@nextui-org/react";
import React, { useRef } from "react";
import { BiImageAlt } from "react-icons/bi";

const PostEditorButtons = ({ setImage, handleSubmit, type }) => {
  const ref = useRef();

  return (
    <div className='flex gap-4 overflow-hidden pr-4 pl-2 py-1 justify-between'>
      <Tooltip content={"Thêm ảnh"} color='invert'>
        <Button
          onClick={() => ref.current.click()}
          color='primary'
          rounded
          css={{
            minWidth: "0",
          }}
          light
          icon={<BiImageAlt className='text-lg' />}
        />
      </Tooltip>

      <Tooltip content={"Thêm ngày bắt đầu"} color='invert'>
        <Button
          onClick={() => ref.current.click()}
          color='primary'
          rounded
          css={{
            minWidth: "0",
          }}
          light
          icon={<BiImageAlt className='text-lg' />}
        />
      </Tooltip>

      <Tooltip content={"Thêm ngày bắt đầu"} color='invert'>
        <Button
          onClick={() => ref.current.click()}
          color='primary'
          rounded
          css={{
            minWidth: "0",
          }}
          light
          icon={<BiImageAlt className='text-lg' />}
        />
      </Tooltip>

      <Button
        className='ml-auto'
        color='success'
        css={{
          minWidth: "140px",
        }}
        onClick={handleSubmit}
      >
        <span className='w-full'>Đăng bài</span>
      </Button>

      <input type='file' className='hidden' ref={ref} onChange={setImage} />
    </div>
  );
};

export default PostEditorButtons;
