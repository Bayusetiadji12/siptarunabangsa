import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
  isSearching,
  searchField,
  setSearchField,
}) => {
  return (
    <div className="w-full md:w-1/2 flex items-center bg-white rounded-lg shadow-md px-4 py-2 space-x-2">
      <input
        type="text"
        placeholder="Cari"
        className="w-full outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />

      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        className="px-2 py-1 rounded-md text-sm border border-gray-300 shadow-sm"
      >
        <option value="title">Judul</option>
        <option value="author">Penulis</option>
        <option value="publisher">Penerbit</option>
      </select>

      <button onClick={onSearch}>
        <Search className="text-gray-600 hover:text-black" />
      </button>

      {isSearching && (
        <button
          onClick={onClear}
          className="ml-2 text-sm text-red-600 underline"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default SearchBar;
