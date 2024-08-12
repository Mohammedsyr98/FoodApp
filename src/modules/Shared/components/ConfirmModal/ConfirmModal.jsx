/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

function ConfirmModal({
  handleClose,
  show,
  selecetedCategory,
  deleteSelectedValue,
  item,
}) {
  console.log(selecetedCategory);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className="text-end">
          <IoIosCloseCircleOutline
            onClick={handleClose}
            className="class-button"
          />
        </div>
        <div className="confirm-content d-flex flex-column align-items-center">
          <img className="w-50" src={noData} alt="" />
          <span className="confirm-title">Delete This {item} ?</span>
          <span className="confirm-desc">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </span>
          <button
            onClick={() => {
              deleteSelectedValue(selecetedCategory);
              handleClose();
            }}
            className="confirm-delete align-self-end">
            Delete this item
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ConfirmModal;
