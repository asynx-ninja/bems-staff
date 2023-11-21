import React from "react";
import { GrFormNext } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

const Breadcrumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <BsPeopleFill size={22} />
        <li>
          <a href={`/officials/?id=${id}&brgy=${brgy}&archived=false`} className="text-gray-600 font-bold hover:underline">
            BARANGAY OFFICIALS
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[#295141] font-bold">ARCHIVED OFFICIALS</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;