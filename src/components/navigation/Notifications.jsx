import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/rizallogo.png";
import { FaBars } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

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
      }
      else setNotifications([]);
    };

    fetch();
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
      class="m-1 ms-0 relative flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold text-white shadow-sm hover:bg-[#3d8da1] disabled:opacity-50 disabled:pointer-events-none"
    >
      <FaBell size={20} />
      {notifications.length > 0 && (
        <span className="flex absolute top-0 end-0 h-3 w-3 -mt-1.5 -me-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </button>
    <ul
      className="bg-[#21556d] border-2 border-[#ffb13c] hs-dropdown-menu w-96 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
      aria-labelledby="hs-dropdown"
    >
      {notificationData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col border font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
          >
            <span className="font-heavy">{data.title}</span>
            <span className="font-medium text-xs">{data.details}</span>
          </div>
        ))}
    </ul>
  </div>
  );
};

export default Notifications;
