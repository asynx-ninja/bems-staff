import React from "react";
import { GrFormNext } from "react-icons/gr";
import { IoTicketSharp } from "react-icons/io5";

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <IoTicketSharp size={22} />
        <li>
          <a href="/inquiries" className="text-gray-600 font-bold hover:underline">
            INQUIRIES
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED INQUIRIES</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
