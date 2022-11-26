import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "../components";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className='grid grid-cols-12 bg-[#F5F5F5] w-full relative z-0 top-0  pl-2 lg:pl-[calc(50vw-700px)] lg:pr-[calc(50vw-650px)] pr-4 pb-4 h-[calc(100vh-76px)] overflow-auto'>
        <div className='lg:col-span-3 md:col-span-1 col-span-2'>
          <Sidebar />
        </div>
        <div className='md:col-span-11 col-span-10 lg:col-span-9 h-fit pt-4'>
          <Outlet />
        </div>
      </div>
      <ToastContainer className='z-100' position='top-right' />
    </div>
  );
};

export default MainLayout;
