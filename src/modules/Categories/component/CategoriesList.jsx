import React from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
export default function CategoriesList() {
  return (
    <div>
      {" "}
      <Header
        tite={"Categories Item"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        photo={headerPhoto2}
      />
    </div>
  );
}
