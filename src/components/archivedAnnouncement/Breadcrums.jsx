import React from "react";
import { GrFormNext } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";
import { useSearchParams } from "react-router-dom";

const Breadcrumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <TfiAnnouncement size={22} />
        <li>
          <a href={`/announcements/?brgy=${brgy}&archived=false`} className="text-gray-600 font-bold hover:underline">
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
