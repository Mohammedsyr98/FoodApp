import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
export default function MasterLayout({ userInformation }) {
  const [dropdownOpenned, setDropdownOpenned] = useState(false);

  return (
    <div
      onClick={() => dropdownOpenned && setDropdownOpenned(false)}
      className="d-flex">
      <div>
        <SideBar />
      </div>
      <div className="w-100">
        <NavBar
          setDropdownOpenned={setDropdownOpenned}
          dropdownOpenned={dropdownOpenned}
          userInformation={userInformation}
        />
        <div className="px-3" style={{ minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
