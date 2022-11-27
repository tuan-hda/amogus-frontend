import { Button, User } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

import Linkify from "react-linkify";
import { checkIn, getActivity, getCommentById } from "../api/post";
import { auth } from "../firebase";
import UserContext from "../utils/UserProvider";
import Comment from "./Comment";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";
const Post = ({ scrutinize, post, checkin }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [view, setView] = useState(false);
  const [activities, setActivities] = useState(false);

  const { user: user2 } = useContext(UserContext);

  const {
    user,
    post: { content, imageURL, _id },
    count,
  } = post || { user: {}, post: {}, count: {} };

  let shares, likes, name, userId, image;
  if (user) {
    name = user.name;
    userId = user.userId;
    image = user.ava;
  }

  if (count) {
    shares = count.share;
    likes = count.likes;
  }

  console.log("🚀 ~ file: Post.jsx ~ line 33 ~ Post ~ count", count);
  const lines = String(content || "").split("\n");

  const fetchComment = () => {
    getCommentById(_id)
      .then((data) => {
        setComments(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchComment();
  }, []);

  useEffect(() => {
    if (checkin) {
      getActivity(_id)
        .then((data) => {
          setActivities(data.data);
          console.log(activities);
        })
        .then((err) => console.log(err));
    }
  }, []);

  console.log(scrutinize);

  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      {/* Post header */}
      <PostHeader id={_id} scrutinize={scrutinize} name={name} image={image} userId={userId} />

      {/* Content */}
      <div className='px-4 py-2 font-light'>
        <Linkify>
          {lines.map((item, index) => {
            return (
              <span key={index}>
                {item} {index < lines.length - 1 && <br />}
              </span>
            );
          })}
        </Linkify>
        {imageURL && <img className='rounded-xl mt-2 max-h-[400px] w-full object-cover' src={imageURL} alt=''></img>}
      </div>

      {checkin && (
        <div className='text-sm ml-4 pt-2 pb-4 cursor-pointer' onClick={() => setView(!view)}>
          {!view ? "Xem tất cả người tham gia" : "Ẩn tất cả người tham gia"}
        </div>
      )}

      {view &&
        activities.length &&
        activities.map((act, index) => (
          <div key={index} className='flex justify-between'>
            <User src={act.user.ava} name={act.user.name} />

            <Button
              css={{
                minWidth: 0,
                width: "140px",
              }}
              onClick={() => {
                auth.currentUser?.getIdToken(auth).then((token) =>
                  checkIn(token, _id, act.user.uid)
                    .then(() => {
                      console.log("Checked in successfully");
                    })
                    .catch((err) => console.log(err))
                );
              }}
              color='success'
            >
              Duyệt
            </Button>
          </div>
        ))}

      {/* Post buttons */}

      <PostButtons shares={shares} likes={likes} id={_id} isActivity={post.post.isActivity} />

      <div className='pt-1'>
        {user2 && <Comment postId={_id} fetchComment={fetchComment} />}

        {comments.length !== 0 && (
          <div className='ml-4 mt-1 cursor-pointer text-sm' onClick={() => setShowComment(!showComment)}>
            {showComment ? "Ẩn tất cả bình luận" : "Xem tất cả bình luận"}
          </div>
        )}

        {showComment &&
          comments.map((cmt, index) => (
            <Comment type='text' name={cmt.user.name} image={cmt.user.ava} value={cmt.comment.content} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Post;
