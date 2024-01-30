import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/bg-sidebar.jpg";
import { FaBars, FaBell } from "react-icons/fa";
import ViewNotification from "./ViewNotification";
import API_LINK from "../../config/API";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/notification/?brgy=${brgy}`
      );
      if (response.status === 200) {
        setNotifications(response.data.result);
      } else setNotifications([]);
    };

    fetch();

    console.log("Notifications: ", notifications);
  }, [brgy]);

  const notificationData = [
    { title: "Notification 1", details: "Lorem Ipsum Details 1" },
    { title: "Notification 2", details: "Lorem Ipsum Details 2" },
    { title: "Notification 3", details: "Lorem Ipsum Details 3" },
    { title: "Notification 4", details: "Lorem Ipsum Details 4" },
    { title: "Notification 5", details: "Lorem Ipsum Details 5" },
    { title: "Notification 6", details: "Lorem Ipsum Details 6" },
  ];

  return (
    <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
      <button
        id="hs-dropdown"
        type="button"
        className="m-1 ms-0 relative flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold text-white shadow-sm hover:bg-[#3d8da1] hover:rounded-xl disabled:opacity-50 disabled:pointer-events-none"
      >
        <FaBell size={20} />
        {notifications && notifications.length > 0 && (
          <span className="flex absolute top-0 end-0 h-3 w-3 -mt-1.5 -me-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
      <ul
        className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll w-96 h-96 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg"
        aria-labelledby="hs-dropdown"
      >
        {notificationData.map((data, index) => (
          <div key={index} className="flex flex-row p-1">
            <div className="border w-full justify-between rounded-l-lg font-medium uppercase gap-x-3.5 py-4 px-3 text-sm text-black bg-[#f8f8f8] hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500">
              <div className="flex flex-col">
                <span className="font-bold text-black">{data.title}</span>
                <span className="font-medium text-xs text-black">
                  {data.details}
                </span>
              </div>
            </div>
            <div>
              <img
                className="mx-auto h-full w-[150px] rounded-r-lg"
                src={header}
                alt=""
              />
            </div>
          </div>
        ))}
      </ul>
      <ViewNotification/>
    </div>
  );
};

export default Notifications;
