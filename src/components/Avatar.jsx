import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const Avatar = ({ custom, editable, width }) => {
  return (
    <div className={`relative flex justify-center items-center ${width}`}>
      <img
        src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/24/tumblr0a490ad7062f51c33ec0c054255256a2a1922eb2540-1664001587930930202526.jpg"
        alt="Avatar"
        className={`rounded-full aspect-square object-cover ${custom}`}
      />
    </div>
  );
};

export default Avatar;
