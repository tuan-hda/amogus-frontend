import { Button, Input } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

const PostEditorButtons = ({ setImage, handleSubmit, type }) => {
  const ref = useRef();

  return (
    <div className='grid grid-cols-2 gap-4 overflow-hidden pr-4 pl-2 py-1 justify-between items-end'>
      <Button
        onClick={() => ref.current.click()}
        color='primary'
        light
        icon={<BiImageAlt className='text-lg' />}
        css={{
          minWidth: 0,
          width: "150px",
        }}
      >
        <span className='ml-4'>Thêm ảnh</span>
      </Button>

      {type === "activity" && (
        <>
          <div className='justify-self-end w-full'>
            <Input
              aria-label='point'
              placeholder='Điểm'
              color='black'
              css={{
                minWidth: 0,
                width: "100%",
              }}
              type='number'
            />
          </div>

          <div className='pl-3 w-full'>
            <Input
              aria-label='start-date'
              placeholder='Ngày bắt đầu'
              color='black'
              css={{
                minWidth: 0,
                width: "100%",
              }}
              type='date'
            />
          </div>

          <div className='justify-self-end w-full'>
            <Input
              aria-label='end-date'
              placeholder='Ngày kết thúc'
              color='black'
              css={{
                minWidth: 0,
                width: "100%",
              }}
              type='date'
            />
          </div>
        </>
      )}

      <div className={classNames("pl-3 -mr-2 flex justify-end", type === "activity" && "w-full col-span-2")}>
        <Button
          color='success'
          css={{
            width: type === "activity" ? "100%" : "140px",
            maxWidth: "100%",
            minWidth: 0,
          }}
          onClick={handleSubmit}
        >
          <span className='w-full'>Đăng bài</span>
        </Button>
      </div>

      <input type='file' className='hidden absolute' ref={ref} onChange={setImage} />
    </div>
  );
};

export default PostEditorButtons;
