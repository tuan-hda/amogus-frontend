import React from "react";
import { User } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { verifyPost } from "../api/post";

const PostHeader = ({ scrutinize, id, image, name = "", userId = "" }) => {
  console.log(scrutinize);

  return (
    <div className='flex justify-between'>
      <Link to={`/profile/${userId}`}>
        <User src={image} name={name}></User>
      </Link>

      <Dropdown>
        <Dropdown.Button light rounded icon={<HiDotsHorizontal className='relative left-[12px] -top-[1px]' />} />
        <Dropdown.Menu aria-label='Static Actions'>
          {scrutinize && (
            <Dropdown.Item key='approve' color='primary'>
              <p
                className='min-w-full'
                onClick={() => {
                  auth.currentUser
                    .getIdToken()
                    .then((token) => {
                      verifyPost(token, id, true).then(() => console.log("Verified successfully"));
                    })
                    .catch((error) => console.log(error));
                }}
              >
                Duyệt
              </p>
            </Dropdown.Item>
          )}
          {scrutinize && (
            <Dropdown.Item key='decline' color='error'>
              <p className='min-w-full'>Không duyệt</p>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default PostHeader;
