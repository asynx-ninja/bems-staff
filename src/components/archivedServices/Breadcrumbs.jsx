import React from "react";
import { GrFormNext } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";
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
        <MdMiscellaneousServices size={22} />
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
            SERVICES
          </Link>
          {/* <a href={`/services/?id=${id}&brgy=${brgy}&archived=false`} className="text-gray-600 font-bold hover:underline">
            SERVICES
          </a> */}
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
