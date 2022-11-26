import React, { useRef, useState } from "react";
import { Button, Tooltip, User } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IoHandRightSharp } from "react-icons/io5";
import Linkify from "react-linkify";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
const Post = () => {
  const [liked, setLiked] = useState(false);
  const fbRef = useRef();

  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      <div className='flex justify-between'>
        <User src='https://i.pravatar.cc/150?u=a042581f4e29026704d' name='Ariana Wattson'>
          <User.Link href='https://nextui.org/'>@watsonari</User.Link>
        </User>

        <Dropdown>
          <Dropdown.Button light rounded icon={<HiDotsHorizontal className='relative left-[14px] -top-[1px]' />} />
          <Dropdown.Menu aria-label='Static Actions'>
            <Dropdown.Item key='report' color='error'>
              Report
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Content */}
      <div className='px-4 py-2 font-light'>
        <Linkify>
          Hello https://www.npmjs.com/package/react-linkify <br /> Tuan
        </Linkify>
      </div>

      {/* Button */}
      <div className='flex gap-4 overflow-hidden px-4 py-1'>
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

        <Button
          className='ml-auto'
          color='success'
          css={{
            minWidth: "140px",
          }}
          icon={<IoHandRightSharp />}
        >
          <span className='ml-8 w-fullk'>Tham gia</span>
        </Button>
      </div>
    </div>
  );
};

export default Post;
