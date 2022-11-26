import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const Avatar = ({ custom, editable, width, src }) => {
  return (
    <div className={`relative flex justify-center items-center ${width}`}>
      <img src={src} alt='Avatar' className={`rounded-full aspect-square object-cover ${custom}`} />
    </div>
  );
};

export default Avatar;
