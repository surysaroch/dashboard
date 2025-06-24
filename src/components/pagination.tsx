import { useEffect, useRef } from "react";

interface paginationType {
  onChange: (currentPage: number) => void;
  processDataLength: number;
  maxPageSize: number;
  currentPage: number;
}


const Pagination: React.FC<paginationType> = ({ onChange, currentPage, processDataLength, maxPageSize }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = currentPage.toString();
  }, [currentPage]);

  const handleNextPage = () => {
    onChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    onChange(currentPage - 1);
  };


  const applyPageChange = () => {
    const maxPage: number = Math.ceil(processDataLength / maxPageSize);
    const inputPage: number = Number((inputRef.current) && inputRef.current.value);

    if (!inputPage) {
      if (inputRef.current) inputRef.current.value = "1";
      onChange(1);
      return;
    }


    if (inputPage > maxPage) {
      if (inputRef.current) inputRef.current.value = maxPage.toString();
      onChange(maxPage);
    } else if (inputPage < 1) {
      if (inputRef.current) inputRef.current.value = "1";
      onChange(1);
    } else {
      onChange(inputPage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyPageChange();
    };
  };

  const handleBlur = () => {
    applyPageChange();
  };

  return (
    <>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <input
        type="number"
        defaultValue={currentPage}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      />
      <button onClick={handleNextPage} disabled={currentPage === Math.ceil(processDataLength / maxPageSize)}>Next</button>
    </>

  );

};

export default Pagination