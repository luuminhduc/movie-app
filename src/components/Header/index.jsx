import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { switchTheme } from "../../redux/action/themeAction/actions";

const Header = () => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;
  const dispatch = useDispatch();

  return (
    <div
      className={`py-8 shadow-lg md:px-14 px-5 fixed top-0 left-0 w-screen ${
        isLight ? "bg-white" : "bg-blueGray-800"
      } flex flex-row justify-between items-center`}
    >
      <h1 className="text-xl">
        <NavLink to="/">Movie app</NavLink>
      </h1>
      <div
        onClick={() => dispatch(switchTheme(!isLight))}
        className="cursor-pointer flex flex-row justify-start items-center"
      >
        {isLight ? (
          <React.Fragment>
            <span className="mr-1">Dark theme</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className="mr-1">Light theme</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
