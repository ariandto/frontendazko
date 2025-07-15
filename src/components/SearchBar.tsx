import React from 'react';
interface Props {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
}
const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch }) => {
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          placeholder="Masukkan Nomor Order atau Nomor receive..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button id="search-button" onClick={onSearch}>
          <i className="fas fa-search"></i> Cari
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
