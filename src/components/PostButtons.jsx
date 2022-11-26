import { Tooltip, Button, Dropdown } from "@nextui-org/react";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IoHandRightSharp } from "react-icons/io5";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";

const PostButtons = ({ shares, likes }) => {
  const [liked, setLiked] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className='flex gap-4 overflow-hidden pr-4 pl-2 py-1'>
      <div className='flex items-center'>
        <Tooltip content={liked ? "Bỏ quan tâm" : "Quan tâm"} color='invert'>
          <Button
            onClick={() => setLiked(!liked)}
            color='error'
            rounded
            css={{
              minWidth: "0",
            }}
            light
            icon={liked ? <AiFillHeart className='text-xl' /> : <AiOutlineHeart className='text-xl' />}
          />
        </Tooltip>

        <span>{likes}</span>
      </div>

      <div className='flex items-center'>
        <Dropdown>
          <Tooltip content='Chia sẻ' color='invert'>
            <Dropdown.Button
              color='primary'
              rounded
              css={{
                minWidth: "0",
                width: "40px",
              }}
              light
              icon={<AiOutlineShareAlt className='relative left-[12px] -top-[1px] text-xl' />}
            />
          </Tooltip>
          <Dropdown.Menu aria-label='Static Actions'>
            <Dropdown.Item key='share-facebook'>
              <FacebookShareButton
                url={"https://dev.to/pccprint/10-react-rich-text-editors-1hh5"}
                hashtag={"#greensus"}
                className='flex items-center gap-4'
              >
                <FacebookIcon size={24} round /> Qua Facebook
              </FacebookShareButton>
            </Dropdown.Item>

            <Dropdown.Item key='share-twitter'>
              <TwitterShareButton
                url={"https://facebook.com/"}
                hashtag={"#greensus"}
                className='flex items-center gap-4'
              >
                <TwitterIcon size={24} round /> Qua Twitter
              </TwitterShareButton>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <span>{shares}</span>
      </div>

      <Button
        className='ml-auto'
        color='success'
        css={{
          minWidth: "140px",
        }}
        bordered={enrolled}
        icon={<IoHandRightSharp />}
        onClick={() => setEnrolled(!enrolled)}
      >
        <span className='ml-8 w-fullk'>{enrolled ? "Huỷ tham gia" : "Tham gia"}</span>
      </Button>
    </div>
  );
};

export default PostButtons;
