import React from 'react';

function PageSizeSelector({ pageSize, onPageSizeChange }) {
  return (
    <div className="page-size-selector">
      <label htmlFor="pageSize">Sayfa başına sonuç: </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="page-size-select"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
  );
}

export default PageSizeSelector; 