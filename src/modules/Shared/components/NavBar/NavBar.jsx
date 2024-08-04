import React, { useState } from "react";
import userIcon from "../../../../assets/user-icon.png";
import { IoMdNotifications } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
export default function NavBar({
  userInformation,
  setDropdownOpenned,
  dropdownOpenned,
}) {
  console.log(userInformation);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        <form className="d-flex align-items-center" role="search">
          <CiSearch className="search-icon" />
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Here"
            aria-label="Search"
          />
        </form>

        <div
          className="collapse navbar-collapse flex-grow-0"
          id="navbarNavDropdown">
          <ul className="navbar-nav ">
            <li className="nav-item dropdown d-flex align-items-center">
              <a
                className="nav-link dropdown-toggle"
                onClick={() => setDropdownOpenned(!dropdownOpenned)}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <img className=" mx-3" src={userIcon} />
                {/* userInformation.userName */}
                <span className="user-name pe-4">
                  {userInformation?.userName}
                </span>
                <RiArrowDropDownLine
                  className={
                    dropdownOpenned ? "dropdown-icon-rotate" : "dropdown-icon"
                  }
                />
              </a>
              <IoMdNotifications />
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
