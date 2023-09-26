import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../css/admin/Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageClick = (pageNumber) => {
    paginate(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate((prevPage) => prevPage + 1);
    }
  };

  let pageNumbers = [];

  if (currentPage <= 3) {
    if (totalPages <= 5) {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pageNumbers = [1, 2, 3, "...", totalPages];
    }
  } else if (currentPage >= totalPages - 2) {
    pageNumbers = [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageNumbers = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return (
    <div className="pagination-container">
      <div
        className={`pagination_btn ${currentPage > 1 && "active-caret"}`}
        onClick={handlePreviousPage}
      >
        <FaChevronLeft className="icon-pag" />
      </div>
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={`pagination__button ${
            pageNumber === currentPage ? "active" : ""
          } ${pageNumber === "..." ? "pagination__ellipsis" : ""}`}
          onClick={() => {
            if (typeof pageNumber === "number") {
              handlePageClick(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
      <div
        className={`pagination_btn ${
          currentPage < totalPages && "active-caret"
        }`}
        onClick={handleNextPage}
      >
        <FaChevronRight className="icon-pag" />
      </div>
    </div>
  );
};

export default Pagination;
