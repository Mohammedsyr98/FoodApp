import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../..//../../assets/4 4.svg";

export default function AuthLayout() {
  return (
    <>
      <div className="form-bacgrkound  ">
        <div className="overlay   vw-100 container-fluid d-flex align-items-center justify-content-center">
          <div className="form-box bg-white rounded-4 col-11 col-lg-6 pt-5  px-5">
            <div className="logo text-center">
              <img className="w-75" src={logo} />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
