import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className='grid grid-cols-12 bg-[#F5F5F5] w-full relative z-0 top-0 lg:pl-[calc(50vw-700px)] pl-2 pr-4 md:pt-4 pt-0 pb-4 h-[calc(100vh-76px)] overflow-auto'>
        <div className='lg:col-span-3 col-span-2'>
          <Sidebar />
        </div>
        <div className='col-span-10 lg:col-span-9 h-fit pt-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
