import React, { useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineEdit } from "react-icons/ai";
import { Avatar } from "../components";
import EditProfileModal from "../components/modals/EditProfileModal";
import UserContext from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div className='bg-white w-[700px] pb-[80px] rounded-xl  mx-auto'>
      <EditProfileModal visible={visible} closeHandler={() => closeHandler()} />
      <div className='relative'>
        <img
          src='https://marketplace.canva.com/EAE8OiJn5Uw/1/0/1600w/canva-light-green-orange-illustrative-environment-facebook-cover-wJsZ4lTGp4M.jpg'
          alt='Cover'
          className='rounded-t-xl object-cover object-center h-[250px] w-full'
        />
        <Avatar
          src={user?.photoURL || "http://cdn.onlinewebfonts.com/svg/img_264570.png"}
          custom={"w-[180px] absolute -bottom-[95px] left-6"}
        />
      </div>
      <div className='flex mt-4 ml-[220px] items-center'>
        <div>
          <h2 className='text-[18px] mb-0'>{user?.name}</h2>
          <p className='text-[14px] text-gray-600'>{user?.email}</p>
        </div>
        <Button
          bordered
          color={"success"}
          onClick={() => handler()}
          css={{ minWidth: "180px" }}
          icon={<AiOutlineEdit />}
          className='mr-6 ml-auto'
        >
          Chỉnh sửa hồ sơ
        </Button>
      </div>
      {/* Main Info */}
      {/* <div className='mx-8 mt-10 '>
        <h4>About</h4>
        <p className=''>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum metus felis, eget viverra sem ornare
          vel. Curabitur vel viverra libero.
        </p>
        <div className='flex items-center mt-2'>
          <CiLocationOn color='#108944' />
          <p className='ml-4 font-light'>HCM City</p>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
