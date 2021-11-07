import React, { useEffect, useState } from "react";
import axios from "axios";
const SimilarMovie = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState("");
  useEffect(() => {
    fetchSimilarMovie();
    // eslint-disable-next-line
  }, [id]);
  const fetchSimilarMovie = async () => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/similar?api_key=3da21d2780465f7079ade604a6669044&language=en-US&page=1`,
    });
    await setSimilarMovies(res.data);
  };
  console.log(similarMovies);
  return <div></div>;
};

export default SimilarMovie;
