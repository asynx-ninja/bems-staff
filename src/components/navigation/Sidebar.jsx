import React from "react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { SiGoogleforms } from "react-icons/si";
import { BsCalendar2Event } from "react-icons/bs";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaServicestack, FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";
import default_pfp from "../../assets/sample-image/default-pfp.png";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({});
  const [logo, setLogo] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  console.log("User: ", userData);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        const res1 = await axios.get(
          `${API_LINK}/brgyinfo/?brgy=${brgy}&logo=true`
        );

        if (res.status === 200 && res1.status === 200) {
          setUserData(res.data[0]);
          setLogo(res1.data[0]);
          var pfpSrc = document.getElementById("sidebarPFP");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : default_pfp;
          var logoSidebar = document.getElementById("logoSidebar");
          logoSidebar.src =
            res1.data[0].logo.link !== "" ? res1.data[0].logo.link : null;
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  const [isClicked, setIsClicked] = useState(false);
  const [isClickedServices, setIsClickedServices] = useState(false);
  const [isClickedInformation, setIsClickedInformation] = useState(false);

  const handleCollapseToggle = () => {
    setIsClicked(!isClicked);
  };

  const handleCollapseToggleServices = () => {
    setIsClickedServices(!isClickedServices);
  };

  const handleCollapseToggleInformations = () => {
    setIsClickedInformation(!isClickedInformation);
  };

  return (
    <>
      <div
        id="hs-overlay-basic"
        className="sm:fixed lg:relative overflow-y-auto lg:block lg:end-auto lg:bottom-0 sm:block flex items-center justify-center hs-overlay-basic h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 z-[60] lg:z-0 lg:translate-x-0 w-[17rem]"
      >
        <div className="h-screen bg-[#2c606d] ">
          <div className="max-h-screen flex flex-col ">
            <div className='bg-[url("/src/assets/image/bg-sidebar.jpg")] w-full shrink-0 flex flex-col items-center justify-center py-5 px-2 space-y-3 object-cover'>
              {/* <img src={logo} alt="" className="" width={80} /> */}
              <img
                id="logoSidebar"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
              <div>
                <h1 className="uppercase font-bold text-white text-lg text-center">
                  BARANGAY {brgy}
                </h1>
              </div>
            </div>
            <div className="w-full shrink-0 flex flex-row items-center justify-between px-2 border-0 py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#4b7c80] to-[#153646] border-y-[1px] space-y-3">
              {/* <img src={logo} alt="" className="" width={80} /> */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="w-4/12">
                  <img
                    id="sidebarPFP"
                    className=" w-[60px] h-[60px]  mx-auto rounded-full border-[2px] border-[#295141] object-cover"
                  />
                </div>
                <div className="w-9/12 ">
                  <h1 className="uppercase font-bold text-white text-sm">
                    {userData.lastName}, {userData.firstName}
                  </h1>
                  <p className="text-white text-xs">{userData.email}</p>
                </div>
              </div>
            </div>
            <nav className="px-6 pt-6 pb-10 flex flex-col relative overflow-y-auto scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb ">
              <ul className="space-y-1.5 text-white font-bold uppercase">
                <li>
                  <Link
                    to={`/dashboard/?id=${id}&brgy=${brgy}`}
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
                      currentPath === "/dashboard"
                        ? "bg-gradient-to-r from-[#0d4b75] to-[#3e5fc2] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                  >
                    <BiSolidDashboard size={15} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    id="hs-events-collapse"
                    data-hs-collapse="#hs-events-collapse-heading"
                    className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0] ${
                      isClicked ? "text-[#EFC586]" : ""
                    }`}
                    onClick={handleCollapseToggle}
                  >
                    <div className="flex items-center gap-x-3">
                      <TfiAnnouncement size={15} />
                      EVENTS
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
                    id="hs-events-collapse-heading"
                    className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-events-collapse"
                  >
                    <Link
                      to={`/events_management/?id=${id}&brgy=${brgy}`}
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
                          ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                    >
                      <BsCalendar2Event size={15} />
                      Events Management
                    </Link>
                    <Link
                      to={`/events_registrations/?id=${id}&brgy=${brgy}`}
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
                          ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                    >
                      <SiGoogleforms  size={15} />
                      Events Applications
                    </Link>
                  </div>
                </li>

                <li>
                  <Link
                    to={`/inquiries/?id=${id}&brgy=${brgy}`}
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
                      currentPath === "/inquiries"
                        ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
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
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === "/residents"
                        ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                  >
                    <BsPeopleFill size={15} />
                    Residents
                  </Link>
                </li>

                <li>
                  <button
                    id="hs-unstyled-collapse"
                    data-hs-collapse="#hs-unstyled-collapse-heading"
                    className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0] ${
                      isClickedServices ? "text-[#EFC586]" : ""
                    }`}
                    onClick={handleCollapseToggleServices}
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
                          ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
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
                          ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                    >
                      <GoGitPullRequest size={15} />
                      Service Requests
                    </Link>
                  </div>
                </li>

                {userData.type === "Brgy Admin" ? (
                  <li>
                    <button
                      id="hs-unstyled-collapse"
                      data-hs-collapse="#hs-info-collapse-heading"
                      className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0] ${
                        isClickedInformation ? "text-[#EFC586]" : ""
                      }`}
                      onClick={handleCollapseToggleInformations}
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
                        to={`/reports/?id=${id}&brgy=${brgy}`}
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
                            ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                            : null
                        } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                      >
                        <ImStatsBars size={15} />
                        Reports
                      </Link>
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
                            ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                            : null
                        } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                      >
                        <FaPeopleGroup size={15} />
                        Barangay Officials
                      </Link>
                      <Link
                        to={`/staff_management/?id=${id}&brgy=${brgy}`}
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
                          currentPath === "/staff_management"
                            ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                            : null
                        } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                      >
                        <MdManageAccounts size={15} />
                        Staff Management
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
                            ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                            : null
                        } flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                      >
                        <FaChalkboardTeacher size={15} />
                        Barangay Information
                      </Link>
                    </div>
                  </li>
                ) : null}
                <li>
                  <Link
                    to={`/settings/?id=${id}&brgy=${brgy}`}
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
                      currentPath === "/settings"
                        ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
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
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === "/"
                        ? "bg-gradient-to-r from-[#2e6674] to-[#3098a0] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#2e6674] to-[#3098a0]`}
                  >
                    <HiMiniInformationCircle size={15} />
                    Sign-Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
