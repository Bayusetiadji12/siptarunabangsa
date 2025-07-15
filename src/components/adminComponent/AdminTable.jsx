import React from "react";

const ReusableTable = ({ columns, data, renderActions }) => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap">No</th>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 text-center whitespace-nowrap">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={`border-b hover:bg-orange-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-2 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis"
                >
                  {col.render
                    ? col.render(item[col.key], item)
                    : item[col.key] || "-"}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
