// import React from "react";
// import { Search } from "lucide-react";

// const SearchBar = ({
//   searchQuery,
//   setSearchQuery,
//   onSearch,
//   onClear,
//   isSearching,
//   searchField,
//   setSearchField,
// }) => {
//   return (
//     <div className="w-full md:w-1/2 flex items-center bg-white rounded-lg shadow-md px-4 py-2 space-x-2">
//       <input
//         type="text"
//         placeholder="Cari"
//         className="w-full outline-none"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") onSearch();
//         }}
//       />

//       <select
//         value={searchField}
//         onChange={(e) => setSearchField(e.target.value)}
//         className="px-2 py-1 rounded-md text-sm border border-gray-300 shadow-sm"
//       >
//         <option value="title">Judul</option>
//         <option value="author">Penulis</option>
//         <option value="publisher">Penerbit</option>
//       </select>

//       <button onClick={onSearch}>
//         <Search className="text-gray-600 hover:text-black" />
//       </button>

//       {isSearching && (
//         <button
//           onClick={onClear}
//           className="ml-2 text-sm text-red-600 underline"
//         >
//           Reset
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import { Search, X } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      {/* Search Container */}
      <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari buku favorit Anda..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-sm sm:text-base font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
            />
            
            {/* Clear button for input */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors sm:hidden"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Mobile: Search controls row */}
          <div className="flex border-t sm:border-t-0 sm:border-l border-gray-200">
            {/* Search Field Selector */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="appearance-none bg-gray-50 hover:bg-gray-100 w-full sm:w-auto px-3 sm:px-4 py-3 sm:py-4 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-gray-700 outline-none cursor-pointer transition-colors border-r border-gray-200 sm:border-r-0"
              >
                <option value="title">📖 Judul</option>
                <option value="author">✍️ Penulis</option>
                <option value="publisher">🏢 Penerbit</option>
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={onSearch}
              disabled={!searchQuery.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 sm:py-4 transition-all duration-200 hover:shadow-md active:scale-95 flex-shrink-0"
            >
              <Search size={16} className="sm:hidden" />
              <Search size={20} className="hidden sm:block" />
            </button>

            {/* Clear button for desktop */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="hidden sm:block text-gray-400 hover:text-gray-600 transition-colors px-3 border-l border-gray-200"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Search Indicator & Reset */}
      {isSearching && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 gap-3 sm:gap-0">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-blue-700 font-medium">
              Menampilkan hasil pencarian untuk "{searchQuery}"
            </span>
          </div>
          <button
            onClick={onClear}
            className="flex items-center justify-center space-x-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors self-start sm:self-center"
          >
            <X size={14} />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;