import React, { useEffect, useState } from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import { baseImageUrl, resipesUrls } from "../../../constants/EndPoints";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../../Shared/components/ConfirmModal/ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function RecipesList() {
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [selecetedCategory, setSelectedCategory] = useState(null);
  const [isloading, SetIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function convertISOToReadableDate(isoString) {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const readableDate = date.toLocaleDateString("en-US", options);

    return readableDate;
  }
  const getRecipesList = async (data) => {
    try {
      let response = await axios.get(resipesUrls.getRecipes, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data);
      setRecipesList(response.data.data);
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSelectedValue = async (id) => {
    console.log(id);
    SetIsLoading(true);
    try {
      let response = await axios.delete(resipesUrls.delete(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getRecipesList();

      toast.success("Item deleted successfully");
    } catch (error) {
      console.log(error);
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    getRecipesList();
  }, []);
  return (
    <div>
      <Header
        tite={"Recipes Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        photo={headerPhoto2}
      />
      <div className="head d-flex justify-content-between">
        {" "}
        <div className="d-flex flex-column">
          <span>Recipe Table Details</span>
          <span>You can check all details</span>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-recipe")}
          className="new-category-button">
          Add New Item
        </button>
      </div>
      <Table className="categories-table" striped="columns">
        <thead>
          <tr className="text-center head">
            <th className=" rounded-start-3 ">Item Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Tag</th>
            <th className=" rounded-end-3 ">Cateogry</th>
          </tr>
        </thead>
        <tbody>
          {isloading ? (
            <div className="loader"></div>
          ) : (
            recipesList.map((recipe, index) => (
              <tr key={index} className="text-center">
                <td>{recipe.name}</td>
                <td>
                  <img
                    className="recipe-photo"
                    src={`${baseImageUrl}/${recipe.imagePath}`}
                  />
                </td>
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag.name}</td>
                <td className="d-flex align-items-center ">
                  <span className="">
                    {recipe.category.length > 0
                      ? recipe.category.map(
                          (cate, index) =>
                            cate.name +
                            (index === 0 && recipe.category.length > 1
                              ? " , "
                              : "")
                        )
                      : "Unknown"}
                  </span>{" "}
                  <Dropdown onClick={() => setSelectedCategory(recipe.id)}>
                    <Dropdown.Toggle
                      variant="none"
                      className="border-0"
                      id="dropdown-basic">
                      <BsThreeDots className="dots" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="d-flex align-items-center">
                        <FaEye className="icon" /> View
                      </Dropdown.Item>
                      <Dropdown.Item className="d-flex align-items-center">
                        <FaEdit className="icon" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleShow}
                        className="d-flex align-items-center">
                        <MdDeleteOutline className="icon" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <ConfirmModal
        handleClose={handleClose}
        selecetedCategory={selecetedCategory}
        deleteSelectedValue={deleteSelectedValue}
        show={show}
        item={"Recipe"}
      />
    </div>
  );
}
