import React from "react";
import { GrFormNext } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <TfiAnnouncement size={22} />
        <li>
          <a href="/announcements" className="text-gray-600 font-bold hover:underline">
            ANNOUNCEMENT
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED ANNOUNCEMENT</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
