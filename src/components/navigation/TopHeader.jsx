import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/rizallogo.png";
import { FaBars } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const TopHeader = () => {
  const [date, setDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);
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

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/notification/?brgy=${brgy}`
      );
      if (response.status === 200) {
        setNotifications(response.data.result);
      }
      else setNotifications([]);
    };

    fetch();
  }, [brgy]);

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

  console.log("notifications: ", notifications);

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
        {/* Notification */}
        <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
          <button
            id="hs-dropdown"
            type="button"
            class="m-1 ms-0 relative flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold rounded-lg border border-gray-200 bg-[#327383] text-white shadow-sm hover:bg-[#3d8da1] disabled:opacity-50 disabled:pointer-events-none"
          >
            <FaBell />
            {notifications.length > 0 && (
              <span className="flex absolute top-0 end-0 h-3 w-3 -mt-1.5 -me-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>
          <ul
            className="bg-[#21556d] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
            aria-labelledby="hs-dropdown"
          >
            <a
              className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
              href="#"
            >
              RESET FILTERS
            </a>
          </ul>
        </div>

        {/* Montalban Image */}
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
