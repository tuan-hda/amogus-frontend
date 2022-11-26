import { Button } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiFillTrophy, AiOutlineHome, AiOutlineTrophy } from "react-icons/ai";
import { RiUser3Fill, RiUser3Line } from "react-icons/ri";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserProvider";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";

const getIndex = () => {
  const path = window.location.pathname;

  if (path.includes("/profile")) return 1;
  if (path.includes("/achievement")) return 2;
  if (path.includes("/admin")) return 3;
  return 0;
};

const Sidebar = () => {
  const [index, setIndex] = useState(getIndex());
  const { user } = useContext(UserContext);

  let menus;

  if (user && user.role === "ADMIN") {
    menus = [
      [
        "Trang chủ",
        "/",
        <AiFillHome className='text-black text-xl' />,
        <AiOutlineHome className='text-black text-xl' />,
      ],
      [
        "Cá nhân",
        "/profile",
        <RiUser3Fill className='text-black text-xl' />,
        <RiUser3Line className='text-black text-xl' />,
      ],
      [
        "Thành tựu",
        "/achievement",
        <AiFillTrophy className='text-black text-xl' />,
        <AiOutlineTrophy className='text-black text-xl' />,
      ],
      [
        "Admin",
        "/admin",
        <RiAdminFill className='text-black text-xl' />,
        <RiAdminLine className='text-black text-xl' />,
      ],
    ];
  } else
    menus = [
      [
        "Trang chủ",
        "/",
        <AiFillHome className='text-black text-xl' />,
        <AiOutlineHome className='text-black text-xl' />,
      ],
      [
        "Cá nhân",
        "/profile",
        <RiUser3Fill className='text-black text-xl' />,
        <RiUser3Line className='text-black text-xl' />,
      ],
      [
        "Thành tựu",
        "/achievement",
        <AiFillTrophy className='text-black text-xl' />,
        <AiOutlineTrophy className='text-black text-xl' />,
      ],
    ];

  const selectedItem = menus[index];

  return (
    <div className='space-y-4 sticky top-4'>
      {menus.map(([menuItem, path, icon, icon2], i) => {
        return (
          <SidebarItem
            key={i}
            icon={icon}
            icon2={icon2}
            path={path}
            selectedItem={selectedItem}
            onClick={() => setIndex(i)}
          >
            {menuItem}
          </SidebarItem>
        );
      })}
    </div>
  );
};

const SidebarItem = ({ icon, path, children, selectedItem, onClick, icon2 }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='lg:block hidden'>
        <Button
          color='success'
          onClick={() => {
            navigate(path);
            onClick();
          }}
          light
          icon={selectedItem[0] === children ? icon : icon2}
          size='xl'
        >
          <span className={classNames(" text-black", selectedItem[0] === children ? "font-medium" : "font-light")}>
            {children}
          </span>
        </Button>
      </div>
      <div className='lg:hidden'>
        <Button
          color='success'
          rounded
          css={{
            minWidth: "0",
            width: "64px",
          }}
          onClick={() => {
            navigate(path);
            onClick();
          }}
          light
          icon={selectedItem[0] === children ? icon : icon2}
          size='xl'
        ></Button>
      </div>
    </>
  );
};

export default Sidebar;
