import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Pagination = ({ numberOfPag }) => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;

  const queryMethod = new URLSearchParams(useLocation().search);
  const queryName = queryMethod.get("q");
  const queryPage = queryMethod.get("p");

  const renderPag = () => {
    const arr = [];
    for (let i = 1; i <= numberOfPag; i++) {
      arr.push(i);
    }
    return (
      <div className="flex flex-wrap justify-center items-center mt-10">
        {arr.map((e) => (
          <NavLink
            to={`/search?q=${queryName}&&p=${e}`}
            className={`cursor-pointer ${
              +queryPage === +e
                ? "bg-indigo-500 text-white"
                : isLight
                ? "bg-white"
                : "bg-blueGray-800"
            } rounded-full w-6 text-sm h-6 flex shadow font-bold justify-center items-center mx-2 
              
            `}
            key={e}
          >
            {e}
          </NavLink>
        ))}
      </div>
    );
  };
  return numberOfPag > 1 && renderPag();
};

export default Pagination;
