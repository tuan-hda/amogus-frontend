import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { Achievement, Home, Profile } from "./pages";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/achievement' element={<Achievement />} />
      </Route>
    </Routes>
  );
};

export default App;
