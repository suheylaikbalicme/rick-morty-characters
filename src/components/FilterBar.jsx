import React from "react";

function FilterBar({ searchName, setSearchName, status, setStatus, species, setSpecies, handleSearch }) {
  return (
    <div className="filter-bar">
      <input type="text" placeholder="İsim ara..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
      <input type="text" placeholder="Durum (alive, dead, unknown)" value={status} onChange={(e) => setStatus(e.target.value)} />
      <input type="text" placeholder="Tür" value={species} onChange={(e) => setSpecies(e.target.value)} />
      <button onClick={handleSearch}>Filtrele</button>
    </div>
  );
}

export default FilterBar;
