import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectComponent({ props, userInformation, children }) {
  userInformation;
  return (
    <>
      {userInformation || localStorage.getItem("token") ? (
        children
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
