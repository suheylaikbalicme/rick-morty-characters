import React from "react";

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
