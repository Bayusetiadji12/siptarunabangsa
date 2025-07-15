// import React from "react";

// const SearchBar = ({ searchTerm, onSearch }) => {
//   return (
//     <div className="mb-4 flex items-center">
//       <input
//         type="text"
//         placeholder="Cari..."
//         value={searchTerm}
//         onChange={(e) => onSearch(e.target.value)}
//         className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm"
//       />
//       <button
//         onClick={() => onSearch(searchTerm)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
//       >
//         Cari
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Cari..." }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
