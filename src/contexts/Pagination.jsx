import { createContext, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

export const paginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page, fetchData) => {
    setCurrentPage(page);
    fetchData(4, page);
  };

  const renderPaginationItems = (fetchData) => {
    pageNumbers;
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
          onClick={() => handlePageChange(i, fetchData)}>
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <paginationContext.Provider
      value={{
        pageNumbers,
        currentPage,
        setPageNumbers,
        handlePageChange,
        renderPaginationItems,
        setCurrentPage,
      }}>
      {children}
    </paginationContext.Provider>
  );
};
