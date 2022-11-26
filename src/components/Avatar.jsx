import React from "react";

const Avatar = ({custom}) => {
  return (
    <img
      src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/24/tumblr0a490ad7062f51c33ec0c054255256a2a1922eb2540-1664001587930930202526.jpg"
      alt="Avatar"
      className={`rounded-full aspect-square object-cover ${custom}`}
    />
  );
};

export default Avatar;
