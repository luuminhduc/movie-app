import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "../MovieItem";
import Pagination from "../Pagination";
const MovieList = () => {
  const movieReducer = useSelector((state) => state.movieReducer);
  const { dataInfo } = movieReducer;
  const renderMovieList = () => {
    const { results, total_pages } = dataInfo;
    return (
      <div>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item, idx) => (
            <MovieItem item={item} key={idx} />
          ))}
        </div>
        {total_pages > 1 && <Pagination numberOfPag={total_pages} />}
      </div>
    );
  };
  return dataInfo ? renderMovieList() : "";
};

export default MovieList;
