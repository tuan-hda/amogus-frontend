import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { auth } from "../firebase";
import errorMessages from "../utils/errorMessages.json";

const validationSchema = yup.object({
  email: yup
    .string()
    .required(errorMessages.required)
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email không hợp lệ"
    ),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Gửi thành công, vui lòng kiểm tra email của bạn!", {
          position: "top-right",
          autoClose: 5000,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
        const strErr = String(err);
        if (strErr.includes("auth/user-not-found")) {
          setError("email", {
            message: "Email không tồn tại",
          });
        }
      });
  };

  return (
    <form className='m-auto' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-[64px] text-primary font-normal text-center tracking-wide'>Quên mật khẩu</h1>
      <p
        className='text-primary mt-8 tracking-wide text-center'
        onClick={() =>
          toast.success("Gửi thành công, vui lòng kiểm tra email của bạn!", {
            position: "top-right",
            autoClose: 1000,
            progress: undefined,
            theme: "dark",
          })
        }
      >
        Giúp bạn truy cập lại vào tài khoản!
      </p>
      <div className='mt-9 flex justify-center'>
        <Input
          width='300px'
          aria-label='email'
          placeholder='Email'
          name='email'
          css={{
            maxWidth: "100%",
            $$inputFontSize: "14px",
          }}
          size='lg'
          status={errors.email && "error"}
          helperText={errors.email?.message}
          helperColor='error'
          {...register("email")}
        />
      </div>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-[282px] text-sm flex justify-between font-medium'>
          <Link className='text-black' to='/login'>
            Trở lại
          </Link>
        </div>
      </div>

      <div className='mt-5 flex justify-center'>
        <Button type='submit' color='success' css={{ width: "100%", maxWidth: "300px" }}>
          Đặt lại mật khẩu
        </Button>
      </div>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </form>
  );
};

export default ForgetPassword;
