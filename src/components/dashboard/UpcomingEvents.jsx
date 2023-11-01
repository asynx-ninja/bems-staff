import React from "react";
import {MdEvent} from 'react-icons/md'

const UpcomingEvents = () => {
  return (
    <div className="w-full lg:w-6/12 flex flex-col">
      <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl mb-4">
        UPCOMING EVENTS
      </b>
      <div className="overflow-y-auto h-[300px] 2xl:h-[665px]">
        <div className="w-full gap-3 flex flex-col ">
          {Array(9)
            .fill("")
            .map((_, idx) => (
              <div className="flex flex-row bg-gradient-to-r from-[#295141]  to-[#408D51] h-full text-white font-medium overflow-hidden">
                <div class="bg-[url('https://placekitten.com/1400')] bg-cover bg-center w-[20%] h-[4rem] md:h-[5rem] lg:h-[6rem] object-cover rounded-r-full border-solid border-0">
                  <div
                    class="w-full h-full flex  justify-center items-center 
             bg-gradient-to-r from-[#00000000] to-[#FFCF67]/60 rounded-r-full"
                  ></div>
                </div>

                <div className="flex flex-row justify-between items-center w-full sm:px-3 md:px-5">
                  <div className="flex flex-col justify-center ">
                    <h1 className="line-clamp-1 sm:text-[13px] md:text-base w-full">
                      BAYANIHAN SA KAPIHAN BAYANIHAN SA KAPIHAN {idx + 1}
                    </h1>
                    <p className="text-xs md:text-sm">OCTOBER 18, 2023</p>
                  </div>
                  <button>
                    <MdEvent size={25} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
