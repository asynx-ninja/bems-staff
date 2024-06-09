import React from "react";
import { GrFormNext } from "react-icons/gr";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const navigate = useNavigate();

  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <BiMessageSquareDetail size={22} />
        <li>
          <Link
            //  href={`/barangayinformation/?id=${id}&brgy=${brgy}`}
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="text-gray-600 font-bold hover:underline text-xs md:text-lg"
          >
            EVENTS APPLICATION
          </Link>
          {/* <a href={`/events_registrations/?id=${id}&brgy=${brgy}`} className="text-gray-600 font-bold hover:underline text-sm md:text-lg">
            EVENTS APPLICATION
          </a> */}
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-sm md:text-lg text-[#295141] font-bold">
          ARCHIVED APPLICATIONS
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
