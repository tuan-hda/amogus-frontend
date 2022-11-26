import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className='grid grid-cols-12'>
        <Sidebar />
        <div className='col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
