import React from "react";
import { GrFormNext } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <MdMiscellaneousServices size={22} />
        <li>
          <a href="/services" className="text-gray-600 font-bold hover:underline">
            SERVICES
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED SERVICES</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
