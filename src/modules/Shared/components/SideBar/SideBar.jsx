import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import sidebarLogo from "../../../../assets/sidebar-logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { PiCardsBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
export default function SideBar() {
  const [sidebarCollaps, setSidebarCollaps] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();

    navigate("/login");
  };
  return (
    <div className="sidebar h-100 ">
      <Sidebar collapsed={sidebarCollaps} className="h-100">
        <Menu className="pt-5">
          <MenuItem className="logo mb-5">
            <img
              onClick={() => setSidebarCollaps(!sidebarCollaps)}
              src={sidebarLogo}
            />
          </MenuItem>
          <MenuItem
            icon={<AiOutlineHome />}
            active={
              location.pathname === "/dashboard/home" ||
              location.pathname === "/dashboard"
            }
            component={<Link to={"home"} />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<FiUsers />}
            active={location.pathname === "/dashboard/users"}
            component={<Link to={"users"} />}>
            Users
          </MenuItem>
          <MenuItem
            icon={<PiCardsBold />}
            active={location.pathname === "/dashboard/recipes"}
            component={<Link to={"recipes"} />}>
            Recipes
          </MenuItem>
          <MenuItem
            icon={<SlCalender />}
            active={location.pathname === "/dashboard/categoriesList"}
            component={<Link to={"categoriesList"} />}>
            Categories
          </MenuItem>
          <MenuItem
            icon={<RiLockPasswordLine />}
            active={location.pathname === "/dashboard/changePassword"}>
            Change Password
          </MenuItem>
          <MenuItem
            icon={<MdOutlineLogout />}
            onClick={logOut}
            active={location.pathname === "/dashboard/logout"}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
