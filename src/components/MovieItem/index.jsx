import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const MovieItem = ({ item }) => {
  console.log(item);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;
  const { poster_path, title, id } = item;
  return (
    <div
      className={`rounded shadow-lg ${
        isLight ? "bg-white" : "bg-blueGray-800"
      }`}
    >
      <img className="rounded" src={IMGPATH + poster_path} alt="" />
      <div className="p-5">
        <h1 className="text-lg">{title}</h1>
        <NavLink to={`/${id}/detail`}>
          <button className="mt-3 hover:bg-indigo-500 px-6 py-2 rounded bg-indigo-600 text-white cursor-pointer">
            Detail
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default MovieItem;
