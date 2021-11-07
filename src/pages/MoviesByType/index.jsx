import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import MovieItem from "../../components/MovieItem";
import axios from "axios";
import DisplayPagination from "../../components/DisplayPagination";

const MoviesByType = () => {
  const queryMethod = new URLSearchParams(useLocation().search);
  const queryPage = queryMethod.get("p");
  const params = useParams();
  const { type } = params;
  const [arr, setArr] = useState([]);
  useEffect(() => {
    fetchMovies();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, [type, queryPage]);
  const fetchMovies = async () => {
    const res = await axios({
      url: `https://api.themoviedb.org/3/movie/${type}?api_key=3da21d2780465f7079ade604a6669044&language=en-US&page=${queryPage}`,
      method: "GET",
    });
    await setArr(res.data);
  };
  const renderComponent = () => {
    const { total_pages } = arr;
    return (
      <div>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {arr.results?.map((item, idx) => (
            <MovieItem key={idx} item={item} />
          ))}
        </div>
        <DisplayPagination numOfPag={total_pages} />
      </div>
    );
  };
  return arr ? renderComponent() : "";
};

export default MoviesByType;
