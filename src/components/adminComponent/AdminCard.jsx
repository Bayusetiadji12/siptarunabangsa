import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, count, color = "blue", to = "#", icon: Icon }) => {
  const colorMap = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-100",
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-100",
    },
    yellow: {
      text: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    red: {
      text: "text-red-600",
      bg: "bg-red-100",
    },
  };

  const colorClass = colorMap[color] || colorMap.blue;

  return (
    <Link to={to} className="block">
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:bg-gray-50 transition duration-200 cursor-pointer h-full flex items-center gap-4">
        <div className={`p-3 rounded-full ${colorClass.bg}`}>
          {Icon && <Icon className={`w-8 h-8 ${colorClass.text}`} />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
          <p className={`text-3xl font-bold ${colorClass.text}`}>{count}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
