import { Button, Tooltip, User } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlane2Fill } from "react-icons/ri";
import classNames from "classnames";
import { auth } from "../firebase";
import { postComment } from "../api/post";
import { toast } from "react-toastify";
import UserContext from "../utils/UserProvider";

const Comment = ({ postId, type, name, value, image, fetchComment }) => {
  const [value2, setValue2] = useState(value);

  const { user } = useContext(UserContext);

  return (
    <div className='py-2 pr-2 flex items-start'>
      <Tooltip content={name} color='invert'>
        <User src={type === "text" ? image : user.photoURL}></User>
      </Tooltip>

      <TextareaAutosize
        placeholder='Viết bình luận...'
        readOnly={type === "text"}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        className={classNames("bg-[#E7E7E7]", "resize-none font-light flex-1 px-4 py-2 rounded-xl mr-4")}
      />

      {type !== "text" && (
        <Tooltip content={"Gửi bình luận"} color='invert'>
          <Button
            rounded
            css={{
              minWidth: "0",
              width: "40px",
            }}
            onClick={() => {
              if (!value2) return;
              postComment(postId, value2, auth.currentUser.uid)
                .then(() => {
                  setValue2("");
                  console.log("Comment successfully");
                  toast.success("Gửi comment thành công");
                  fetchComment();
                })
                .catch((err) => console.log(err));
            }}
            light
            icon={<RiSendPlane2Fill className='text-lg' />}
          ></Button>
        </Tooltip>
      )}
    </div>
  );
};

export default Comment;
