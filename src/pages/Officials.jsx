import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineStop, AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaArchive, FaPlus } from "react-icons/fa";
import CreateOfficialModal from "../components/officials/CreateOfficialModal";
import GenerateReportsModal from "../components/officials/GenerateReportsModal";
import ArchiveOfficialModal from "../components/officials/ArchiveOfficialModal";
import EditOfficialModal from "../components/officials/ManageOfficialModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import noData from "../assets/image/no-data.png";
import BALITE from "../assets/officials/BALITE.png";
import BURGOS from "../assets/officials/BURGOS.png";
import GERONIMO from "../assets/officials/GERONIMO.png";
import MACABUD from "../assets/officials/MACABUD.png";
import MANGGAHAN from "../assets/officials/MANGGAHAN.png";
import MASCAP from "../assets/officials/MASCAP.png";
import PURAY from "../assets/officials/PURAY.png";
import ROSARIO from "../assets/officials/ROSARIO.png";
import SAN_ISIDRO from "../assets/officials/SAN_ISIDRO.png";
import SAN_JOSE from "../assets/officials/SAN_JOSE.png";
import SAN_RAFAEL from "../assets/officials/SAN_RAFAEL.png";
import GetBrgy from "../components/GETBrgy/getbrgy";
import { io } from "socket.io-client";
import Socket_link from "../config/Socket";

const socket = io(Socket_link);

const Officials = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [officials, setOfficials] = useState([]);
  const[newOfficial, setNewOfficials] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [selectedOfficial, setSelectedOfficial] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [positionFilter, setPositionFilter] = useState("all");
  const [filterOfficials, setfilterOfficials] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const information = GetBrgy(brgy);
  const returnLogo = () => {
    switch (brgy) {
      case "BALITE":
        return BALITE;

      case "BURGOS":
        return BURGOS;

      case "GERONIMO":
        return GERONIMO;

      case "MACABUD":
        return MACABUD;

      case "MANGGAHAN":
        return MANGGAHAN;

      case "MASCAP":
        return MASCAP;

      case "PURAY":
        return PURAY;

      case "ROSARIO":
        return ROSARIO;

      case "SAN ISIDRO":
        return SAN_ISIDRO;

      case "SAN JOSE":
        return SAN_JOSE;

      case "SAN RAFAEL":
        return SAN_RAFAEL;
    }
  };



  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = officials.slice().sort((a, b) => {
      if (sortBy === "lastName") {
        return newSortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      } else if (sortBy === "rendered_service") {
        const dateA = new Date(a.fromYear);
        const dateB = new Date(b.fromYear);

        return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    setOfficials(sortedData);
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
    const officialsToCheck = officials.length > 0 ? officials : officials;

    if (officialsToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = officialsToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  // useEffect(() => {
  //   const handleOfficial = (obj) => {
  //     setOfficials(obj);
  //     setNewOfficials((prev) => [obj, ...prev]);
  //     setfilterOfficials((prev) => [obj, ...prev]);
  //   };

  //   const handleOfficialUpdate = (get_updated_official) => {
  //     setOfficials(get_updated_official);
  //     setfilterOfficials((curItem) =>
  //       curItem.map((item) =>
  //         item._id === get_updated_official._id ? get_updated_official : item
  //       )
  //     );
  //   };

  //   const handleEventArchive = (obj) => {
  //     setOfficials(obj);
  //     setNewOfficials((prev) => prev.filter(item => item._id !== obj._id));
  //     setfilterOfficials((prev) => prev.filter(item => item._id !== obj._id));
  //   };

  //   socket.on("receive-create-official", handleOfficial);
  //   socket.on("receive-update-official", handleOfficialUpdate);
  //   socket.on("receive-archive-staff", handleEventArchive);

  //   return () => {
  //     socket.off("receive-create-official", handleOfficial);
  //     socket.off("receive-update-official", handleOfficialUpdate);
  //     socket.on("receive-archive-staff", handleEventArchive);
  //   };
  // }, [socket, setNewOfficials, setOfficials]);

  // useEffect(() => {
  //   document.title = "Barangay Officials | Barangay E-Services Management";

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_LINK}/brgyofficial/?brgy=${brgy}&archived=false&position=${positionFilter}`
  //       );

  //       if (response.status === 200) {
  //         const officialsData = response.data.result || [];

  //         if (officialsData.length > 0) {
  //           setPageCount(response.data.pageCount);
  //           setOfficials(officialsData);
  //           setNewOfficials(officialsData)
  //           setfilterOfficials(response.data.result.slice(0, 10))
  //         } else {
  //           setOfficials([]);
  //         }
  //       } else {
  //         setOfficials([]);
  //         console.error("Failed to fetch officials:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setOfficials([]);
  //     }
  //   };

  //   fetchData();
  // }, [brgy, positionFilter]); // Add positionFilter dependency

  // const handlePositionFilter = (selectedPosition) => {
  //   setPositionFilter(selectedPosition);
  // };

  // useEffect(() => {
  //   const filteredData = newOfficial.filter((item) => {
  //     const fullName = item.lastName.toLowerCase() +
  //       ", " +
  //       item.firstName.toLowerCase() +
  //       (item.middleName !== undefined ? " " + item.middleName.toLowerCase() : "");

  //     return (
  //       fullName.includes(searchQuery.toLowerCase())
  //     );
  //   });

  //   const startIndex = currentPage * 10;
  //   const endIndex = startIndex + 10;
  //   setfilterOfficials(filteredData.slice(startIndex, endIndex));
  //   setPageCount(Math.ceil(filteredData.length / 10));
  // }, [newOfficial, searchQuery, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };



  const handleEditClick = async (official) => {
    setSelectedOfficial(official);
  };

  const tableHeader = [
    "IMAGE",
    "NAME",
    "POSITION",
    "RENDERED SERVICE",
    "ACTIONS",
  ];

  const dateFormat = (fromYear, toYear) => {
    const startDate = fromYear ? new Date(fromYear) : null;
    const endDate = toYear ? new Date(toYear) : null;

    const startYearMonth = startDate
      ? `${startDate.toLocaleString("default", {
        month: "short",
      })} ${startDate.getFullYear()}`
      : "";
    const endYearMonth = endDate
      ? `${endDate.toLocaleString("default", {
        month: "short",
      })} ${endDate.getFullYear()}`
      : "";

    return `${startYearMonth} ${endYearMonth}`;
  };

  const handleResetFilter = () => {
    setPositionFilter("all");
  };

  return (
    <div className="mx-4">
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-row mt-5 sm:flex-col-reverse lg:flex-row w-full">
          <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-teal-700 py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem] bg-teal-700 w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]" style={{
            background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
          }}>
            <h1
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-2xl xxxl:text-3xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              BARANGAY OFFICIALS
            </h1>
          </div>
          <div className="lg:w-3/5 flex flex-row justify-end items-center ">
            <div className="sm:w-full md:w-full lg:w-2/5 flex sm:flex-col md:flex-row md:justify-center md:items-center sm:space-y-2 md:space-y-0 md:space-x-2 ">
              <div className="w-full rounded-lg flex justify-center">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-create-official-modal"
                    className="hs-tooltip-toggle justify-center bg-teal-700 sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg  w-full text-white font-medium text-sm  text-center inline-flex items-center " style={{
                      background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                    }}
                  >
                    <FaPlus size={24} style={{ color: "#ffffff" }} />
                    <span className="sm:block md:hidden sm:pl-5">
                      Add Official
                    </span>
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Add Official
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full rounded-lg ">
                <Link
                  to={`/archived_officials/?id=${id}&brgy=${brgy}&archived=true`}
                >
                  <div className="hs-tooltip inline-block w-full">
                    <button
                      type="button"
                      data-hs-overlay="#hs-modal-add"
                      className="hs-tooltip-toggle justify-center bg-teal-700 sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg  w-full text-white font-medium text-sm text-center inline-flex items-center" style={{
                        background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                      }}
                    >
                      <FaArchive size={24} style={{ color: "#ffffff" }} />
                      <span className="sm:block md:hidden sm:pl-5">
                        Archived Officials
                      </span>
                      <span
                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                        role="tooltip"
                      >
                        Archived Officials
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
          <div className="sm:flex-col-reverse lg:flex-row flex justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-2 md:mt-2 lg:mt-0 md:space-y-2 lg:space-y-0">
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  bg-teal-700" style={{ backgroundColor: information?.theme?.primary }}
                >
                  POSITION
                  <svg
                    className={`hs-dropdown-open:rotate-${sortOrder === "asc" ? "180" : "0"
                      } w-2.5 h-2.5 text-white`}
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
                {/* <ul
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
                    onClick={() => handlePositionFilter("Barangay Chairman")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    BARANGAY CHAIRMAN
                  </a>
                  <a
                    onClick={() => handlePositionFilter("Barangay Kagawad")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    BARANGAY KAGAWAD
                  </a>
                  <a
                    onClick={() => handlePositionFilter("Secretary")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SECRETARY
                  </a>
                  <a
                    onClick={() => handlePositionFilter("Assistant Secretary")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    ASSISTANT SECRETARY
                  </a>
                  <a
                    onClick={() => handlePositionFilter("Treasurer")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    TREASURER
                  </a>
                  <a
                    onClick={() => handlePositionFilter("SK Chairman")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SK CHAIRMAN
                  </a>
                  <a
                    onClick={() => handlePositionFilter("SK Kagawad")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SK KAGAWAD
                  </a>
                  <a
                    onClick={() => handlePositionFilter("SK Secretary")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SK Secretary
                  </a>
                  <a
                    onClick={() => handlePositionFilter("SK Treasurer")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SK TREASURER
                  </a>
                </ul> */}
              </div>
            </div>

            <div className="sm:flex-col md:flex-row flex sm:w-full lg:w-7/12">
              <div className="flex flex-row w-full md:mr-2">
                <button className="bg-teal-700  p-3 rounded-l-md" style={{ backgroundColor: information?.theme?.primary }}>
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
              <div className="sm:mt-2 md:mt-0 flex w-full lg:w-64 items-center justify-center space-x-2">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-archive-official-modal"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <AiOutlineStop size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Archive Selected Officials
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_280px)] xxxl:h-[calc(100vh_-_300px)]">
          <table className="relative table-auto w-full">
            <thead className="bg-teal-700 sticky top-0" style={{ backgroundColor: information?.theme?.primary }}>
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
              {filterOfficials.length > 0 ? (
                filterOfficials.map((item, index) => (
                  <tr key={index} className="odd:bg-slate-100 text-center">
                    <td className="px-6 py-3">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          value={item._id}
                          onChange={checkboxHandler}
                        />
                      </div>
                    </td>
                    <td className="xl:px-6 xl:py-3">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        <div className="py-2 xl:px-6 xl:py-2">
                          <img
                            src={item.picture.link || returnLogo()}
                            alt=""
                            className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] xl:h-28 xl:w-28 bg-cover rounded-full mx-auto border-[5px] object-cover bg-teal-700" style={{ borderColor: information?.theme?.primary }}
                          />
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2 uppercase">
                          {item.lastName +
                            ", " +
                            item.firstName +
                            " " +
                            item.middleName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                          {item.position}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                          {dateFormat(item.fromYear) || ""} -{" "}
                          {dateFormat(item.toYear) || ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center space-x-1 sm:space-x-none">
                        <div className="hs-tooltip inline-block w-full">
                          <button
                            type="button"
                            data-hs-overlay="#hs-edit-official-modal"
                            className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                            onClick={() => handleEditClick(item)}
                          >
                            <FiEdit size={24} style={{ color: "#ffffff" }} />
                            <span
                              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                              role="tooltip"
                            >
                              View Official
                            </span>
                          </button>
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
                      className=" w-[150px] h-[100px] md:w-[270px] md:h-[200px] lg:w-[250px] lg:h-[180px] xl:h-[14rem] xl:w-80 mx-auto"
                    />
                    <strong className="text-[#535353]">NO DATA FOUND</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:py-4 md:px-4  flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3 bg-teal-700" style={{ backgroundColor: information?.theme?.primary }}>
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
      <CreateOfficialModal brgy={brgy} socket={socket} id ={id}/>
      <GenerateReportsModal />
      <ArchiveOfficialModal selectedItems={selectedItems} socket={socket} id={id}/>
      <EditOfficialModal
        selectedOfficial={selectedOfficial}
        setSelectedOfficial={setSelectedOfficial}
        brgy={brgy}
        socket={socket}
        id={id}
      />
    </div>
  );
};

export default Officials;
