import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import header from "../../assets/image/bg-sidebar.jpg";
import { FaBell } from "react-icons/fa";
import ViewNotification from "./ViewNotification";
import API_LINK from "../../config/API";
import { MdEvent } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [userData, setUserData] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        const res1 = await axios.get(
          `${API_LINK}/brgyinfo/?brgy=${brgy}&logo=true`
        );

        if (res.status === 200 && res1.status === 200) {
          setUserData(res.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, brgy]);

  // console.log("userData: ",userData);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_LINK}/notification/?user_id=${userData.user_id}&area=${brgy}&type=Barangay`
  //       );

  //       if (response.status === 200) {
  //         setNotifications(response.data);
  //       } else {
  //         setNotifications([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //       setNotifications([]);
  //     }
  //   };

  //   fetchNotifications();
  // }, [brgy]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/notification/?user_id=${userData.user_id}&area=${brgy}&type=Barangay`
        );
        console.log(response.data);
        if (response.status === 200) {
          const notificationsWithTimestamp = response.data.map(
            (notification) => {
              const notificationDate = moment(notification.createdAt);
              const now = moment();
              const timeDiff = moment.duration(now.diff(notificationDate));
              let timeAgo = "";

              if (timeDiff.asMinutes() < 60) {
                timeAgo = `${Math.floor(timeDiff.asMinutes())} minutes ago`;
              } else if (timeDiff.asHours() < 24) {
                timeAgo = `${Math.floor(timeDiff.asHours())} hours ago`;
              } else if (timeDiff.asDays() === 1) {
                timeAgo = "Yesterday at " + notificationDate.format("h:mm A");
              } else {
                timeAgo = notificationDate.format("ddd [at] MMM D, h:mm A");
              }

              return {
                ...notification,
                timestamp: timeAgo,
              };
            }
          );

          setNotifications(notificationsWithTimestamp);
          console.log(response.data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [brgy]);

  const handleView = (item) => {
    setNotification(item);
  };

  return (
    <>
      <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
      <button
          id="hs-dropdown"
          type="button"
          className={`m-1 ms-0 relative flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold text-white shadow-sm hover:bg-[#3d8da1] hover:rounded-xl disabled:opacity-50 disabled:pointer-events-none ${
            isButtonClicked ? "bg-[#3d8da1] rounded-xl" : ""
          }`}
          onClick={() => setIsButtonClicked(!isButtonClicked)}
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
          className="bg-[#e2e2e2] border-4 z-10 shadow-xl border-[#58b397] hs-dropdown-menu scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll w-[500px] h-96 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden rounded-lg"
          aria-labelledby="hs-dropdown"
        >
          {notifications.map((data, index) => (
           <li
           key={index}
           className={`px-4 py-3 border-b last:border-b-0 border w-full justify-between shadow-sm rounded-l-lg font-medium uppercase gap-x-3.5 text-sm text-black bg-[#f8f8f8] hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500 ${
             data.read_by.some((item) => item.readerId === id) ? "" : "bg-[#e9dac2]"
           }`}
         >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 mr-4">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={data.banner.link}
                    alt=""
                  />
                </div>
                <div className="flex flex-col max-h-24 w-aut">
                  <span className="font-bold text-black text-[12px]">
                    {data.compose.subject}
                  </span>
                  <span className="font-medium text-[9px] text-black text-ellipsis line-clamp-2 overflow-hidden">
                    {data.compose.message}
                  </span>
                  <div className="flex flex-row items-center gap-4">
                    <div>
                      <Link
                        onClick={() => handleView({ ...item })}
                        to={{
                          pathname: `/view_notifications/`,
                          search: `?id=${id}&brgy=${brgy}&notification=${encodeURIComponent(
                            JSON.stringify(data)
                          )}`,
                        }}
                        className={`h-[1.5rem] w-36 py-1 px-2 justify-bottom rounded-md border text-xs flex flex-row items-center justify-center mt-2 font-base bg-teal-900 text-white shadow-sm ${
                          data.read_by.length ? "bg-gray-400" : ""
                        }`}
                      >
                        Read More
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mt-1">
                        {data.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ViewNotification
        notification={notification}
        setNotification={setNotification}
        brgy={brgy}
        id={id}
      />
    </>
  );
};

export default Notifications;
