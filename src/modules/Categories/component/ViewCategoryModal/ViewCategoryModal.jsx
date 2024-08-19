/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { categoriesUrls } from "../../../../constants/EndPoints";

function ViewCategoryModal({
  showViewModal,
  handleCloseViewModal,
  selecetedCategory,
  convertISOToReadableDate,
}) {
  selecetedCategory;
  return (
    <>
      <Modal className="" show={showViewModal} onHide={handleCloseViewModal}>
        <div className="d-flex flex-column ">
          <div className="d-flex align-items-center flex-row-reverse">
            <IoIosCloseCircleOutline
              onClick={handleCloseViewModal}
              className="class-button"
            />
            <span className="confirm-add-title">Category details</span>
          </div>

          <div className="user-details-content mt-3 d-flex flex-column ">
            <div className="title">
              <span className="head">Name :</span>{" "}
              <span>{selecetedCategory.name}</span>
            </div>
            <div className="title">
              <span className="head">Modification Date :</span>{" "}
              <span>
                {convertISOToReadableDate(selecetedCategory.modificationDate)}
              </span>
            </div>
            <div className="title">
              <span className="head">Creation Date :</span>{" "}
              <span>
                {convertISOToReadableDate(selecetedCategory.creationDate)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              handleCloseViewModal();
            }}
            className="confirm-delete align-self-end">
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ViewCategoryModal;
