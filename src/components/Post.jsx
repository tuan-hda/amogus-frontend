import React, { useEffect, useState } from "react";

import Linkify from "react-linkify";
import { getCommentById } from "../api/post";
import Comment from "./Comment";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";
const Post = ({ scrutinize, post }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);

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

  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      {/* Post header */}
      <PostHeader id={_id} scrutinize name={name} image={image} userId={userId} />

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

      {/* Post buttons */}
      {!scrutinize && (
        <>
          <PostButtons shares={shares} likes={likes} id={_id} />

          <div className='pt-1'>
            <Comment postId={_id} fetchComment={fetchComment} />

            {comments.length !== 0 && (
              <div className='ml-4 mt-1 cursor-pointer text-sm' onClick={() => setShowComment(!showComment)}>
                {showComment ? "Ẩn tất cả bình luận" : "Xem tất cả bình luận"}
              </div>
            )}

            {showComment &&
              comments.map((cmt, index) => (
                <Comment
                  type='text'
                  name={cmt.user.name}
                  image={cmt.user.ava}
                  value={cmt.comment.content}
                  key={index}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
