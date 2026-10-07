import React from 'react'

const AgeCheckActions = ({ handleViewPage, handleCancel }) => {
  return (
    <div className="mt-12 flex justify-center gap-3">
      <button
        onClick={handleViewPage}
        className="bg-gradient-to-b from-[#67c1f5] to-[#3b7da8] px-5 py-2 text-lg hover:brightness-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        View Page
      </button>

      <button
        onClick={handleCancel}
        className="bg-[#2a475e] px-5 py-2 text-lg text-[#66c0f4] hover:bg-[#3a5f7d] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Cancel
      </button>
    </div>
  );
};

export default AgeCheckActions