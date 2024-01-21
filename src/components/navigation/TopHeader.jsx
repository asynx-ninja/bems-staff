import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/rizallogo.png";
import { FaBars } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";

const TopHeader = () => {
  const [date, setDate] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

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
    <div className="flex flex-col-reverse md:flex-row justify-between items-center sm:px-2 lg:pr-3 bg-[url('/imgs/header-bg.png')] font-medium py-2 z-50 bg-[#276b7c] uppercase text-white text-sm  md:text-sm lg:text-base 2xl:text-xl">
      <div className="flex flex-row sm:justify-between md:justify-center items-center space-x-3">
        <button
          type="button"
          className="lg:hidden block"
          data-hs-overlay="#hs-overlay-basic"
          aria-controls="hs-overlay-basic"
          aria-label="Toggle navigation"
        >
          <FaBars size={window.innerWidth <= 640 ? 25 : 35} />
        </button>
        <div>
          <h1 className="text-xs lg:text-lg">{formattedDate} </h1>
          <h1 className="text-xs lg:text-lg">
            {formattedTime} Philippine Standard Time (PMT)
          </h1>
        </div>
      </div>

      <div className="flex flex-row space-x-2">
        <Notifications />

        <img
          className="mx-auto md:mx-0 md:mb-0 h-[50px] md:h-[50px] w-[165px] md:w-[170px]"
          src={header}
          alt=""
        />
      </div>
    </div>
  );
};

export default TopHeader;
