import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/rizallogo.png";
import { FaBars } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";
import GetBrgy from "../GETBrgy/getbrgy";
const TopHeader = () => {
  const [date, setDate] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const information = GetBrgy(brgy);
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDate = date.toLocaleDateString("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formattedTime = date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center sm:px-2 lg:pr-3 bg-[url('/imgs/header-bg.png')] font-medium py-2 z-50 uppercase bg-teal-700 text-white text-sm  md:text-sm lg:text-base 2xl:text-xl" style={{ backgroundColor: information?.theme?.primary }}>
      <div className="flex flex-row w-full sm:justify-between md:justify-center items-center space-x-3 lg:mr-2">
        <button
          type="button"
          className="lg:hidden block"
          data-hs-overlay="#hs-overlay-basic"
          aria-controls="hs-overlay-basic"
          aria-label="Toggle navigation"
        >
          <FaBars size={window.innerWidth <= 640 ? 25 : 35} />
        </button>
        <div className="w-full">
          <h1 className="text-xs lg:text-lg">{formattedDate} </h1>
          <h1 className="text-xs lg:text-lg">
            {formattedTime} Philippine Standard Time (PMT)
          </h1>
        </div>
        <div>
          <Notifications />
        </div>
      </div>

      <img
        className="mx-auto md:mx-0 md:mb-0 h-[50px] md:h-[50px] w-[165px] md:w-[170px] mb-2"
        src={header}
        alt=""
      />
    </div>
  );
};

export default TopHeader;
