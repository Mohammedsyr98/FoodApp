import React, { useEffect, useState } from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import { categoriesUrls } from "../../../constants/EndPoints";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../../Shared/components/ConfirmModal/ConfirmModal";
import AddModal from "../../Shared/components/AddModal/AddModal";
import axios from "axios";
import { toast } from "react-toastify";
export default function CategoriesList() {
  const notify = (message) => toast(message);
  const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selecetedCategory, setSelectedCategory] = useState(null);
  const [isloading, SetIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const getCategoryList = async (data) => {
    try {
      let response = await axios.get(categoriesUrls.getCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCategoryList(response.data.data);
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSelectedValue = async (id) => {
    console.log(id);
    SetIsLoading(true);
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
      SetIsLoading(false);
    }
  };
  console.log(categoryList);
  useEffect(() => {
    getCategoryList();
  }, []);

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
      <Table className="categories-table" striped="columns">
        <thead>
          <tr className="text-center head">
            <th className=" rounded-start-3 ">Id</th>
            <th>Name</th>
            <th>Creation Date</th>
            <th className=" rounded-end-3 ">Modification Date</th>
          </tr>
        </thead>
        <tbody>
          {isloading ? (
            <div className="loader"></div>
          ) : (
            categoryList.map((cat) => (
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
            ))
          )}
        </tbody>
      </Table>
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
