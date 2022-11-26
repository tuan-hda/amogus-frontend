import React from "react";

import Linkify from "react-linkify";
import Comment from "./Comment";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";
const Post = ({ scrutinize }) => {
  return (
    <div className='w-[600px] max-w-[100%] rounded-xl py-4 pl-1 pr-4 bg-white'>
      {/* Post header */}
      <PostHeader scrutinize />

      {/* Content */}
      <div className='px-4 py-2 font-light'>
        <Linkify>
          Hello https://www.npmjs.com/package/react-linkify <br /> Tuan
        </Linkify>
        <img
          className='rounded-xl mt-2 max-h-[400px] w-full object-contain'
          src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
          alt=''
        ></img>
      </div>

      {/* Post buttons */}
      {!scrutinize && (
        <>
          <PostButtons />

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
