import React from "react";

import Linkify from "react-linkify";
import Comment from "./Comment";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";
const Post = ({ scrutinize, post }) => {
  const {
    user,
    post: { content, imageURL },
    count,
  } = post || { user: {}, post: {}, count: {} };

  let shares, likes, name, userId;
  if (user) {
    name = user.name;
    userId = user.userId;
  }
  if (count) {
    shares = count.share;
    likes = count.likes;
  }

  const lines = String(content || "").split("\n");

  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      {/* Post header */}
      <PostHeader scrutinize name={name} userId={userId} />

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
          <PostButtons shares={shares} likes={likes} />

          <div className='pt-1'>
            <Comment />
            <Comment
              type='text'
              value='Tôi rất thích bài đăng này Tôi rất thích bài đăng này Tôi rất thích bài đăng này Tôi rất thích bài đăng này '
            />
            <Comment type='text' value='Siu' />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
