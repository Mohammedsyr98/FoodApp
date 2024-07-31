import React from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
export default function MasterLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div style={{ background: "#607D8B" }} className="col-3 ">
          <SideBar />
        </div>
        <div className="col-9">
          <NavBar />
          <div style={{ background: "grey", height: "100vh" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
