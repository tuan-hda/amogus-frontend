import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import errorMessages from "../utils/errorMessages.json";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";

const validationSchema = yup.object({
  email: yup.string().required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const strErr = String(error);
        setError("email");
        if (strErr.includes("auth/too-many-requests")) {
          setError("password", {
            message: "Quá nhiều yêu cầu, vui lòng thử lại sau",
          });
        } else if (strErr.includes("auth/too-many-requests")) {
          setError("password", {
            message: "Lỗi gì đó đã xảy ra",
          });
        } else if (strErr.includes("auth/invalid-email") || strErr.includes("auth/user-not-found")) {
          setError("password", {
            message: "Sai tài khoản hoặc mật khẩu",
          });
        } else {
          setError("password", {
            message: "Lỗi gì đó đã xảy ra",
          });
        }
      });
  };

  const thirdPartyLogin = (type) => {
    signInWithPopup(auth, type === "google" ? googleProvider : facebookProvider)
      .then(() => {
        console.log("Login successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className='m-auto' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-[64px] text-primary font-normal text-center tracking-wide'>Đăng nhập</h1>
      <p className='text-primary mt-8 tracking-wide text-center' onClick={() => signOut(auth)}>
        Truy cập vào tài khoản và bắt đầu khám phá!
      </p>
      <div className='mt-9 flex justify-center'>
        <Input
          width='300px'
          aria-label='email'
          placeholder='Email'
          color='black'
          name='email'
          css={{
            maxWidth: "100%",
            $$inputFontSize: "14px",
          }}
          size='lg'
          status={errors.email && "error"}
          helperText={capitalizeFirstLetter(errors.email?.message)}
          helperColor='error'
          {...register("email")}
        />
      </div>
      <div className='mt-8 flex justify-center'>
        <Input.Password
          aria-label='password'
          width='300px'
          color='white'
          placeholder='Mật khẩu'
          name='password'
          css={{ maxWidth: "100%", $$inputFontSize: "14px" }}
          size='lg'
          status={errors.password && "error"}
          helperText={capitalizeFirstLetter(errors.password?.message)}
          helperColor='error'
          {...register("password")}
        />
      </div>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-[282px] text-sm flex justify-between font-medium'>
          <Link className='text-black' to='/forgetpassword'>
            Quên mật khẩu?
          </Link>
          <Link to='/signup'>Đăng ký</Link>
        </div>
      </div>

      <div className='mt-5 flex justify-center'>
        <Button type='submit' color='success' css={{ width: "100%", maxWidth: "300px" }}>
          Đăng nhập
        </Button>
      </div>

      <div className='w-[300px] border-t border-gray-400 mt-3 relative left-1/2 -translate-x-1/2'></div>

      <div className='flex justify-center mt-3'>
        <div className='flex justify-between w-[300px] max-w-full'>
          <Button
            color='error'
            css={{
              width: "144px",
              minWidth: 0,
            }}
            icon={<AiFillGoogleCircle className='text-lg' />}
            onClick={() => thirdPartyLogin("google")}
          >
            <span className='ml-4'>Google</span>
          </Button>
          <Button
            css={{
              width: "144px",
              minWidth: 0,
            }}
            icon={<AiFillFacebook className='text-lg' />}
            onClick={() => thirdPartyLogin("facebook")}
          >
            <span className='ml-4'>Facebook</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
