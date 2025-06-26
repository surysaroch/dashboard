import React from "react"
import { useEffect, useRef } from "react";

interface paginationType {
  onChange: (currentPage: number) => void;
  processDataLength: number;
  maxPageSize: number;
  currentPage: number;
}

// Pagination component: handles page navigation and direct page input
const Pagination: React.FC<paginationType> = ({ onChange, currentPage, processDataLength, maxPageSize }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the input field in sync with the current page
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = currentPage.toString();
  }, [currentPage]);

  // Go to the next page
  const handleNextPage = () => {
    onChange(currentPage + 1);
  };

  // Go to the previous page
  const handlePreviousPage = () => {
    onChange(currentPage - 1);
  };

  // Validate and apply page change from input field
  const applyPageChange = () => {
    const maxPage: number = Math.ceil(processDataLength / maxPageSize);
    const inputPage: number = Number((inputRef.current) && inputRef.current.value);

    //Conditions to make sure user is always between minimum(e.g. 1) and maximum page (e.g. 20)
    if (!inputPage) {
      if (inputRef.current) inputRef.current.value = "1";
      onChange(1);
      return;
    }

    if (inputPage > maxPage) {
      if (inputRef.current) inputRef.current.value = maxPage.toString();
      onChange(maxPage);
    }
    else if (inputPage < 1) {
      if (inputRef.current) inputRef.current.value = "1";
      onChange(1);
    }
    else {
      onChange(inputPage);
    }
  };

  // Handle Enter key in input to trigger page change
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyPageChange();
    }
  };

  // If user clicks away from the page input  trigger page change
  const handleBlur = () => {
    applyPageChange();
  };

  // Render pagination controls: previous/next buttons and page input
  return (
    <>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <input
        type="number"
        defaultValue={currentPage}
        onKeyDown={handleEnterPress}
        onBlur={handleBlur}
        ref={inputRef}
      /><p>/{Math.ceil(processDataLength / maxPageSize)}</p>
      <button onClick={handleNextPage} disabled={currentPage === Math.ceil(processDataLength / maxPageSize)}>Next</button>
    </>

  );

};

export default React.memo(Pagination)