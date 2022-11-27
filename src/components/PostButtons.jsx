import { Tooltip, Button, Dropdown } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IoHandRightSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import { doLike, doShare, joinActivity } from "../api/post";
import { auth } from "../firebase";
import UserContext from "../utils/UserProvider";

const PostButtons = ({ shares, likes, id, isActivity }) => {
  console.log("🚀 ~ file: PostButtons.jsx ~ line 12 ~ PostButtons ~ shares", shares);
  const [liked, setLiked] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleClick = (clickFunc) => {
    if (!user) {
      navigate("/login");
      return;
    }
    clickFunc();
  };

  const handleShare = (e) => {
    doShare(id, auth.currentUser.uid)
      .then(() => console.log("Shared successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div className='flex gap-4 overflow-hidden pr-4 pl-2 py-1'>
      <div className='flex items-center'>
        <Tooltip content={liked ? "Bỏ quan tâm" : "Quan tâm"} color='invert'>
          <Button
            onClick={() =>
              handleClick(() => {
                auth.currentUser.getIdToken().then((token) =>
                  doLike(token)
                    .then(() => console.log("Liked"))
                    .catch((err) => console.log(err))
                );
              })
            }
            color='error'
            rounded
            css={{
              minWidth: "0",
            }}
            light
            icon={liked ? <AiFillHeart className='text-xl' /> : <AiOutlineHeart className='text-xl' />}
          />
        </Tooltip>

        <span>{likes + liked}</span>
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
                onClick={handleShare}
              >
                <FacebookIcon size={24} round /> Qua Facebook
              </FacebookShareButton>
            </Dropdown.Item>

            <Dropdown.Item key='share-twitter'>
              <TwitterShareButton
                url={"https://facebook.com/"}
                hashtag={"#greensus"}
                onClick={handleShare}
                className='flex items-center gap-4'
              >
                <TwitterIcon size={24} round /> Qua Twitter
              </TwitterShareButton>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <span>{shares}</span>
      </div>

      {isActivity && (
        <Button
          className='ml-auto'
          color='success'
          css={{
            minWidth: "140px",
          }}
          bordered={enrolled}
          icon={<IoHandRightSharp />}
          onClick={() => {
            handleClick(() => {
              if (enrolled) {
                return;
              }
              auth.currentUser.getIdToken().then((token) => {
                joinActivity(token, id).then(() => {
                  console.log("Joined activity successfully");
                  setEnrolled(true);
                });
              });
            });
          }}
        >
          <span className='ml-8 w-fullk'>{enrolled ? "Huỷ tham gia" : "Tham gia"}</span>
        </Button>
      )}
    </div>
  );
};

export default PostButtons;
