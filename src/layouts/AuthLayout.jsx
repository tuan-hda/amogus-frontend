import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthVector from "../assets/auth_vector.svg";
import { auth } from "../firebase";
import UserContext from "../utils/UserProvider";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className='w-screen h-screen overflow-auto bg-[#E5E5E5] flex flex-col px-6 pt-6'>
      <Outlet />
      <div className='-ml-6 -mr-6 mt-6'>
        <img src={AuthVector} className='w-full' alt='Auth footer' />
      </div>
    </div>
  );
};

export default AuthLayout;
