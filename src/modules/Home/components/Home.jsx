/* eslint-disable react/prop-types */
import React from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto from "../../../assets/headerPhoto-1.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Home({ userInformation }) {
  const navigate = useNavigate();
  const UserInformation = jwtDecode(localStorage.getItem("token"));
  return (
    <div className="home">
      <Header
        tite={`Welcome ${UserInformation.userName}`}
        desc={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        photo={headerPhoto}
      />
      <div className="background">
        <div className="head d-flex flex-row align-items-center">
          <div className="text d-flex flex-column">
            <span className="title">
              Fill the<span className="green-title"> Recipes</span> !
            </span>
            <span className="des">
              you can now fill the meals easily using the table and form,{" "}
              <br></br>
              click here and sill it with the table !
            </span>
          </div>
          <button
            onClick={() => navigate("/dashboard/recipes")}
            className="all-recipe-button">
            All Recipes
          </button>
        </div>
      </div>
    </div>
  );
}
