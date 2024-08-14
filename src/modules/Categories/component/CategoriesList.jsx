import React, { useContext, useEffect, useState } from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import { categoriesUrls } from "../../../constants/EndPoints";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineFindInPage } from "react-icons/md";
import ConfirmModal from "../../Shared/components/ConfirmModal/ConfirmModal";
import AddModal from "../../Shared/components/AddModal/AddModal";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllCategoriesContext } from "../../../contexts/getAllCategories";
import { paginationContext } from "../../../contexts/Pagination";
import { Pagination } from "react-bootstrap";
import NoData from "../../Shared/components/NoData/NoData";
export default function CategoriesList() {
  const notify = (message) => toast(message);
  // const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selecetedCategory, setSelectedCategory] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
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
  console.log(allCategories);
  const deleteSelectedValue = async (id) => {
    console.log(id);
    setIsLoading(true);
    try {
      let response = await axios.delete(categoriesUrls.delete(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getCategoryList();

      toast.success("Item deleted successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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

  return (
    <div>
      {" "}
      <Header
        tite={"Categories Item"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        photo={headerPhoto2}
      />
      <div className="head d-flex justify-content-between">
        {" "}
        <div className="d-flex flex-column">
          <span>Categories Table Details</span>
          <span>You can check all details</span>
        </div>
        <button onClick={handleShowAddModal} className="new-category-button">
          Add New Category
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
            placeholder="Category Name"
            onChange={(e) => {
              setFiltrationSearch({
                name: e.target.value,
              });
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loader-table loader"></div>
      ) : allCategories.length === 0 ? (
        <NoData />
      ) : (
        <>
          <Table className="categories-table mt-3" striped="columns">
            <thead>
              <tr className="text-center head">
                <th className=" rounded-start-3 ">Id</th>
                <th>Name</th>
                <th>Creation Date</th>
                <th className=" rounded-end-3 ">Modification Date</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((cat) => (
                <tr key={cat.id} className="text-center">
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{convertISOToReadableDate(cat.creationDate)}</td>
                  <td className="d-flex align-items-center">
                    <span className="">
                      {convertISOToReadableDate(cat.modificationDate)}
                    </span>{" "}
                    <Dropdown onClick={() => setSelectedCategory(cat.id)}>
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
              onClick={() => handlePageChange(1, getCategoryList)}
            />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(Math.max(currentPage - 1, 1), getCategoryList)
              }
            />
            {renderPaginationItems(getCategoryList)}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  Math.min(currentPage + 1, pageNumbers.length),
                  getCategoryList
                )
              }
            />
            <Pagination.Last
              onClick={() =>
                handlePageChange(pageNumbers.length, getCategoryList)
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
        item={"Category"}
      />
      <AddModal
        handleCloseAddModal={handleCloseAddModal}
        showAddModal={showAddModal}
        getCategoryList={getCategoryList}
      />
    </div>
  );
}
