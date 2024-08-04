/* eslint-disable react/prop-types */
import React from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto from "../../../assets/headerPhoto-1.png";

export default function Home({ userInformation }) {
  console.log(userInformation ? userInformation : "");
  return (
    <div>
      <Header
        tite={"Welcome Upskilling!"}
        desc={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        photo={headerPhoto}
      />
    </div>
  );
}
