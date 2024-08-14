import React, { useContext, useEffect, useState } from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import { baseImageUrl, resipesUrls } from "../../../constants/EndPoints";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFindInPage } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import ConfirmModal from "../../Shared/components/ConfirmModal/ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllTagsContext } from "../../../contexts/getAllTags";
import { getAllCategoriesContext } from "../../../contexts/getAllCategories";
import { paginationContext } from "../../../contexts/Pagination";
import { Pagination } from "react-bootstrap";
import NoData from "../../Shared/components/NoData/NoData";
export default function RecipesList() {
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [filtrationSearch, setFiltrationSearch] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });
  const [show, setShow] = useState(false);
  const [selecetedCategory, setSelectedCategory] = useState(null);
  const [isloading, SetIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { tags } = useContext(getAllTagsContext);
  const {
    allCategories,
    setPageSize,
    pagesize,
    isLoading,
    getCategoryList,
    allCategoriesForFilter,
    getAllCategoriesForFilter,
    setIsLoading,
  } = useContext(getAllCategoriesContext);
  const {
    pageNumbers,
    currentPage,
    setPageNumbers,

    handlePageChange,
    renderPaginationItems,
  } = useContext(paginationContext);

  const getRecipesList = async (pageSize = 4, pageNumber = 1) => {
    try {
      console.log(pageSize);

      let response = await axios.get(resipesUrls.getRecipes, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...filtrationSearch,
          pageSize,
          pageNumber,
        },
      });
      console.log(response.data.data);
      const pages = Array.from(
        { length: response.data.totalNumberOfPages },
        (_, i) => i + 1
      );

      setPageNumbers(pages);
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
  }, [filtrationSearch]);
  useEffect(() => {
    getAllCategoriesForFilter();
  }, []);

  console.log(allCategoriesForFilter);
  return (
    <div className="recipes-list">
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
        <div className="search row mt-5">
          <div className="input-group mb-1 col-12 col-md-4">
            <span className="input-group-text">
              <MdOutlineFindInPage />
            </span>

            <input
              type="text"
              className="form-control py-2"
              placeholder="Recipe Name"
              onChange={(e) => {
                setFiltrationSearch({
                  ...filtrationSearch,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="input-group mb-1 col-12 col-md-4">
            <span className="input-group-text">
              <IoMdList />
            </span>

            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={(e) =>
                setFiltrationSearch({
                  ...filtrationSearch,
                  tagId: e.target.value,
                })
              }>
              <option value="" selected>
                All tags
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
          </div>
          <div className="input-group mb-1 col-12 col-md-4">
            <span className="input-group-text">
              <IoMdList />
            </span>

            <select
              className="form-select  form-control "
              aria-label="Default select example"
              onChange={(e) =>
                setFiltrationSearch({
                  ...filtrationSearch,
                  categoryId: e.target.value,
                })
              }>
              <option value="" selected>
                All Categories
              </option>
              {allCategoriesForFilter.length > 0 ? (
                allCategoriesForFilter.map((cat, i) => (
                  <option key={i} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>...Loading</option>
              )}
            </select>
          </div>
        </div>
        {isloading ? (
          <div className="loader-table loader"></div>
        ) : recipesList.length === 0 ? (
          <NoData />
        ) : (
          <>
            <Table className="categories-table mt-3" striped="columns">
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
                {recipesList.map((recipe, index) => (
                  <tr key={index} className="text-center">
                    <td>{recipe.name}</td>
                    <td>
                      {recipe.imagePath ? (
                        <img
                          className="recipe-photo"
                          src={`${baseImageUrl}/${recipe.imagePath}`}
                        />
                      ) : (
                        "No Photo"
                      )}
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
                ))}
              </tbody>
            </Table>

            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1, getRecipesList)}
              />
              <Pagination.Prev
                onClick={() =>
                  handlePageChange(Math.max(currentPage - 1, 1), getRecipesList)
                }
              />
              {renderPaginationItems(getRecipesList)}
              <Pagination.Next
                onClick={() =>
                  handlePageChange(
                    Math.min(currentPage + 1, pageNumbers.length),
                    getRecipesList
                  )
                }
              />
              <Pagination.Last
                onClick={() =>
                  handlePageChange(pageNumbers.length, getRecipesList)
                }
              />
            </Pagination>
          </>
        )}
        <ConfirmModal
          handleClose={handleClose}
          selecetedCategory={selecetedCategory}
          deleteSelectedValue={deleteSelectedValue}
          show={show}
          item={"Recipe"}
        />
      </div>
    </div>
  );
}
