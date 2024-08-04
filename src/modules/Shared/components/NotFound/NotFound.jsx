import React from "react";
import logo from "../../../../assets/Group.svg";
import character from "../../../../assets/character.png";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="not-found  d-flex flex-column justify-content-between">
      <div className="logo ">
        <img className="mt-4 mx-4" src={logo} alt="" />
      </div>
      <div className="row p-0 m-0 align-items-center">
        <div className="text col-12 col-lg-5">
          <span className="fw-bold">Oops.</span>
          <br></br>
          <span className="title">Page Not Found</span>
          <br></br>
          <span className="desc d-flex flex-column py-2">
            <span> This Page doesn’t exist or was removed!</span>

            <span>We suggest you back to home.</span>
          </span>
          <Link className="text-decoration-none" to={"/dashboard"}>
            <button className=" form-button text-white border-0 rounded-3 fw-bold d-flex flex-row-reverse align-items-center">
              <div className="d-flex flex-column">
                <span>Back To</span>
                <span>Home</span>
              </div>
              <IoArrowBackSharp className="back-icon" />
            </button>
          </Link>
        </div>
        <div className="character col-12 col-lg-6">
          <img className="w-100" src={character} alt="" />
        </div>
      </div>
    </div>
  );
}
