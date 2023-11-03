import React from "react";
import { GrFormNext } from "react-icons/gr";
import { VscOrganization } from "react-icons/vsc";

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <VscOrganization size={22} />
        <li>
          <a href="/residents" className="text-gray-600 font-bold hover:underline">
            RESIDENTS
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED RESIDENTS</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
