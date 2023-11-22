import React, { useState, useEffect } from "react";
import header from "../../assets/image/rizallogo.png"
import { FaBars } from "react-icons/fa";

const TopHeader = () => {
  const [date, setDate] = useState(new Date());

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
    <div className="flex flex-col-reverse md:flex-row justify-between items-center sm:px-2 lg:pr-3 bg-[url('/imgs/header-bg.png')] font-medium py-2 z-50 bg-[#295141] uppercase text-white text-sm  md:text-sm lg:text-base 2xl:text-xl">
      <div className="flex flex-row justify-center items-center space-x-3">
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
          <h1 className="text-xs lg:text-lg">{formattedTime} Philippine Standard Time (PMT)</h1>
        </div>
      </div>
      <img className="mb-2 mx-auto md:mx-0 md:mb-0 h-[90px] md:h-[50px] w-full md:w-[170px]" src={header} alt="" />
    </div>
  );
};

export default TopHeader;
