import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";

const DisplayPagination = ({ numOfPag }) => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;

  const params = useParams();
  const { type } = params;

  const queryMethod = new URLSearchParams(useLocation().search);
  const queryPage = queryMethod.get("p");

  const renderPag = () => {
    const arr = [];
    for (let i = 1; i <= numOfPag; i++) {
      arr.push(i);
    }
    return (
      <div className="flex flex-wrap justify-center items-center mt-10">
        {arr.map((e) => (
          <NavLink
            to={`/${type}?p=${e}`}
            className={`cursor-pointer my-2 ${
              +queryPage === +e
                ? "bg-indigo-500 text-white"
                : isLight
                ? "bg-white"
                : "bg-blueGray-800"
            } rounded-full w-7 text-xs h-7 flex shadow font-bold justify-center items-center mx-2 
                  
                `}
            key={e}
          >
            {e}
          </NavLink>
        ))}
      </div>
    );
  };

  return numOfPag > 1 ? renderPag() : "";
};

export default DisplayPagination;
