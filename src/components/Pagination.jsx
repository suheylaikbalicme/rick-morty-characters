import React from "react";

function Pagination({ page, totalPages, handlePrev, handleNext }) {
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <button onClick={handlePrev} disabled={page === 1}>◀ Önceki</button>
      <span style={{ margin: "0 15px", fontWeight: "bold", fontSize: "1.1rem" }}>
        Sayfa: {page} / {totalPages}
      </span>
      <button onClick={handleNext} disabled={page === totalPages}>Sonraki ▶</button>
    </div>
  );
}

export default Pagination;
