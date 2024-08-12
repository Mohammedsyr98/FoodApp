import React, { useEffect, useState } from "react";
import Header from "../../Shared/components/Header/Header";
import headerPhoto2 from "../../../assets/headerPhoto-2.png";
import Table from "react-bootstrap/Table";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import Pagination from "react-bootstrap/Pagination";
import {
  baseImageUrl,
  baseUsersUrl,
  categoriesUrls,
  UsersUrls,
  usersUrls,
} from "../../../constants/EndPoints";
import { FaRegUser } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../../Shared/components/ConfirmModal/ConfirmModal";
import AddModal from "../../Shared/components/AddModal/AddModal";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../../Shared/components/NoData/NoData";
export default function UsersList() {
  const notify = (message) => toast(message);
  const [usersList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [selecetedUser, setSelectedUser] = useState(null);
  const [isloading, SetIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filtrationSearch, setFiltrationSearch] = useState({
    userName: "",
    email: "",
    country: "",
  });
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getUsersList = async (pageSize = 4, pageNumber = 1) => {
    try {
      let response = await axios.get(UsersUrls.getUsers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...filtrationSearch,
          pageSize,
          pageNumber,
        },
      });
      console.log(response.data.totalNumberOfPages);
      const pages = Array.from(
        { length: response.data.totalNumberOfPages },
        (_, i) => i + 1
      );
      setPageNumbers(pages);
      setUserList(response.data.data);
      console.log(pages);
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getUsersList(4, page);
  };
  const renderPaginationItems = () => {
    const totalPages = pageNumbers.length;
    const visiblePages = 5;

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  };

  const deleteSelectedValue = async (id) => {
    console.log(id);
    SetIsLoading(true);
    try {
      let response = await axios.delete(UsersUrls.delete(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getUsersList();

      toast.success("Item deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    getUsersList();
  }, [filtrationSearch]);

  return (
    <div className="users-list">
      {" "}
      <Header
        tite={"Users List"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        photo={headerPhoto2}
      />
      <div className="search row mt-5">
        <div className="input-group mb-1 col-12 col-md-4">
          <span className="input-group-text">
            <FaRegUser />
          </span>

          <input
            type="text"
            className="form-control py-2"
            placeholder="User Name"
            onChange={(e) => {
              setFiltrationSearch({
                ...filtrationSearch,
                userName: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-group mb-1 col-12 col-md-4">
          <span className="input-group-text">
            <MdOutlineMailOutline />
          </span>

          <input
            type="text"
            className="form-control py-2"
            placeholder="Email"
            onChange={(e) => {
              setFiltrationSearch({
                ...filtrationSearch,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-group mb-1 col-12 col-md-4">
          <span className="input-group-text">
            <TfiWorld />
          </span>

          <input
            type="text"
            className="form-control py-2"
            placeholder="Country"
            onChange={(e) => {
              setFiltrationSearch({
                ...filtrationSearch,
                country: e.target.value,
              });
            }}
          />
        </div>
      </div>
      {isloading ? (
        <div className="loader"></div>
      ) : usersList.length === 0 ? (
        <NoData />
      ) : (
        <>
          <Table className="categories-table mt-3" striped="columns">
            <thead>
              <tr className="text-center head">
                <th className=" rounded-start-3 ">Id</th>
                <th>Name</th>
                <th>image</th>
                <th>Country</th>
                <th>Email</th>

                <th className=" rounded-end-3 ">Phone number</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id} className="text-center">
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>
                    {" "}
                    {user.imagePath ? (
                      <img
                        className="recipe-photo"
                        src={`${baseImageUrl}/${user.imagePath}`}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{user.country}</td>
                  <td>{user.email}</td>
                  <td className="d-flex align-items-center">
                    <span className="">{user.phoneNumber}</span>{" "}
                    <Dropdown onClick={() => setSelectedUser(user.id)}>
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
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, pageNumbers.length))
              }
            />
            <Pagination.Last
              onClick={() => handlePageChange(pageNumbers.length)}
            />
          </Pagination>
        </>
      )}
      <ConfirmModal
        handleClose={handleClose}
        selecetedCategory={selecetedUser}
        deleteSelectedValue={deleteSelectedValue}
        show={show}
        item={"User"}
      />
    </div>
  );
}
