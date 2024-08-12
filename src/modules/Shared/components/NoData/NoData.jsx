import React from "react";
import noData from "../../../../assets/noData.png";
export default function NoData() {
  return (
    <div className="no-data d-flex flex-column align-items-center">
      <img src={noData} />
      <span className="title">No Data !</span>
    </div>
  );
}
