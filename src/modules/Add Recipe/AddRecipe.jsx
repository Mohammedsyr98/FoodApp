import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { getTags, resipesUrls } from "../../constants/EndPoints";
import { useNavigate } from "react-router-dom";
import { getAllCategoriesContext } from "../../contexts/getAllCategories";
import { getAllTagsContext } from "../../contexts/getAllTags";
import { paginationContext } from "../../contexts/Pagination";
export default function AddRecipe() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  // const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const notify = (message) => toast(message);

  const handleChange = (file) => {
    setValue("recipeImage", file);
  };
  const {
    pageNumbers,
    currentPage,
    setPageNumbers,
    handlePageChange,
    renderPaginationItems,
  } = useContext(paginationContext);
  const {
    allCategories,
    isLoading,
    getCategoryList,
    setIsLoading,
    setFiltrationSearch,
  } = useContext(getAllCategoriesContext);
  const { tags } = useContext(getAllTagsContext);
  // const getAllTags = async (data) => {
  //   try {
  //     let response = await axios.get(getTags, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     setTags(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   tags();
  //   getCategoryList();
  // }, []);
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);
    formData.append("recipeImage", data.recipeImage ? data.recipeImage : "");
    console.log(data.recipeImage);
    try {
      let response = await axios.post(resipesUrls.getRecipes, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategoryList(99999999999, 1);
  }, [isLoading]);
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
          <button
            onClick={() => navigate("/dashboard/recipes")}
            className="all-recipe-button">
            All Recipes
          </button>
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
            {tags.length > 0 ? (
              tags.map((tag, i) => (
                <option key={i} value={i + 1}>
                  {tag.name}
                </option>
              ))
            ) : (
              <option disabled>...Loading</option>
            )}
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
            className="form-select  form-control"
            aria-label="Default select example"
            {...register("categoriesIds", {
              required: "Category Is Required",
            })}>
            <option value="" disabled selected>
              Select Category
            </option>
            {allCategories.length > 0 ? (
              allCategories.map((cat, i) => (
                <option key={i} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>...Loading</option>
            )}
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
        <button
          onClick={() => navigate("/dashboard/recipes")}
          className="cancel">
          Cancel
        </button>
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="save">
          {isLoading ? <div className="loader"></div> : "Save"}
        </button>
      </div>
    </div>
  );
}
