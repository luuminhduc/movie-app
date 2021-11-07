import React from "react";
import { NavLink } from "react-router-dom";
import Display from "../../components/Display";
import SearchMovie from "../../components/SearchMovie";

const Home = () => {
  const displayArr = ["now_playing", "popular", "top_rated", "upcoming"];
  return (
    <div>
      <div className="mt-10 text-center">
        <SearchMovie />
      </div>
      <div className="mt-10">
        {displayArr.map((item, idx) => (
          <div className="mt-20" key={idx}>
            <div className="flex flex-row justify-start items-center">
              <h1 className="text-xl  font-bold uppercase">{item}</h1>
              <NavLink
                className="ml-1 px-3 py-1 rounded bg-blue-500 text-white"
                to={`/${item}?p=1`}
              >
                More
              </NavLink>
            </div>

            <Display type={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
