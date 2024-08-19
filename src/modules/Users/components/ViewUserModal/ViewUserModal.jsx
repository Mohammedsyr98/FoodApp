import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { baseImageUrl } from "../../../../constants/EndPoints";
import { FaRegUserCircle } from "react-icons/fa";

export default function ViewModal({
  handleCloseShowViewModal,
  showUserViewModal,
  handleShowUserViewModal,
  userDetails,
}) {
  userDetails;
  return (
    <>
      <Modal
        className="user-details"
        show={showUserViewModal}
        onHide={handleCloseShowViewModal}>
        <div className="d-flex flex-column ">
          <div className="d-flex align-items-center flex-row-reverse">
            {/* <IoIosCloseCircleOutline
                onClick={handleCloseAddModal}
                className="class-button"
              /> */}
            <span className="confirm-add-title">User details</span>
          </div>
          <span className="text-center my-5">
            {" "}
            {userDetails.imagePath ? (
              <img
                className="w-50 rounded-100 user-photo"
                src={`${baseImageUrl}/${userDetails.imagePath}`}
                alt=""
              />
            ) : (
              <FaRegUserCircle className="anony-user" />
            )}
          </span>
          <div className="user-details-content d-flex flex-column ">
            <div className="title">
              <span className="head">User Name :</span>{" "}
              <span>{userDetails.userName}</span>
            </div>
            <div className="title">
              <span className="head">Phone Number :</span>{" "}
              <span>{userDetails.phoneNumber}</span>
            </div>
            <div className="title">
              <span className="head">Country :</span>{" "}
              <span>{userDetails.country}</span>
            </div>
          </div>
          <button
            onClick={() => {
              handleCloseShowViewModal();
            }}
            className="confirm-delete align-self-end">
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
