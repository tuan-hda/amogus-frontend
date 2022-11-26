import React from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineEdit } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Post } from "../components";

const Profile = () => {
  return (
    <div className="bg-white w-[700px] h-[1100px] rounded-xl  mx-auto">
      <div className="relative">
        <img
          src="https://marketplace.canva.com/EAE8OiJn5Uw/1/0/1600w/canva-light-green-orange-illustrative-environment-facebook-cover-wJsZ4lTGp4M.jpg"
          alt="Cover"
          className="rounded-t-xl object-cover object-center h-[250px] w-full"
        />
        <img
          src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/24/tumblr0a490ad7062f51c33ec0c054255256a2a1922eb2540-1664001587930930202526.jpg"
          alt="Avatar"
          className="rounded-full w-[180px] aspect-square object-cover absolute -bottom-[90px] left-6"
        />
      </div>
      <div className="flex mt-4 ml-[220px] items-center">
        <div>
          <h2 className="text-[18px] mb-0">Nguyen Tran Cam Tien</h2>
          <p className="text-[14px] text-gray-600">haileynguyenss@gmail.com</p>
        </div>
        <Button
          bordered
          color={'success'}
          css={{ minWidth: "180px" }}
          icon={<AiOutlineEdit />}
          className="mr-6 ml-auto"
        >
          Chỉnh sửa hồ sơ
        </Button>
      </div>
      {/* Main Info */}
      <div className="mx-8 mt-10 ">
        <h4>About</h4>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          bibendum metus felis, eget viverra sem ornare vel. Curabitur vel
          viverra libero.
        </p>
        <div className="flex items-center mt-2">
          <CiLocationOn color="#108944"/>
          <p className="ml-4 font-light">HCM City</p>
        </div>
        <div className="flex mt-4">
          <Button
            light
            color="success"
            bordered
            auto
            className="text-[18px] "
            css={{
              color: "Black",
              borderRadius: 0,
              borderTopWidth: 0,
              borderBottomWidth: 2,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
          >
            Post
          </Button>
        </div>
      </div>
      <Post />
    </div>
  );
};

export default Profile;
