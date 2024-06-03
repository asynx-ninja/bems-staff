import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStop, AiOutlineEye } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import ArchiveModal from "../components/inquiries/ArchiveInquiryModal";
import Status from "../components/inquiries/Status";
import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";
import ViewInquiriesModal from "../components/inquiries/ViewInquiriesModal";
import noData from "../assets/image/no-data.png";
import GetBrgy from "../components/GETBrgy/getbrgy";
import { io } from "socket.io-client";
import Socket_link from "../config/Socket";
const socket = io(Socket_link);

const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState({
    compose: { file: [] },
    response: [{ file: [] }],
  });
  const information = GetBrgy(brgy);
  const chatContainerRef = useRef();

  //status filtering
  const [status, setStatus] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");

  //query
  const [searchQuery, setSearchQuery] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  //date filtering
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [selected, setSelected] = useState("date");
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const isLatestResponseResident = (inquiry) => {
    const { response, isApproved } = inquiry;
    if (response && response.length > 0) {
      const latestResponse = response[response.length - 1];
      return (
        latestResponse.type === "Resident" &&
        !["Completed"].includes(isApproved)
      );
    }
    return false;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";

    const fetchInquiries = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/staffinquiries/?id=${id}&brgy=${brgy}&archived=false&status=${statusFilter}&label=Staff`
      );

      if (response.status === 200) {
        setInquiries(response.data.result); // Set initial page data
        setFilteredInquiries(response.data.result.slice(0, 10));
        setPageCount(response.data.pageCount); // Calculate page count based on all data
      } else {
        setInquiries([]);
        setFilteredInquiries([]);
      }
      // const container = inqContainerRef.current;
      // container.scrollTop = container.scrollHeight;
      // setInqsUpdate((prevState) => !prevState);
    };

    fetchInquiries();
  }, [id, brgy, statusFilter]);

  useEffect(() => {
    const handleStaffInq = (obj) => {
      setInquiry(obj);
      setFilteredInquiries(
        prev => [obj, ...prev]
      );
    };

    const handleReStaffInq = (obj) => {
      setInquiry(obj);
      setFilteredInquiries((curItem) =>
        curItem.map((item) =>
          item._id === obj._id ? obj : item
        )
      );
    };

    const handleEventArchive = (obj) => {
      setInquiry(obj);
      setInquiries((prev) => prev.filter(item => item._id !== obj._id));
      setFilteredInquiries((prev) => prev.filter(item => item._id !== obj._id));
    };

    socket.on("receive-reply-staff-inquiry", handleReStaffInq);
    socket.on("receive-staff-inquiry", handleStaffInq);
    socket.on("receive-archive-staff", handleEventArchive);

    return () => {
      socket.off("receive-reply-staff-inquiry", handleReStaffInq);
      socket.off("receive-staff-inquiry", handleStaffInq);
      socket.off("receive-archive-staff", handleEventArchive);
    };
  }, [socket, setInquiry, setInquiries]);

  useEffect(() => {
    const filteredData = inquiries.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inq_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    setFilteredInquiries(filteredData.slice(startIndex, endIndex));
    setPageCount(Math.ceil(filteredData.length / 10));
  }, [inquiries, searchQuery, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  const checkAllHandler = () => {
    const inquiriesToCheck = Inquiries.length > 0 ? Inquiries : inquiries;

    if (inquiriesToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = inquiriesToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "inquiry #",
    "name",
    "message",
    "date",
    "status",
    "actions",
  ];

  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
  };

  const TimeFormat = (date) => {
    if (!date) return "";

    const formattedTime = moment(date).format("hh:mm A");
    return formattedTime;
  };

  const handleView = (item) => {
    setInquiry(item);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleResetFilter = () => {
    setStatusFilter("all");
    setSearchQuery("");
    setFilteredInquiries();
  };

  const filters = (choice, selectedDate) => {
    switch (choice) {
      case "date":
        return inquiries.filter((item) => {
          return (
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear() &&
            new Date(item.compose.date).getMonth() ===
            selectedDate.getMonth() &&
            new Date(item.compose.date).getDate() === selectedDate.getDate()
          );
        });

      case "week":
        const startDate = selectedDate;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            startDate.getFullYear() &&
            new Date(item.compose.date).getMonth() === startDate.getMonth() &&
            new Date(item.compose.date).getDate() >= startDate.getDate() &&
            new Date(item.compose.date).getDate() <= endDate.getDate()
        );
      case "month":
        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear() &&
            new Date(item.compose.date).getMonth() === selectedDate.getMonth()
        );
      case "year":
        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear()
        );
    }
  };

  const onSelect = (e) => {
    setSelected(e.target.value);
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeWeek = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeMonth = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeYear = (e) => {
    if (e.target.value === "") {
      setFilteredInquiries(inquiries);
    } else {
      const date = new Date(e.target.value, 0, 1);
      setSpecifiedDate(date);
      setFilteredInquiries(filters(selected, date));
    }
  };

  return (
    <div className="mx-4 ">
      <div>
        <div className="flex flex-row mt-5 sm:flex-col-reverse lg:flex-row w-full">
          <div
            className="sm:mt-5 md:mt-4 lg:mt-0 bg-teal-700 py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]"
            style={{
              background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
            }}
          >
            <h1
              className="text-center sm:text-[15px] mx-auto font-bold md:text-xl lg:text-[1.2rem] xl:text-[26px] xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              INQUIRIES
            </h1>
          </div>
          <div className="lg:w-3/5 flex flex-row justify-end items-center ">
            <div className="sm:w-full md:w-full lg:w-2/5 flex sm:flex-col md:flex-row md:justify-center md:items-center sm:space-y-2 md:space-y-0 md:space-x-2 ">
              <div className="w-full rounded-lg ">
                <Link to={`/archivedinquiries/?id=${id}&brgy=${brgy}`}>
                  <div className="hs-tooltip inline-block w-full">
                    <button
                      type="button"
                      className="hs-tooltip-toggle justify-center bg-teal-700 sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg  w-full text-white font-medium text-sm text-center inline-flex items-center"
                      style={{
                        background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                      }}
                    >
                      <FaArchive size={24} style={{ color: "#ffffff" }} />
                      <span className="sm:block md:hidden sm:pl-5">
                        Archived Inquiries
                      </span>
                      <span
                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                        role="tooltip"
                      >
                        Archived Inquiries
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
          <div className="sm:flex-col-reverse md:flex-row flex justify-between w-full">
            <div className="flex space-x-2">
              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  bg-teal-700"
                  style={{ backgroundColor: information?.theme?.primary }}
                >
                  STATUS
                  <svg
                    className={`hs-dropdown w-2.5 h-2.5 text-white`}
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
                </button>
                <ul
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-2 text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 hover:rounded-[12px] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#4e4e4e] my-1" />
                  <a
                    onClick={() => handleStatusFilter("Submitted")}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    Submitted
                  </a>
                  <a
                    onClick={() => handleStatusFilter("In Progress")}
                    className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    IN PROGRESS
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Resolved")}
                    className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    Resolved
                  </a>
                </ul>
              </div>

              {/* Date Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  bg-teal-700"
                  style={{ backgroundColor: information?.theme?.primary }}
                >
                  DATE
                  <svg
                    className={`hs-dropdown w-2.5 h-2.5 text-white`}
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
                </button>
                <ul
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-2 text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 hover:rounded-[12px] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#4e4e4e] my-1" />
                  <div className="hs-dropdown relative inline-flex flex-col w-full space-y-1 my-2 px-2">
                    <label className="text-black font-medium mb-1">
                      DATE RANGE
                    </label>
                    <div className="flex flex-col gap-2">
                      <select
                        className="bg-[#f8f8f8] text-gray-600 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                        onChange={onSelect}
                        defaultValue={selected}
                      >
                        <option value="date">Specific Date</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                      {selected === "date" && (
                        <input
                          className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                          type="date"
                          id="date"
                          name="date"
                          onChange={onChangeDate}
                        />
                      )}
                      {selected === "week" && (
                        <input
                          className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                          type="week"
                          id="week"
                          name="week"
                          onChange={onChangeWeek}
                        />
                      )}
                      {selected === "month" && (
                        <input
                          className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                          type="month"
                          id="month"
                          name="month"
                          onChange={onChangeMonth}
                        />
                      )}
                      {selected === "year" && (
                        <input
                          className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black w-full"
                          type="number"
                          id="year"
                          name="year"
                          placeholder="YEAR"
                          onChange={onChangeYear}
                          min={1990}
                          max={new Date().getFullYear() + 10}
                        />
                      )}
                    </div>
                  </div>
                </ul>
              </div>
            </div>

            <div className="sm:flex-col md:flex-row flex sm:w-full md:w-7/12">
              <div className="flex flex-row w-full md:mr-2">
                <button
                  className="bg-teal-700  p-3 rounded-l-md"
                  style={{ backgroundColor: information?.theme?.primary }}
                >
                  <div className="w-full overflow-hidden">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </button>
                <label
                  htmlFor="hs-table-with-pagination-search"
                  className="sr-only"
                >
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="sm:px-3 sm:py-1 md:px-3 md:py-1 block w-full text-black border-gray-200 rounded-r-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search for items"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="sm:mt-2 md:mt-0 flex w-64 items-center justify-center">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-archiveInquiry"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <AiOutlineStop size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Archived Selected Inquiries
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_280px)] xxxl:h-[calc(100vh_-_300px)]">
          <table className="relative table-auto w-full">
            <thead
              className="bg-teal-700 sticky top-0"
              style={{ backgroundColor: information?.theme?.primary }}
            >
              <tr className="">
                <th scope="col" className="px-6 py-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      name=""
                      onClick={checkAllHandler}
                      id=""
                    />
                  </div>
                </th>
                {tableHeader.map((item, idx) => (
                  <th
                    scope="col"
                    key={idx}
                    className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="odd:bg-slate-100">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((item, index) => (
                  <tr key={index} className="odd:bg-slate-100 text-center">
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          value={item._id}
                          onChange={checkboxHandler}
                          id=""
                        />
                      </div>
                    </td>
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                          {item.inq_id}
                        </span>
                      </div>
                    </td>
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 xl:px-6 py-3 xl:w-1/4">
                      <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                        {item.compose.message}
                      </span>
                    </td>
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                          {moment(item.createdAt).format("MMMM DD, YYYY")} -{" "}
                          {TimeFormat(item.createdAt) || ""}
                        </span>
                      </div>
                    </td>

                    <td className="xl:px-6 py-3 xxl:w-2/12">
                      <div className="flex justify-center items-center">
                        {item.isApproved === "Completed" && (
                          <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-white p-3 xl:mx-5">
                              COMPLETED
                            </span>
                          </div>
                        )}
                        {item.isApproved === "Pending" && (
                          <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-white p-3 xl:mx-5">
                              PENDING
                            </span>
                          </div>
                        )}
                        {item.isApproved === "In Progress" && (
                          <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-white p-3 xl:mx-5">
                              IN PROGRESS
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center space-x-1 sm:space-x-none">
                        <div className="hs-tooltip inline-block">
                          {isLatestResponseResident(item) && (
                            <span className="tooltip absolute right-[2.3rem] top-[3.6rem] z-10">
                              <span className="animate-ping absolute inline-flex h-3 w-3 mt-1 rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
                              <span className="relative inline-flex rounded-full bg-red-500 text-white h-3 w-3"></span>
                              {showTooltip && (
                                <span className="tooltiptext bg-red-500 text-white text-xs py-1 px-2 rounded absolute -left-full top-1/2 transform -translate-y-1/2 -translate-x-full whitespace-nowrap">
                                  You have a new reply
                                </span>
                              )}
                            </span>
                          )}
                          <button
                            type="button"
                            data-hs-overlay="#hs-modal-viewInquiries"
                            onClick={() => handleView({ ...item })}
                            className="hs-tooltip-toggle text-white bg-teal-800  font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                          >
                            <AiOutlineEye
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </button>

                          <span
                            className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                            role="tooltip"
                          >
                            View Inquiry
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeader.length + 1}
                    className="text-center sm:h-[18.7rem] xl:py-1 lg:h-[20rem] xxl:py-32 xl:h-[20rem]"
                  >
                    <img
                      src={noData}
                      alt=""
                      className=" w-[150px] h-[100px] md:w-[270px] md:h-[200px] lg:w-[250px] lg:h-[180px] xl:h-[15rem] xl:w-80 mx-auto"
                    />
                    <strong className="text-[#535353]">NO DATA FOUND</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          className="md:py-4 md:px-4 bg-teal-700 flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3"
          style={{ backgroundColor: information?.theme?.primary }}
        >
          <span className="font-medium text-white sm:text-xs text-sm">
            Showing {currentPage + 1} out of {pageCount} pages
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<<"
            className="flex space-x-3 text-white font-bold"
            activeClassName="text-yellow-500"
            disabledLinkClassName="text-gray-400"
            renderOnZeroPageCount={null}
          />
        </div>
        <ArchiveModal selectedItems={selectedItems} socket={socket}/>
        <ViewInquiriesModal
          inquiry={inquiry}
          setInquiry={setInquiry}
          brgy={brgy}
          chatContainerRef={chatContainerRef}
          socket={socket}
        />
        <Status status={status} setStatus={setStatus} />
      </div>
    </div>
  );
};

export default Inquiries;