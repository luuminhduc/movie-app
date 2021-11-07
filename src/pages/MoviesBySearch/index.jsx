import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import MovieList from "../../components/MovieList";
import SearchMovie from "../../components/SearchMovie";
import { searchMovie } from "../../redux/action/movieAction/actions";

const MovieBySearch = () => {
  const queryMethod = new URLSearchParams(useLocation().search);
  const queryName = queryMethod.get("q");
  const queryPage = queryMethod.get("p");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchMovie(queryName, queryPage));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [queryName, queryPage, dispatch]);
  return (
    <div>
      <div className="mb-10">
        <SearchMovie />
      </div>
      <h1 className="mb-5">Results for "{queryName}"</h1>
      <MovieList />
    </div>
  );
};

export default MovieBySearch;
