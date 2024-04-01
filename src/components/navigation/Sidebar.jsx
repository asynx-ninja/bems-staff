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
import { GoGitPullRequest, GoLaw } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";
import default_pfp from "../../assets/sample-image/default-pfp.png";
import GetBrgy from "../GETBrgy/getbrgy";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({});
  const [logo, setLogo] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const to = searchParams.get("to");
  const [selectedOption, setSelectedOption] = useState("");
  const [requests, setRequests] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [pendingEventsCount, setPendingEventsCount] = useState(0);
  const [pendingEventsAndApp, setPendingEventsAndApp] = useState(0);
  const [inquiries, setInquiries] = useState(0);
  const [residentResponseCount, setResidentInquiriesLength] = useState(0);
  const [patawag, setPatawag] = useState(0);
  const [residentBlotterResponseCount, setResidentBlotterLength] = useState(0);
  const information = GetBrgy(brgy);

  useEffect(() => {
    const fetchPatawag = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/blotter/staffblotter/?label=Staff&brgy=${brgy}`
        );

        if (response.status === 200) {
          const patawag = response.data.result;
          setPatawag(patawag);

          const residentPatawags = patawags.filter((patawag) => {
            const latestResponse =
              patawag.response[patawag.response.length - 1];

            return (
              latestResponse &&
              latestResponse.type === "Resident" &&
              (inquiry.status === "In Progress")
            );
          });

          const residentPatawagsLength = residentPatawags.length;
          setResidentBlotterLength(residentPatawagsLength);
        } else {
          console.error("Error fetching patawags:", response.error);
        }
      } catch (err) {
        console.error("Uncaught error:", err.message);
      }
    };

    // Fetch inquiries initially
    fetchPatawag();

    // Set up a timer to fetch inquiries every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchPatawag, 5 * 60 * 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [to, brgy]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/inquiries/staffinquiries/?label=Staff&archived=false&brgy=${brgy}`
        );

        if (response.status === 200) {
          const inquiries = response.data.result;
          setInquiries(inquiries);

          const residentInquiries = inquiries.filter((inquiry) => {
            const latestResponse =
              inquiry.response[inquiry.response.length - 1];
     
            return (
              latestResponse &&
              latestResponse.type === "Resident" &&
              (inquiry.isApproved === "Pending" ||
                inquiry.isApproved === "In Progress")
            );
          });

          const residentInquiriesLength = residentInquiries.length;
          setResidentInquiriesLength(residentInquiriesLength);
        } else {
          console.error("Error fetching inquiries:", response.error);
        }
      } catch (err) {
        console.error("Uncaught error:", err.message);
      }
    };

    // Fetch inquiries initially
    fetchInquiries();

    // Set up a timer to fetch inquiries every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchInquiries, 5 * 60 * 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [to, brgy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pending requests
        const requestResponse = await fetch(
          `${API_LINK}/requests/getallpending/?isArchived=false&isApproved=Pending&brgy=${brgy}`
        );
        const requestData = await requestResponse.json();

        // Fetch pending events
        const eventResponse = await fetch(
          `${API_LINK}/application/countpendingevents/?isArchived=false&status=Pending&brgy=${brgy}`
        );
        const eventData = await eventResponse.json();

        // Calculate the total count of pending events and requests
        const totalPendingCount =
          requestData.result.length + eventData.result.length;
        setPendingEventsAndApp(totalPendingCount); // Update the count of pending events and requests
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [brgy]);

  useEffect(() => {
    const fetchPendingRequest = async () => {
      try {
        const response = await fetch(
          `${API_LINK}/requests/getallpending/?isArchived=false&isApproved=Pending&brgy=${brgy}`
        );
        const data = await response.json();
        setRequests(data.result);
        setPendingRequestsCount(data.result.length); // Update the count of pending services
      } catch (error) {
        console.error("Error fetching pending services:", error);
      }
    };

    fetchPendingRequest();
  }, []);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const response = await fetch(
          `${API_LINK}/application/countpendingevents/?isArchived=false&status=Pending&brgy=${brgy}`
        );
        const data = await response.json();
        setEvents(data.result);
        setPendingEventsCount(data.result.length);
      } catch (error) {
        console.error("Error fetching pending services:", error);
      }
    };

    fetchPendingEvents();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        const res1 = await axios.get(
          `${API_LINK}/brgyinfo/?brgy=${brgy}&logo=true`
        );

        if (currentPath.includes("/dashboard")) {
          setSelectedOption("dashboard");
        } else if (currentPath.includes("/events_management")) {
          setSelectedOption("events_management");
        } else if (currentPath.includes("/events_registrations")) {
          setSelectedOption("events_registrations");
        } else if (currentPath.includes("/blotters")) {
          setSelectedOption("blotters");
        } else if (currentPath.includes("/inquiries")) {
          setSelectedOption("inquiries");
        } else if (currentPath.includes("/residents")) {
          setSelectedOption("residents");
        } else if (currentPath.includes("/services")) {
          setSelectedOption("services");
        } else if (currentPath.includes("/requests")) {
          setSelectedOption("requests");
        } else if (currentPath.includes("/reports")) {
          setSelectedOption("reports");
        } else if (currentPath.includes("/officials")) {
          setSelectedOption("officials");
        } else if (currentPath.includes("/staff_management")) {
          setSelectedOption("staff_management");
        } else if (currentPath.includes("/info")) {
          setSelectedOption("info");
        } else if (currentPath.includes("/settings")) {
          setSelectedOption("settings");
        }

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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, currentPath, brgy]);

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
  const [hoverStates, setHoverStates] = useState({});

  const handleMouseEnter = (id) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [id]: true,
    }));
  };

  const handleMouseLeave = (id) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [id]: false,
    }));
  };
  return (
    <>
      <div
        id="hs-overlay-basic"
        className="sm:fixed lg:relative overflow-y-auto lg:block lg:end-auto lg:bottom-0 sm:block flex items-center justify-center hs-overlay-basic h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 z-[60] lg:z-0 lg:translate-x-0 w-[17rem]"
      >
        <div
          className="h-screen bg-teal-700 "
          style={{ backgroundColor: information?.theme?.primary }}
        >
          <div className="max-h-screen flex flex-col ">
            <div className='bg-[url("/src/assets/image/bg-sidebar.jpg")] w-full shrink-0 flex flex-col items-center justify-center py-5 px-2 space-y-3 object-cover'>
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
            <div
              className="w-full shrink-0 flex flex-row items-center justify-between px-2 border-0 py-2 border-y-[1px] space-y-3 bg-teal-700"
              style={{
                background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
              }}
            >
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
                      setSelectedOption("dashboard");

                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    style={{
                      background:
                        selectedOption === "dashboard" ||
                        hoverStates["dashboard"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "dashboard" ||
                        hoverStates["dashboard"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("dashboard")}
                    onMouseLeave={() => handleMouseLeave("dashboard")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                  >
                    <BiSolidDashboard size={15} />
                    Dashboard
                    <span className="flex relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600" />
                      {pendingEventsAndApp > 0 && (
                        <span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
                          <text className="mr-[3px]">
                            {" "}
                            {pendingEventsAndApp}{" "}
                          </text>
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    id="hs-events-collapse"
                    data-hs-collapse="#hs-events-collapse-heading"
                    className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                    style={{
                      background: hoverStates["events"]
                        ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                        : null,
                      color:
                        isClicked &&
                        (selectedOption === "events_management" ||
                          selectedOption === "events_registrations")
                          ? `${information?.theme?.hover}`
                          : hoverStates["events"]
                          ? `${information?.theme?.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("events")}
                    onMouseLeave={() => handleMouseLeave("events")}
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
                        setSelectedOption("events_management");
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      style={{
                        background:
                          selectedOption === "events_management" ||
                          hoverStates["events_management"]
                            ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                            : null,
                        color:
                          selectedOption === "events_management" ||
                          hoverStates["events_management"]
                            ? `${information?.theme.hover}`
                            : null,
                      }}
                      onMouseEnter={() => handleMouseEnter("events_management")}
                      onMouseLeave={() => handleMouseLeave("events_management")}
                      className={`flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
                    >
                      <BsCalendar2Event size={15} />
                      Events Management
                    </Link>
                    <Link
                      to={`/events_registrations/?id=${id}&brgy=${brgy}`}
                      onClick={() => {
                        setSelectedOption("events_registrations");
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      style={{
                        background:
                          selectedOption === "events_registrations" ||
                          hoverStates["events_registrations"]
                            ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                            : null,
                        color:
                          selectedOption === "events_registrations" ||
                          hoverStates["events_registrations"]
                            ? `${information?.theme.hover}`
                            : null,
                      }}
                      onMouseEnter={() =>
                        handleMouseEnter("events_registrations")
                      }
                      onMouseLeave={() =>
                        handleMouseLeave("events_registrations")
                      }
                      className={`flex items-center mt-1 gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
                    >
                      <SiGoogleforms size={15} />
                      Events Application
                      <span className="flex relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600" />
                        {pendingEventsCount > 0 && (
                          <span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
                            <text className="mr-[3px]">
                              {" "}
                              {pendingEventsCount}{" "}
                            </text>
                          </span>
                        )}
                      </span>
                    </Link>
                  </div>
                </li>

                <li>
                  <button
                    id="hs-unstyled-collapse"
                    data-hs-collapse="#hs-unstyled-collapse-heading"
                    className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                    style={{
                      background: hoverStates["parent_services"]
                        ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                        : null,
                      color:
                        isClicked &&
                        (selectedOption === "services" ||
                          selectedOption === "requests" ||
                          hoverStates["parent_services"])
                          ? `${information?.theme?.hover}`
                          : hoverStates["parent_services"]
                          ? `${information?.theme?.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("parent_services")}
                    onMouseLeave={() => handleMouseLeave("parent_services")}
                    onClick={handleCollapseToggle}
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
                        setSelectedOption("services");
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      style={{
                        background:
                          selectedOption === "services" ||
                          hoverStates["services"]
                            ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                            : null,
                        color:
                          selectedOption === "services" ||
                          hoverStates["services"]
                            ? `${information?.theme.hover}`
                            : null,
                      }}
                      onMouseEnter={() => handleMouseEnter("services")}
                      onMouseLeave={() => handleMouseLeave("services")}
                      className={`flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
                    >
                      <FaServicestack size={15} />
                      Manage Services
                    </Link>

                    <Link
                      to={`/requests/?id=${id}&brgy=${brgy}`}
                      onClick={() => {
                        setSelectedOption("requests");
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      style={{
                        background:
                          selectedOption === "requests" ||
                          hoverStates["requests"]
                            ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                            : null,
                        color:
                          selectedOption === "requests" ||
                          hoverStates["requests"]
                            ? `${information?.theme.hover}`
                            : null,
                      }}
                      onMouseEnter={() => handleMouseEnter("requests")}
                      onMouseLeave={() => handleMouseLeave("requests")}
                      className={`flex items-center mt-1 gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
                    >
                      <GoGitPullRequest size={15} />
                      Service Requests
                      <span className="flex relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600" />
                        {pendingRequestsCount > 0 && (
                          <span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
                            <text className="mr-[2 px]">
                              {" "}
                              {pendingRequestsCount}{" "}
                            </text>
                          </span>
                        )}
                      </span>
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
                    style={{
                      background:
                        selectedOption === "inquiries" ||
                        hoverStates["inquiries"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "inquiries" ||
                        hoverStates["inquiries"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("inquiries")}
                    onMouseLeave={() => handleMouseLeave("inquiries")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                  >
                    <FaRegNoteSticky size={15} />
                    Inquiries
                    <span className="flex relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600" />
                      {residentResponseCount > 0 && (
                        <span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
                          {residentResponseCount}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/blotters/?id=${id}&brgy=${brgy}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    style={{
                      background:
                        selectedOption === "blotters" || hoverStates["blotters"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "blotters" || hoverStates["blotters"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("blotters")}
                    onMouseLeave={() => handleMouseLeave("blotters")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                  >
                    <GoLaw size={15} />
                    PATAWAG (BLOTTERS)
                    <span className="flex relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600" />
                      {residentBlotterResponseCount > 0 && (
                        <span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
                          {residentBlotterResponseCount}
                        </span>
                      )}
                    </span>
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
                    style={{
                      background:
                        selectedOption === "residents" ||
                        hoverStates["residents"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "residents" ||
                        hoverStates["residents"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("residents")}
                    onMouseLeave={() => handleMouseLeave("residents")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                  >
                    <BsPeopleFill size={15} />
                    Residents
                  </Link>
                </li>

                {userData.type === "Brgy Admin" ? (
                  <li>
                    <button
                      id="hs-unstyled-collapse"
                      data-hs-collapse="#hs-info-collapse-heading"
                      className={`hs-collapse-toggle justify-between flex items-center w-full gap-x-3 py-2 px-2.5 text-sm rounded-md `}
                      style={{
                        background: hoverStates["information"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                        color:
                          isClicked &&
                          (selectedOption === "reports" ||
                            selectedOption === "officials" ||
                            selectedOption === "staff_management" ||
                            selectedOption === "info" ||
                            hoverStates["information"])
                            ? `${information?.theme?.hover}`
                            : hoverStates["information"]
                            ? `${information?.theme?.hover}`
                            : null,
                      }}
                      onMouseEnter={() => handleMouseEnter("information")}
                      onMouseLeave={() => handleMouseLeave("information")}
                      onClick={handleCollapseToggle}
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
                        style={{
                          background:
                            selectedOption === "reports" ||
                            hoverStates["reports"]
                              ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                              : null,
                          color:
                            selectedOption === "reports" ||
                            hoverStates["reports"]
                              ? `${information?.theme.hover}`
                              : null,
                        }}
                        onMouseEnter={() => handleMouseEnter("reports")}
                        onMouseLeave={() => handleMouseLeave("reports")}
                        className={`flex items-center gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
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
                        style={{
                          background:
                            selectedOption === "officials" ||
                            hoverStates["officials"]
                              ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                              : null,
                          color:
                            selectedOption === "officials" ||
                            hoverStates["officials"]
                              ? `${information?.theme.hover}`
                              : null,
                        }}
                        onMouseEnter={() => handleMouseEnter("officials")}
                        onMouseLeave={() => handleMouseLeave("officials")}
                        className={`flex items-center mt-1 gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
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
                        style={{
                          background:
                            selectedOption === "staff_management" ||
                            hoverStates["staff_management"]
                              ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                              : null,
                          color:
                            selectedOption === "staff_management" ||
                            hoverStates["staff_management"]
                              ? `${information?.theme.hover}`
                              : null,
                        }}
                        onMouseEnter={() =>
                          handleMouseEnter("staff_management")
                        }
                        onMouseLeave={() =>
                          handleMouseLeave("staff_management")
                        }
                        className={`flex items-center mt-1 gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
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
                        style={{
                          background:
                            selectedOption === "info" || hoverStates["info"]
                              ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                              : null,
                          color:
                            selectedOption === "info" || hoverStates["info"]
                              ? `${information?.theme.hover}`
                              : null,
                        }}
                        onMouseEnter={() => handleMouseEnter("info")}
                        onMouseLeave={() => handleMouseLeave("info")}
                        className={`flex items-center mt-1 gap-x-3 py-2 px-2.5 ml-3 text-sm rounded-md `}
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
                    style={{
                      background:
                        selectedOption === "settings" || hoverStates["settings"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "settings" || hoverStates["settings"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("settings")}
                    onMouseLeave={() => handleMouseLeave("settings")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
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
                    style={{
                      background:
                        selectedOption === "/" || hoverStates["/"]
                          ? `linear-gradient(to right, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`
                          : null,
                      color:
                        selectedOption === "/" || hoverStates["/"]
                          ? `${information?.theme.hover}`
                          : null,
                    }}
                    onMouseEnter={() => handleMouseEnter("/")}
                    onMouseLeave={() => handleMouseLeave("/")}
                    className={`flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md `}
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
