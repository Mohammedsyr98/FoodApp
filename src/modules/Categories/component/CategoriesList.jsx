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
import AddModal from "./AddCategoryModal/AddCategoryModal";
import ViewCategoryMadal from "../component/ViewCategoryModal/ViewCategoryModal";
import EditCategoryModal from "../component/EditCategoryModal/EditCategoryModal";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllCategoriesContext } from "../../../contexts/getAllCategories";
import { paginationContext } from "../../../contexts/Pagination";
import { Pagination } from "react-bootstrap";
import NoData from "../../Shared/components/NoData/NoData";
import { useSearchParams } from "react-router-dom";
export default function CategoriesList() {
  const notify = (message) => toast(message);
  // const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selecetedCategory, setSelectedCategory] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowViewModal = () => setShowViewModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const {
    pageNumbers,
    currentPage,
    setPageNumbers,
    handlePageChange,
    renderPaginationItems,
    setCurrentPage,
  } = useContext(paginationContext);
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const {
    allCategories,
    isLoading,
    getCategoryList,
    setIsLoading,
    setFiltrationSearch,
    filtrationSearch,
  } = useContext(getAllCategoriesContext);
  const pages = renderPaginationItems(getCategoryList);
  const totalPages = pageNumbers.length;
  const deleteSelectedValue = async (id) => {
    id;
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
      error;
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterType, value) => {
    setFiltrationSearch({
      ...filtrationSearch,
      [filterType]: value,
    });

    searchParams.set(filterType, value);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    getCategoryList();
  }, [searchParams]);
  useEffect(() => {
    setFiltrationSearch({
      ...filtrationSearch,
      name: searchParams?.get("name"),
    });

    getCategoryList();
  }, []);

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
            value={searchParams.get("name")}
            onChange={(e) => {
              handleFilterChange("name", e.target.value);
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
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="none"
                        className="border-0"
                        id="dropdown-basic">
                        <BsThreeDots className="dots" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={() => {
                            setSelectedCategory(cat);

                            handleShowViewModal();
                          }}>
                          <FaEye className="icon" /> View
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={() => {
                            setSelectedCategory(cat);
                            handleShowEditModal();
                          }}>
                          <FaEdit className="icon" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleShow();
                            setSelectedCategory(cat);
                          }}
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
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(Math.max(currentPage - 1, 1), getCategoryList)
              }
              disabled={currentPage === 1}
            />
            {pages}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  Math.min(currentPage + 1, pageNumbers.length),
                  getCategoryList
                )
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() =>
                handlePageChange(pageNumbers.length, getCategoryList)
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
      <ConfirmModal
        handleClose={handleClose}
        selecetedCategory={selecetedCategory?.id}
        deleteSelectedValue={deleteSelectedValue}
        show={show}
        item={"Category"}
      />
      <AddModal
        handleCloseAddModal={handleCloseAddModal}
        showAddModal={showAddModal}
        getCategoryList={getCategoryList}
      />
      {showViewModal && (
        <ViewCategoryMadal
          selecetedCategory={selecetedCategory}
          showViewModal={showViewModal}
          handleCloseViewModal={handleCloseViewModal}
          convertISOToReadableDate={convertISOToReadableDate}
        />
      )}
      {showEditModal && (
        <EditCategoryModal
          selecetedCategory={selecetedCategory}
          showEditModal={showEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}
    </div>
  );
}
