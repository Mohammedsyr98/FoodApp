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

function AddModal({ handleCloseAddModal, showAddModal, getCategoryList }) {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(categoriesUrls.getCategory, data);
      response;

      toast.success("Category Created Successfully");
      getCategoryList();
      handleCloseAddModal();

      reset();
    } catch (error) {
      reset();
    }
  };
  return (
    <>
      <Modal className="" show={showAddModal} onHide={handleCloseAddModal}>
        <div className="d-flex flex-column ">
          <div className="d-flex align-items-center flex-row-reverse">
            <IoIosCloseCircleOutline
              onClick={handleCloseAddModal}
              className="class-button"
            />
            <span className="confirm-add-title">Add Category</span>
          </div>
          <div className="confirm-add-content d-flex flex-column ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="input-group mb-1">
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Category Name"
                    {...register("name", {
                      required: "Category Name Is Required",
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-danger ">{errors.name.message}</p>
                )}
              </div>
              <div className="text-end">
                <button
                  disabled={isSubmitting}
                  className="add-modal-button text-white border-0 rounded-3">
                  {isSubmitting ? <div className="loader"></div> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddModal;
