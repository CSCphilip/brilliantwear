"use client";

import { useState, useEffect } from "react";

export default function ProductTypesFilter({
  typeFilter,
  setTypeFilter,
}: {
  typeFilter: string;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/types").then((res) => {
      res.json().then((data) => {
        setTypes(data);
      });
    });
  }, []);

  function handleClick(type: string) {
    if (type === typeFilter) {
      setTypeFilter("All");
    } else {
      setTypeFilter(type);
    }
  }

  return (
    <div className="overflow-x-scroll lg:px-1 mb-2">
      <ul className="flex">
        {types.map((type, index) => {
          return (
            <li
              key={index}
              className={`${index !== types.length - 1 && "me-2"}`}
            >
              <button
                className={`border border-black py-1 px-1.5 rounded-sm hover:bg-gray-200 ${
                  type === typeFilter && "bg-gray-200"
                }`}
                onClick={() => handleClick(type)}
              >
                {type}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
