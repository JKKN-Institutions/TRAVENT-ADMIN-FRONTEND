import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbersToShow = 2;
  let startPage, endPage;

  if (totalPages <= maxPageNumbersToShow) {
    // Show all pages if total pages are less than or equal to maxPageNumbersToShow
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbersToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbersToShow / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // Current page near the start
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // Current page near the end
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      // Current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="pagination-button">
            1
          </button>
          {startPage > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`pagination-button ${
            currentPage === number ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="pagination-button"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
