import { useRef } from "react";

interface paginationType {
  onChange: (currentPage: number) => void;
  processDataLength: number;
  maxPageSize: number;
  currentPage: number;
}
const Pagination: React.FC<paginationType> = ({ onChange, currentPage, processDataLength, maxPageSize }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNextPage = () => {
    onChange(currentPage + 1);
    if (inputRef.current) inputRef.current.value = (currentPage + 1).toString();

  };

  const handlePreviousPage = () => {
    onChange(currentPage - 1);
    if (inputRef.current) inputRef.current.value = (currentPage - 1).toString();
  };


  const applyPageChange = () => {
    const maxPage = Math.ceil(processDataLength / maxPageSize);
    const inputPage = (inputRef.current) && inputRef.current.value

    if ((inputPage) && Number(inputPage) > maxPage) {
      onChange(maxPage);
      if (inputRef.current) inputRef.current.value = maxPage.toString();
    }
    else if ((inputPage) && Number(inputPage) < 1) {
      onChange(1);
      if (inputRef.current) inputRef.current.value = "1";
    }
    else {
      console.log(inputPage)
      onChange(Number(inputPage));
      console.log("This is current page" + currentPage)

    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyPageChange();
    }
  }
  const handleBlur = () => {
    applyPageChange();
  }

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

  )

}

export default Pagination