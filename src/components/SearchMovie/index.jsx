import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateSearchTerm } from "../../redux/action/movieAction/actions";

const SearchMovie = () => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;
  const movieReducer = useSelector((state) => state.movieReducer);
  const { searchTerm } = movieReducer;
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${searchTerm}&&p=1`);
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-3/5 xs:w-full mx-auto">
      <input
        value={searchTerm}
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
        className={`w-full focus:outline-none p-4 rounded focus:ring-1 shadow-lg ${
          isLight ? "bg-white" : "bg-blueGray-800"
        }`}
        type="text"
        placeholder="Search movie..."
      />
    </form>
  );
};

export default SearchMovie;
