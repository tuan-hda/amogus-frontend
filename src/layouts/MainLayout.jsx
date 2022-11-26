import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const MainLayout = () => {
  return (
    <div>
      <h1>HEADER</h1>
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
