import React from "react";
import { GrFormNext } from "react-icons/gr";
import { BiMessageSquareDetail } from "react-icons/bi";

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <BiMessageSquareDetail size={22} />
        <li>
          <a href="/requests" className="text-gray-600 font-bold hover:underline">
            SERVICE REQUESTS
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED REQUESTS</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
