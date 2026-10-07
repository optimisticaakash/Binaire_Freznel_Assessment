import React from 'react'

const Pagination = ({
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
}) => {
  return (
    <div className="mt-19 flex items-center justify-center gap-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-sm bg-[#2a475e] px-5 py-2 text-sm transition hover:bg-[#3a5f7d] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {"\u2190"} Prev
      </button>

      <span className="min-w-28 text-center text-sm text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-sm bg-[#2a475e] px-5 py-2 text-sm transition hover:bg-[#3a5f7d] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next {"\u2192"}
      </button>
    </div>
  );
}

export default Pagination