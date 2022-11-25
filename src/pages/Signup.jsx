import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import errorMessages from "../utils/errorMessages.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
  email: yup
    .string()
    .required(errorMessages.required)
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email không hợp lệ"
    ),
  name: yup.string().required(errorMessages.required),
  password: yup
    .string()
    .required(errorMessages.required)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, errorMessages.password),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], errorMessages.confirmPassword),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  // Redirect after registered successfully
  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed" && payload.data.page === "signup") {
        navigate("/");
      }
    });
  }, []);

  const onSubmit = ({ email, name, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        })
          .then(() => {
            toast.success("Đăng ký thành công!", {
              position: "top-right",
              autoClose: 5000,
              progress: undefined,
              theme: "dark",
              data: {
                page: "signup",
              },
            });
          })
          .catch((err) => {
            console.log("Error updating name: ", err);
          });
      })
      .catch((err) => {
        console.log(err);
        const strErr = String(err);

        if (strErr.includes("auth/email-already-in-use")) {
          setError("email", {
            message: "Email đã tồn tại",
          });
        } else if (strErr.includes("auth/too-many-requests")) {
          ["email", "password", "name"].forEach((field) => setError(field));
          setError("confirmPassword", {
            message: "Quá nhiều yêu cầu, vui lòng thử lại sau",
          });
        } else {
          ["email", "password", "name"].forEach((field) => setError(field));
          setError("confirmPassword", {
            message: "Lỗi gì đó đã xảy ra",
          });
        }
      });
  };

  return (
    <form className='m-auto' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-[64px] text-primary font-normal text-center tracking-wide'>Đăng ký</h1>
      <p className='text-primary mt-8 tracking-wide text-center'>Tạo tài khoản của bạn ngay và luôn!</p>
      {/* Email */}
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
      {/* Tên */}
      <div className='mt-9 flex justify-center'>
        <Input
          width='300px'
          aria-label='name'
          placeholder='Tên'
          color='black'
          name='name'
          css={{
            maxWidth: "100%",
            $$inputFontSize: "14px",
          }}
          size='lg'
          status={errors.name && "error"}
          helperText={capitalizeFirstLetter(errors.name?.message)}
          helperColor='error'
          {...register("name")}
        />
      </div>
      {/* Mật khẩu */}
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
      {/* Xác nhận mật khẩu */}
      <div className='mt-8 flex justify-center'>
        <Input.Password
          aria-label='confirmPassword'
          width='300px'
          color='white'
          name='confirmPassword'
          placeholder='Xác nhận mật khẩu'
          css={{ maxWidth: "100%", $$inputFontSize: "14px" }}
          size='lg'
          status={errors.confirmPassword && "error"}
          helperText={capitalizeFirstLetter(errors.confirmPassword?.message)}
          helperColor='error'
          {...register("confirmPassword")}
        />
      </div>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-[282px] text-sm flex justify-end font-medium'>
          <Link to='/login'>Đăng nhập</Link>
        </div>
      </div>

      <div className='mt-5 flex justify-center'>
        <Button type='submit' color='success' css={{ width: "100%", maxWidth: "300px" }}>
          Đăng ký
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

export default Signup;
