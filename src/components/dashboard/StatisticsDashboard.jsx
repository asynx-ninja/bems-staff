import React from "react";
import { BsMegaphone } from "react-icons/bs";

const StatisticsDashboard = () => {
  const gradients = [
    { gradient1: "from-[#2E3192]", gradient2: "to-[#2CAFFF]" },
    { gradient1: "from-[#D4145A]", gradient2: "to-[#FBB03B]" },
    { gradient1: "from-[#009245]", gradient2: "to-[#FEAB21]" },
    { gradient1: "from-[#662D8C]", gradient2: "to-[#ED1E79]" },
    { gradient1: "from-[#614385]", gradient2: "to-[#516395]" },
    { gradient1: "from-[#02AABD]", gradient2: "to-[#00CDAC]" },
    { gradient1: "from-[#FF512F]", gradient2: "to-[#DD2476]" },
    { gradient1: "from-[#868F96]", gradient2: "to-[#596164]" },
    { gradient1: "from-[#C33764]", gradient2: "to-[#1D2671]" },
  ];

  return (
    <div className="flex flex-col w-full">
      <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl">
        Dashboard
      </b>
      <div className="w-full grid sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-3 gap-3 py-4">
        {gradients.map((item, idx) => (
          <div
            key={idx}
            id="container"
            className={`bg-gradient-to-r ${item.gradient1} ${item.gradient2} text-white flex flex-row justify-between items-center p-3 text-sm md:text-base lg:text-lg`}
          >
            <div className="font-bold">
              <BsMegaphone size={15} className="sm:block md:hidden" />
              <span className="uppercase sm:hidden md:block">
                Announcements
              </span>
            </div>
            <strong>{idx + 1}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsDashboard;
