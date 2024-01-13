import React from "react";
import { useState, useEffect } from "react";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";
import ReactPaginate from "react-paginate";
import ViewArchivedServiceModal from "../components/archivedServices/ViewArchivedServiceModal";
import ArchivedServicesReportsModal from "../components/archivedServices/ArchivedServicesReportsModal";
import RestoreServicesModal from "../components/archivedServices/RestoreServicesModal";
import Breadcrumbs from "../components/archivedServices/Breadcrumbs";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

const ArchivedServices = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [services, setServices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [service, setService] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = services.slice().sort((a, b) => {
      if (sortBy === "service_id") {
        return newSortOrder === "asc"
          ? a.service_id.localeCompare(b.service_id)
          : b.service_id.localeCompare(a.service_id);
      } else if (sortBy === "name") {
        return newSortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "isApproved") {
        const order = { Registered: 1, Pending: 2, Disapproved: 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setServices(sortedData);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/services/?brgy=${brgy}&archived=true&status=${statusFilter}&type=${serviceFilter}&page=${currentPage}`
      );
      if (response.status === 200) {
        setServices(response.data.result);
        setPageCount(response.data.pageCount);
      }
      else setServices([]);
    };

    fetch();
  }, [brgy, statusFilter, serviceFilter, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusFilter = (selectedStatus) => {
    setStatusFilter(selectedStatus);
  };
  const handleServiceFilter = (selectedStatus) => {
    setServiceFilter(selectedStatus);
  };
  const handleResetFilter = () => {
    setStatusFilter("all");
    setServiceFilter("all");
    setDateFilter(null);
    setSearchQuery("");
  };
  
  const Services = services.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    const servicesToCheck = Services.length > 0 ? Services : services;

    if (servicesToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = servicesToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "SERVICE_ID",
    "SERVICE NAME",
    "DETAILS",
    "TYPE OF SERVICE",
    "FEES",
    "STATUS",
    "ACTIONS",
  ];

  useEffect(() => {
    document.title = "Archived Services | Barangay E-Services Management";
  }, []);

  const handleView = (item) => {
    setService(item);
  };

  return (
    <div className="mx-4 mt-8">
      <Breadcrumbs />
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-row lg:mt-5 sm:flex-col-reverse lg:flex-row w-full">
          <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#4b7c80] to-[#21556d] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-2xl xxxl:text-3xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED SERVICES
            </h1>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
        <div className="sm:flex-col-reverse lg:flex-row flex justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-2 md:mt-2 lg:mt-0 md:space-y-2 lg:space-y-0">
              {/* <span className="font-medium text-[#292929]  justify-center flex text-center my-auto mx-2">
                SORT BY:{" "}
              </span> */}

              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#21556d] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  STATUS
                  <svg
                    className={`hs-dropdown-open:rotate-${
                      sortOrder === "asc" ? "180" : "0"
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
                <ul
                  className="bg-[#21556d] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#ffffff] my-1" />
                  <a
                    onClick={() => handleStatusFilter("Pending")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    PENDING
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Approved")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    APPROVED
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Disapproved")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    DISAPPROVED
                  </a>
                </ul>
              </div>

              {/* Service Type Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#21556d] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  SERVICE TYPE
                  <svg
                    className={`hs-dropdown-open:rotate-${
                      sortOrder === "asc" ? "180" : "0"
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
                <ul
                  className="bg-[#21556d] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#ffffff] my-1" />
                  <a
                    onClick={() => handleServiceFilter("Healthcare")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    HEALTHCARE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Education")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    EDUCATION
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Social Welfare")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SOCIAL WELFARE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Security and Safety")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SECURITY AND SAFETY
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Infrastructure")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    INFRASTRUCTURE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Community")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    COMMUNITY
                  </a>
                  <a
                   onClick={() => handleServiceFilter("Administrative")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    ADMINISTRATIVE
                  </a>
                  <a
                   onClick={() => handleServiceFilter("Environmental")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    ENVIRONMENTAL
                  </a>
                </ul>
              </div>
            </div>
            
            <div className="sm:flex-col md:flex-row flex sm:w-full lg:w-7/12">
              <div className="flex flex-row w-full md:mr-2">
                <button className=" bg-[#21556d] p-3 rounded-l-md">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="sm:mt-2 md:mt-0 flex w-full lg:w-64 items-center justify-center">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-restore-services-modal"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-[#21556d] font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <MdRestartAlt size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Restore Selected Services
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_320px)] xxxl:h-[calc(100vh_-_340px)]">
          <table className="relative table-auto w-full ">
            <thead className="bg-[#21556d] sticky top-0">
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
              {Services.map((item, index) => (
                <tr key={index} className="odd:bg-slate-100 text-center">
                  <td className="px-6 py-3">
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
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                      {item.service_id}
                    </span>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                        {item.details}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {item.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        PHP {item.fee}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-4/12">
                    {item.isApproved === "Approved" && (
                      <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                          APPROVED
                        </span>
                      </div>
                    )}
                    {item.isApproved === "Disapproved" && (
                      <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                        <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                          DISAPPROVED
                        </span>
                      </div>
                    )}
                    {item.isApproved === "Pending" && (
                      <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                        <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                          PENDING
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-2 xl:px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                    <div className="hs-tooltip inline-block">
                      <button
                        type="button"
                        onClick={() => handleView({ ...item })}
                        data-hs-overlay="#hs-view-archived-service-modal"
                        className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                      >
                        <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
                      </button>
                      <span
                          className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                          role="tooltip"
                        >
                          View Service
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:py-4 md:px-4 bg-[#21556d] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
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
            disabledLinkClassName="text-gray-300"
            renderOnZeroPageCount={null}
          />
        </div>
      <RestoreServicesModal selectedItems={selectedItems} />
      <ViewArchivedServiceModal service={service} setService={setService} />
      <ArchivedServicesReportsModal />
    </div>
  );
};

export default ArchivedServices;
