import React from "react";
import logo from "../../assets/header/montalban-logo.png";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { ImBullhorn } from "react-icons/im";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaServicestack, FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";
import { useEffect } from "react";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  return (
    <div className="">
      <div
        id="hs-overlay-basic"
        className="bg-[#295141] h-screen 2xl:h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden absolute top-9 left-0 bottom-0 z-[60] lg:z-[50] w-64 m-5 rounded-[25px] overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 "
      >
        <div className='bg-[url("/imgs/bg-header.png")] w-full flex flex-col items-center justify-center py-5 px-2 space-y-3'>
          <img src={logo} alt="" className="" width={80} />
          <div>
            <h1 className="uppercase font-bold text-white text-sm">
              Dr. Kenshi Takahashi
            </h1>
            <p className="text-white text-xs">kenshi.takahashi@gmail.com</p>
          </div>
        </div>
        <nav className="px-6 pt-6 flex flex-col flex-wrap ">
          <ul className="space-y-1.5 text-white font-bold uppercase">
            <li>
              <Link
                to={`/dashboard/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/dashboard"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <BiSolidDashboard size={15} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={`/announcements/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/announcements"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <ImBullhorn size={15} />
                Announcements
              </Link>
            </li>
            <li>
              <Link
                to={`/inquiries/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/inquiries"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <FaRegNoteSticky size={15} />
                Inquiries
              </Link>
            </li>
            <li>
              <Link
                to={`/residents/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/residents"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <BsPeopleFill size={15} />
                Residents
              </Link>
            </li>

            <li>
              <button
                id="hs-unstyled-collapse"
                data-hs-collapse="#hs-unstyled-collapse-heading"
                className="hs-collapse-toggle justify-between flex items-center w-full  gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]"
              >
                <div className="flex items-center gap-x-3">
                  <MdOutlineMiscellaneousServices size={15} />
                  SERVICES
                </div>
                <div className="flex">
                  <svg
                    className="hs-collapse-open:rotate-180  w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
              <div
                id="hs-unstyled-collapse-heading"
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-unstyled-collapse"
              >
                <Link
                  to={`/services/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={`${
                    currentPath === "/services"
                      ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                      : null
                  } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                >
                  <FaServicestack size={15} />
                  Manage Services
                </Link>
                <Link
                  to={`/requests/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={`${
                    currentPath === "/requests"
                      ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                      : null
                  } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                >
                  <GoGitPullRequest size={15} />
                  Service Requests
                </Link>
              </div>
            </li>
            <li>
              <button
                id="hs-unstyled-collapse"
                data-hs-collapse="#hs-info-collapse-heading"
                className="hs-collapse-toggle justify-between flex items-center w-full  gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]"
              >
                <div className="flex items-center gap-x-3">
                  <HiMiniInformationCircle size={15} />
                  INFORMATION
                </div>
                <div className="flex">
                  <svg
                    className="hs-collapse-open:rotate-180  w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
              <div
                id="hs-info-collapse-heading"
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-unstyled-collapse"
              >
                <Link
                  to={`/officials/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={`${
                    currentPath === "/officials"
                      ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                      : null
                  } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                >
                  <FaPeopleGroup size={15} />
                  Barangay Officials
                </Link>
                <Link
                  to={`/info/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={`${
                    currentPath === "/info"
                      ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                      : null
                  } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                >
                  <FaChalkboardTeacher size={15} />
                  Barangay Information
                </Link>
              </div>
            </li>
            <li>
              <Link
                to={`/settings/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/settings"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <MdOutlineMiscellaneousServices size={15} />
                Profile Settings
              </Link>
            </li>
            <li>
              <Link
                to="/"
                replace
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/"
                    ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
              >
                <HiMiniInformationCircle size={15} />
                Sign-Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
