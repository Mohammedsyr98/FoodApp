import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { categoriesUrls } from "../constants/EndPoints";
import { paginationContext } from "./Pagination";

export const getAllCategoriesContext = createContext();
export const GetAllCategoriesProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [pagesize, setPageSize] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [allCategoriesForFilter, setAllCategoriesForFilter] = useState([]);
  const [filtrationSearch, setFiltrationSearch] = useState({
    name: "",
  });
  const {
    pageNumbers,
    currentPage,
    setPageNumbers,
    handlePageChange,
    renderPaginationItems,
  } = useContext(paginationContext);

  const getCategoryList = async (pageSize = 4, pageNumber = 1) => {
    try {
      let response = await axios.get(categoriesUrls.getCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...filtrationSearch,
          pageSize,
          pageNumber,
        },
      });
      const pages = Array.from(
        { length: response.data.totalNumberOfPages },
        (_, i) => i + 1
      );
      setPageNumbers(pages);
      setAllCategories(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAllCategoriesForFilter = async () => {
    try {
      let response = await axios.get(categoriesUrls.getCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          pageSize: 99,
          pageNumber: 1,
        },
      });
      console.log(response.data.data);
      setAllCategoriesForFilter(response.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCategoryList();
  }, [filtrationSearch]);
  console.log(pageNumbers);
  return (
    <getAllCategoriesContext.Provider
      value={{
        setPageSize,
        pagesize,
        allCategories,
        isLoading,
        allCategoriesForFilter,
        getAllCategoriesForFilter,
        getCategoryList,
        setIsLoading,
        setFiltrationSearch,
      }}>
      {children}
    </getAllCategoriesContext.Provider>
  );
};
