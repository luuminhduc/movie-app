import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import SimilarMovie from "../../components/SimilarMovie";

const DetailPage = () => {
  const params = useParams();
  const { id } = params;
  const [movie, setMovie] = useState("");
  const [movieCredit, setMovieCredit] = useState("");
  const [movieReview, setMovieReview] = useState();
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const blockArray = ["Credits", "Reviews"];
  const [currentBlock, setCurrentBlock] = useState("Credits");
  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;
  useEffect(() => {
    fetchMovie();
    fetchMovieCredit();
    fetchMovieReview();
    // eslint-disable-next-line
  }, [id]);
  const fetchMovie = async () => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=3da21d2780465f7079ade604a6669044&language=en-US`,
    });
    await setMovie(res.data);
  };

  const fetchMovieReview = async () => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=3da21d2780465f7079ade604a6669044&language=en-US&page=1`,
    });
    await setMovieReview(res.data);
  };

  console.log(movieReview);

  const fetchMovieCredit = async () => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3da21d2780465f7079ade604a6669044&language=en-US`,
    });
    await setMovieCredit(res.data);
  };

  const renderMovieInfo = () => {
    const {
      title,
      vote_average,

      runtime,
      revenue,
      release_date,
      poster_path,
      overview,
      genres,
      budget,
    } = movie;
    return (
      <div className="md:grid grid-cols-2 gap-12">
        <img className="md:mb-0 mb-10" src={IMGPATH + poster_path} alt="" />
        <div className="">
          <div className="flex mb-3 flex-row justify-start items-center">
            <span className="mr-3 bg-violet-500 text-white h-8 w-8 flex justify-center items-center rounded-full">
              {vote_average}
            </span>
            <div className="flex flex-col text-sm justify-start items-start">
              {renderStar()}
              <span className="font-light">{revenue}</span>
            </div>
          </div>
          <h1 className="text-7xl text-violet-500">{title}</h1>
          <p className="text-sm mb-5">{runtime} minutes</p>
          <p className="mb-1">
            <span className="font-bold">Release date:</span> {release_date}
          </p>
          <p className="mb-1">
            <span className="font-bold">Budget:</span> {formatCurrency(budget)}
          </p>
          <p className="mb-1">
            <span className="font-bold">Genres:</span>{" "}
            {genres?.map((e, i) => (
              <span key={i}>
                {e.name} {i >= genres.length - 1 ? "" : ","}
              </span>
            ))}
          </p>
          <p className="mb-5">{overview}</p>
          <NavLink
            className="px-6 py-2 rounded cursor-pointer bg-rose-600 text-white text-xl hover:bg-rose-500 mt-5"
            to={`/${id}/ticket`}
          >
            By ticket
          </NavLink>
        </div>
      </div>
    );
  };
  const renderStar = () => {
    const { vote_average } = movie;
    const voteBypercent = (vote_average / 10) * 100;
    const voteByFive = (5 * voteBypercent) / 100;
    return (
      <div className="flex flex-row justify-start items-center">
        {[1, 2, 3, 4, 5].map((e, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              voteByFive >= e ? "text-yellow-500" : "text-blueGray-500"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  const renderBlock = () => {
    switch (currentBlock) {
      case "Credits":
        return renderCredit();
      default:
        return renderReviews();
    }
  };
  const renderCredit = () => {
    const { cast } = movieCredit;
    return (
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-8">
        {cast?.map((el, idx) => (
          <div
            key={idx}
            className={`shadow-lg rounded ${
              isLight ? "bg-white" : "bg-blueGray-800"
            } `}
          >
            {el.profile_path ? (
              <img className="" src={IMGPATH + el.profile_path} alt="" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <div className="p-3">
              <p className="mb-1">
                <span className="font-bold">Name:</span> {el.name}
              </p>
              <p className="">
                <span className="font-bold">Character:</span> {el.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderReviews = () => {
    return (
      <div>
        {movieReview?.results?.map((el, i) => (
          <div
            className={`${i > 0 && "mt-5"} border border-solid p-4 ${
              isLight ? "border-blueGray-300" : "border-blueGray-700"
            }`}
            key={i}
          >
            <div className="mb-2 flex flex-row justify-start items-center">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={IMGPATH + el.author_details.avatar_path}
                alt=""
              />
              <p>{el.author_details.name}</p>
            </div>
            <p className="mb-2">
              <span className="font-bold">Rating:</span>
              {el.author_details?.rating}
            </p>
            <p>{el.content}</p>
          </div>
        ))}
      </div>
    );
  };
  return movie ? (
    <div className="md:px-10">
      {renderMovieInfo()}
      <div>
        <div className="flex mt-10 flex-row justify-start items-center">
          {blockArray.map((e, i) => (
            <p
              onClick={() => setCurrentBlock(e)}
              className={`pr-20 hover:text-violet-500 hover:border-violet-500 mr-1 transition-all pb-1 cursor-pointer  border-b-2 border-solid ${
                currentBlock === e
                  ? "border-violet-500 text-violet-600 font-bold"
                  : `${isLight ? "border-blueGray-300" : "border-blueGray-700"}`
              }`}
              key={i}
            >
              {e}
            </p>
          ))}
        </div>
        <div className="mt-10">{renderBlock()}</div>
      </div>
      <SimilarMovie id={id} />
    </div>
  ) : (
    ""
  );
};

export default DetailPage;
