import React, { useState } from "react";

function Pagination({ page, totalPages, handlePrev, handleNext, pageSize, totalItems }) {
  const [inputPage, setInputPage] = useState(page);

  const handlePageInput = (e) => {
    const value = e.target.value;
    if (value === '') {
      setInputPage('');
      return;
    }
    
    const pageNum = parseInt(value, 10);
    if (!isNaN(pageNum) && pageNum >= 0) {
      setInputPage(pageNum);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let targetPage = parseInt(inputPage, 10);
      
      if (isNaN(targetPage) || targetPage < 1) {
        targetPage = 1;
      } else if (targetPage > totalPages) {
        targetPage = totalPages;
      }
      
      setInputPage(targetPage);
      if (targetPage < page) {
        while (page > targetPage) handlePrev();
      } else if (targetPage > page) {
        while (page < targetPage) handleNext();
      }
    }
  };

  const handleBlur = () => {
    setInputPage(page);
  };

  // Calculate the range of results being shown
  const startResult = (page - 1) * pageSize + 1;
  const endResult = Math.min(page * pageSize, totalItems);

  return (
    <div className="pagination">
      <button 
        onClick={handlePrev} 
        disabled={page === 1}
        className="pagination-button"
      >
        ◀ Önceki
      </button>
      
      <div className="pagination-info">
        <span>Sayfa: </span>
        <input
          type="text"
          value={inputPage}
          onChange={handlePageInput}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          className="page-input"
          aria-label="Sayfa numarası"
        />
        <span> / {totalPages}</span>
        <span className="results-info">
          ({startResult}-{endResult} / {totalItems} sonuç)
        </span>
      </div>

      <button 
        onClick={handleNext} 
        disabled={page === totalPages}
        className="pagination-button"
      >
        Sonraki ▶
      </button>
    </div>
  );
}

export default Pagination;
