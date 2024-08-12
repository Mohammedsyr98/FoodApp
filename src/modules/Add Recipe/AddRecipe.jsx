import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { resipesUrls } from "../../constants/EndPoints";
export default function AddRecipe() {
  const fileTypes = ["JPG", "PNG", "GIF"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const notify = (message) => toast(message);
  const handleChange = (file) => {
    setValue("photo", file);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);
    formData.append("photo", data.photo[0]);
    try {
      let response = await axios.post(resipesUrls.getRecipes, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);

      //   toast.error(error.response.data.message);
    }
  };
  return (
    <div className="add-recipe">
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
          <button className="all-recipe-button">All Recipes</button>
        </div>
      </div>
      <form>
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Recipe Name"
              {...register("name", {
                required: "Recipe Name Is Reqiured",
              })}
            />
          </div>
          <div className="mb-3">
            {errors.name && (
              <p className="text-danger ">{errors.name.message}</p>
            )}
          </div>
          <select
            className="form-select form-control"
            aria-label="Default select example"
            {...register("tagId", {
              required: "Tag Is Required",
            })}>
            <option value="" disabled selected>
              Select tag
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="mb-3">
            {errors.tag && <p className="text-danger ">{errors.tag.message}</p>}
          </div>
          <div className="input-group">
            <input
              type="number"
              className="form-control py-2"
              placeholder="Price"
              {...register("price", {
                required: "Price Is Required",
              })}
            />
            {<span className="input-group-text">EGP</span>}
          </div>
          <div className="mb-3">
            {errors.price && (
              <p className="text-danger ">{errors.price.message}</p>
            )}
          </div>
          <select
            className="form-select  form-control "
            aria-label="Default select example"
            {...register("categoriesIds", {
              required: "Category Is Required",
            })}>
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="1">cat1</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="mb-3">
            {errors.category && (
              <p className="text-danger ">{errors.category.message}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Description"
              {...register("description", {
                required: "Description Is Required",
              })}
            />
          </div>
          <div className="mb-3">
            {errors.description && (
              <p className="text-danger ">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="uploader">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
      </form>
      <div className="buttons text-end">
        <button className="cancel">Cancel</button>
        <button onClick={handleSubmit(onSubmit)} className="save">
          Save
        </button>
      </div>
    </div>
  );
}
