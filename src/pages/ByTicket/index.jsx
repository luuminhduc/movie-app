import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const ByTicket = () => {
  const params = useParams();
  const { id } = params;
  const [movie, setMovie] = useState("");
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  const themeReducer = useSelector((state) => state.themeReducer);
  const { isLight } = themeReducer;

  const [seatArr, setSeatArr] = useState([]);
  const aphabetArr = ["A", "B", "C", "D", "E", "F", "H", "G"];
  const fetchMovie = async () => {
    const res = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=3da21d2780465f7079ade604a6669044&language=en-US`,
    });
    await setMovie(res.data);
  };

  const renderMovieInfo = () => {
    const {
      title,

      runtime,

      poster_path,
    } = movie;

    const today = new Date();

    return (
      <div
        className={`flex flex-row justify-between items-center md:w-9/12 mx-auto p-3 rounded shadow-md ${
          isLight ? "bg-white" : "bg-blueGray-800"
        }`}
      >
        <div className="flex flex-row justify-center items-center">
          <img className="h-32 mr-3" src={IMGPATH + poster_path} alt="" />
          <div className="flex flex-col justify-start items-start">
            <p className="text-2xl text-rose-500">{title}</p>
            <p>{runtime} minutes</p>
          </div>
        </div>
        <p>
          {today.getDate()} / {today.getMonth() + 1} / {today.getFullYear()}
        </p>
      </div>
    );
  };

  useEffect(() => {
    fetchMovie();
    generateSeats();
    // eslint-disable-next-line
  }, [id]);

  // console.log(movie);

  const getSelectedSeat = () => {
    const seatRowList = seatArr.map((el) => el.seatRow);
    const arr = [];
    for (let i = 0; i < seatRowList.length; i++) {
      for (let j = 0; j < seatRowList[i].length; j++) {
        arr.push(seatRowList[i][j]);
      }
    }
    const selectedSeat = arr.filter((el) => el.selected);
    return selectedSeat;
  };

  const renderCart = () => {
    const selectedSeat = getSelectedSeat();
    return (
      <div>
        <div
          className={`p-3 md:mt-0 mt-10 shadow-md col-span-1 rounded ${
            isLight ? "bg-white" : "bg-blueGray-800"
          }`}
        >
          <p className="mb-2 w-full">
            Seat:{" "}
            <div className="flex flex-wrap">
              {selectedSeat?.map((e, i) => (
                <span className="mr-2 mb-1" key={i}>
                  {e.row}
                  {e.name}
                </span>
              ))}
            </div>
          </p>
          <p className="text-xl">
            Total:{" "}
            <span>
              {selectedSeat.length > 0
                ? selectedSeat?.map((el) => el.price).reduce((a, b) => (a += b))
                : 0}{" "}
              $
            </span>
          </p>
          <button className="rounded p-3 w-full block cursor-pointer bg-rose-600 text-white  hover:bg-rose-500 mt-5">
            Checkout
          </button>
        </div>
      </div>
    );
  };

  const handleSeatClick = (id, rowIndex) => {
    const selectedSeat = getSelectedSeat();
    const newSeatArr = [...seatArr];
    const seatIndex = newSeatArr[rowIndex].seatRow.findIndex(
      (el) => el.id === id
    );
    if (selectedSeat.length < 9) {
      if (!newSeatArr[rowIndex].seatRow[seatIndex].isBooked) {
        newSeatArr[rowIndex].seatRow[seatIndex].selected =
          !newSeatArr[rowIndex].seatRow[seatIndex].selected;
        setSeatArr(newSeatArr);
      }
    } else {
      if (newSeatArr[rowIndex].seatRow[seatIndex].selected) {
        newSeatArr[rowIndex].seatRow[seatIndex].selected = false;
        setSeatArr(newSeatArr);
      } else {
        alert("You can not select more than 9 seats");
      }
    }
  };

  const getClass = (type, isSelected, isBooked) => {
    if (isSelected) {
      return "bg-teal-600 text-white";
    }
    if (isBooked) {
      return "bg-blue-500 cursor-not-allowed ";
    }
    switch (type) {
      case false: {
        return "bg-gray-500";
      }
      default: {
        return "bg-orange-500 text-white";
      }
    }
  };

  const generateSeats = () => {
    const newSeatArr = [];
    for (let i = 0; i <= 7; i++) {
      newSeatArr.push({
        name: aphabetArr[i],
        isVip: i >= 4 ? true : false,
        seatRow: [],
      });
      for (let j = 1; j <= 12; j++) {
        newSeatArr[i].seatRow.push({
          id: uuid(),
          name: j,
          selected: false,
          isBooked: Math.random() > 0.9 ? true : false,
          price: newSeatArr[i].isVip ? 20 : 10,
          row: newSeatArr[i].name,
        });
      }
    }
    setSeatArr(newSeatArr);
  };

  const renderMovieSeat = () => {
    return (
      <div className="col-span-3">
        <div className=" mx-auto p-1 text-white bg-black shadow-lg text-center">
          Screen
        </div>
        <div className="mt-10">
          {seatArr?.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-1 mt-2">
              {item.seatRow.map((e, i) => (
                <div
                  onClick={() => handleSeatClick(e.id, idx)}
                  className={`text-xs rounded p-2 cursor-pointer ${getClass(
                    item.isVip,
                    e.selected,
                    e.isBooked
                  )}`}
                  key={i}
                >
                  {item.name + e.name}
                </div>
              ))}
            </div>
          ))}
        </div>
        {renderIntrucstion()}
      </div>
    );
  };

  const renderIntrucstion = () => {
    return (
      <div className="flex mt-10 flex-row justify-between items-center">
        <div>
          <p>Available</p>
          <div className="text-xs rounded p-2 w-10 h-7 bg-gray-500"></div>
        </div>
        <div>
          <p>isBooked</p>
          <div className="text-xs rounded p-2 w-10 h-7 bg-blue-500"></div>
        </div>
        <div>
          <p>Vip</p>
          <div className="text-xs rounded p-2 w-10 h-7 bg-orange-500"></div>
        </div>
        <div>
          <p>Selected</p>
          <div className="text-xs rounded p-2 w-10 h-7 bg-teal-600"></div>
        </div>
      </div>
    );
  };

  return movie ? (
    <div>
      {renderMovieInfo()}
      <div className="mt-10 md:grid grid-cols-4 gap-8">
        {renderMovieSeat()}
        {renderCart()}
      </div>
    </div>
  ) : (
    ""
  );
};

export default ByTicket;
