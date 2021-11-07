import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "../MovieItem";

const Display = ({ type }) => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [type]);
  const fetchMovies = async () => {
    const res = await axios({
      url: `https://api.themoviedb.org/3/movie/${type}?api_key=3da21d2780465f7079ade604a6669044&language=en-US&page=1`,
      method: "GET",
    });
    await setArr(res.data.results.slice(0, 5));
  };
  return arr.length ? (
    <div className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4">
      {arr.map((item, idx) => (
        <MovieItem item={item} key={idx} />
      ))}
    </div>
  ) : (
    ""
  );
};

export default Display;
