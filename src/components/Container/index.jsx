import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";

const Container = ({ children }) => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;
  return (
    <div
      className={`min-h-screen transition-all min-w-screen ${
        isLight
          ? "bg-blueGray-200 text-blueGray-800"
          : "bg-blueGray-900 text-blueGray-100"
      }`}
    >
      <Header />
      <div className="px-3 md:px-14 pt-36 pb-10">{children}</div>
    </div>
  );
};

export default Container;
