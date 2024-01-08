import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import { MdEvent } from "react-icons/md";
import ViewEvent from "./ViewEvent";

const UpcomingEvents = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/announcement/?brgy=${brgy}&archived=false`
      );
      if (response.status === 200) setAnnouncements(response.data.result);
      else setAnnouncements([]);
    };
    fetch();
  }, []);

  const dateFormat = (date) => {
    const eventdate = date === undefined ? "" : date.substr(0, 10);
    return eventdate;
  };

  const handleView = (item) => {
    setAnnouncement(item);
  };

  return (
    <div className="relative w-full lg:w-6/12 flex flex-col overflow-y-auto h-full">
      <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl mb-4">
        UPCOMING EVENTS
      </b>
      <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-auto xxl:h-[calc(100vh_-_410px)] xxxl:h-[calc(100vh_-_410px)]">
        <div className="w-full gap-3 flex flex-col border">
          {announcements.map((item, index) => (
            <div className="flex flex-row bg-gradient-to-r from-[#0d4b75] to-[#2e65ac] h-full text-white font-medium overflow-hidden">
              <div
                className="bg-cover bg-center w-[20%] h-[4rem] md:h-[5rem] lg:h-[6rem] object-cover rounded-r-full border-solid border-0"
                style={{
                  backgroundImage: `url('${item.collections.banner.link}')`,
                }}
              >
                <div
                  className="w-full h-full flex  justify-center items-center 
             bg-gradient-to-r from-[#00000000] to-[#FFCF67]/60 rounded-r-full"
                ></div>
              </div>

              <div className="flex flex-row justify-between items-center w-full sm:px-3 md:px-5">
                <div className="flex flex-col justify-center ">
                  <h1 className="line-clamp-1 sm:text-[13px] md:text-base w-full">
                    {item.title}
                  </h1>
                  <p className="text-xs md:text-sm">
                    {dateFormat(item.date) || ""}
                  </p>
                </div>
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-viewEvent"
                  onClick={() => handleView({ ...item })}
                  className="text-white bg-blue-900 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                >
                  <MdEvent size={24} style={{ color: "#ffffff" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ViewEvent
        announcement={announcement}
        setAnnouncement={setAnnouncement}
        brgy={brgy}
        id={id}
      />
    </div>
  );
};

export default UpcomingEvents;
