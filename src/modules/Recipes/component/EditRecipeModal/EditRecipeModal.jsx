import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategoriesContext } from "../../../../contexts/getAllCategories";
import { getAllTagsContext } from "../../../../contexts/getAllTags";
import { getRecipeInformationContext } from "../../../../contexts/EditRecipeContext";
import { resipesUrls } from "../../../../constants/EndPoints";

export default function EditRecipe() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
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
    allCategoriesForFilter,
    getAllCategoriesForFilter,
    setIsLoading,
    isLoading,
  } = useContext(getAllCategoriesContext);
  const { tags } = useContext(getAllTagsContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const getRecipe = async () => {
    try {
      let response = await axios.get(resipesUrls.getRecipeById(recipeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedRecipe(response.data);

      setIsLoading(false);
    } catch (error) {
      error;
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getRecipe();
  }, []);
  useEffect(() => {
    getAllCategoriesForFilter();

    if (selectedRecipe) {
      setValue("name", selectedRecipe.name);
      setValue("tagId", selectedRecipe.tag.id);
      setValue("price", selectedRecipe.price);
      setValue("categoriesIds", selectedRecipe.category[0].id);
      setValue("description", selectedRecipe.description);
      selectedRecipe.category[0].id;
    }
    selectedRecipe;
  }, [selectedRecipe]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);
    formData.append("recipeImage", data.recipeImage ? data.recipeImage : "");

    try {
      let response = await axios.put(
        resipesUrls.editRecipe(selectedRecipe.id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLoading(false);
      toast.success("Recipe updated sucessfully");
      navigate("/dashboard/recipes");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
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
              You can now fill the meals easily using the table and form,{" "}
              <br></br>
              click here and fill it with the table!
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
                required: "Recipe Name Is Required",
              })}
            />
          </div>
          <div className="mb-3">
            {errors.name && (
              <p className="text-danger ">{errors.name.message}</p>
            )}
          </div>

          {/* For tags */}
          <select
            className="form-select form-control"
            {...register("tagId", {
              required: "Tag Is Required",
            })}>
            <option value="" disabled>
              Select tag
            </option>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))
            ) : (
              <option disabled>...Loading</option>
            )}
          </select>
          <div className="mb-3">
            {errors.tagId && (
              <p className="text-danger ">{errors.tagId.message}</p>
            )}
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
            <span className="input-group-text">EGP</span>
          </div>
          <div className="mb-3">
            {errors.price && (
              <p className="text-danger ">{errors.price.message}</p>
            )}
          </div>

          {/* For categories */}
          <select
            className="form-select  form-control"
            {...register("categoriesIds", {
              required: "Category Is Required",
            })}>
            <option value="" disabled>
              Select Category
            </option>
            {allCategoriesForFilter.length > 0 ? (
              allCategoriesForFilter.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>...Loading</option>
            )}
          </select>
          <div className="mb-3">
            {errors.categoriesIds && (
              <p className="text-danger ">{errors.categoriesIds.message}</p>
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
            {...register("recipeImage", {
              required: "The Image Is Required",
            })}
          />
          {errors.recipeImage && (
            <p className="text-danger ">{errors.recipeImage.message}</p>
          )}
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
