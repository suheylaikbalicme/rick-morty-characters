import { useEffect, useState, useCallback } from "react";
import { getCharacters } from "./api";
import FilterBar from "./components/FilterBar";
import TableView from "./components/TableView";
import CharacterModal from "./components/CharacterModal";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import PageSizeSelector from "./components/PageSizeSelector";
import useDebounce from "./hooks/useDebounce";
import { handleApiError } from "./utils/errorHandler";
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [pageSize, setPageSize] = useState(20);
  const [modalPosition, setModalPosition] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]); // Store all fetched characters

  const debouncedSearchName = useDebounce(searchName, 500);
  const debouncedStatus = useDebounce(status, 500);
  const debouncedSpecies = useDebounce(species, 500);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCharacters(page, debouncedSearchName, debouncedStatus, debouncedSpecies);
      const totalResults = data.info.count;
      setTotalItems(totalResults);
      
      // Store all characters
      setAllCharacters(data.results);
      
      // Calculate total pages based on the actual number of results we can display
      const calculatedTotalPages = Math.ceil(totalResults / pageSize);
      setTotalPages(calculatedTotalPages);
      
      // Get the current page's worth of characters
      const startIndex = 0;
      const endIndex = Math.min(pageSize, data.results.length);
      setCharacters(data.results.slice(startIndex, endIndex));
      
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
      setCharacters([]);
      setAllCharacters([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchName, debouncedStatus, debouncedSpecies, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchName, debouncedStatus, debouncedSpecies, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effect to handle page size changes
  useEffect(() => {
    if (allCharacters.length > 0) {
      const startIndex = 0;
      const endIndex = Math.min(pageSize, allCharacters.length);
      setCharacters(allCharacters.slice(startIndex, endIndex));
    }
  }, [pageSize, allCharacters]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
    
    // Update displayed characters based on new page size
    if (allCharacters.length > 0) {
      const startIndex = 0;
      const endIndex = Math.min(newSize, allCharacters.length);
      setCharacters(allCharacters.slice(startIndex, endIndex));
    }
  };

  const getSortedCharacters = () => {
    if (sortOption === "default") return characters;
    const sorted = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    return sortOption === "asc" ? sorted : sorted.reverse();
  };

  const sortedCharacters = getSortedCharacters();

  const handleCharacterSelect = (character, position) => {
    setSelectedCharacter(character);
    setModalPosition(position);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setModalPosition(null);
  };

  return (
    <div className="app-wrapper">
      <div className="app">
        <h1 className="app-title">Rick and Morty Karakterleri</h1>
        <div className="filter-section">
          <FilterBar 
            searchName={searchName}
            setSearchName={setSearchName}
            status={status}
            setStatus={setStatus}
            species={species}
            setSpecies={setSpecies}
            handleSearch={handleSearch}
          />

          <div className="sort-bar">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="default">Varsayılan Sıralama</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>

          <PageSizeSelector 
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>

        <div className="content-container">
          <div className="main-content">
            <div className="table-wrapper">
              {loading && <Spinner />}
              {error && <div className="error-alert">Hata: {error}</div>}
              {!loading && characters.length === 0 && <div>Sonuç bulunamadı</div>}

              {!loading && characters.length > 0 && (
                <>
                  <TableView 
                    characters={sortedCharacters} 
                    onSelectCharacter={handleCharacterSelect} 
                  />
                  <Pagination 
                    page={page} 
                    totalPages={totalPages} 
                    handlePrev={handlePrev} 
                    handleNext={handleNext}
                    pageSize={pageSize}
                    totalItems={totalItems}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            position={modalPosition}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
