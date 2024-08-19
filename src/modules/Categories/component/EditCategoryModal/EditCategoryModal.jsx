/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { categoriesUrls } from "../../../../constants/EndPoints";
import { getAllCategoriesContext } from "../../../../contexts/getAllCategories";

function EditCategoryModal({
  selecetedCategory,
  handleCloseEditModal,
  showEditModal,
}) {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();
  selecetedCategory.id;
  const { getCategoryList } = useContext(getAllCategoriesContext);
  useEffect(() => {
    if (selecetedCategory) {
      setValue("name", selecetedCategory.name);
    }
  }, [selecetedCategory, setValue]);
  const onSubmit = async (data) => {
    try {
      data;

      let response = await axios.put(
        categoriesUrls.getCategoryById(selecetedCategory.id),
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getCategoryList();
      response;

      toast.success("Category Edited Successfully");
      getCategoryList();
      handleCloseEditModal();

      reset();
    } catch (error) {
      error;
      reset();
    }
  };
  return (
    <>
      <Modal className="" show={showEditModal} onHide={handleCloseEditModal}>
        <div className="d-flex flex-column ">
          <div className="d-flex align-items-center flex-row-reverse">
            <IoIosCloseCircleOutline
              onClick={handleCloseEditModal}
              className="class-button"
            />
            <span className="confirm-add-title">Edit Category</span>
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

export default EditCategoryModal;
