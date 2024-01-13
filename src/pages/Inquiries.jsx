import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStop, AiOutlineEye } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsPrinter } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import ArchiveModal from "../components/inquiries/ArchiveInquiryModal";
import Status from "../components/inquiries/Status";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";
import ViewInquiriesModal from "../components/inquiries/ViewInquiriesModal";

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
  const [status, setStatus] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(null);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateType, setDateType] = useState("specific");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = inquiries.slice().sort((a, b) => {
      if (sortBy === "inquiries_id") {
        return newSortOrder === "asc"
          ? a.inquiries_id.localeCompare(b.inquiries_id)
          : b.inquiries_id.localeCompare(a.inquiries_id);
      } else if (sortBy === "isApproved") {
        const order = { Completed: 1, Pending: 2, "In Progress": 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setInquiries(sortedData);
  };

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";

    const fetchInquiries = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/?id=${id}&brgy=${brgy}&archived=false&status=${statusFilter}&date=${dateFilter}&page=${currentPage}`
      );
      console.log("API URL:");

      if (response.status === 200) {
        setInquiries(response.data.result);
        setPageCount(response.data.pageCount);
      } else {
        setInquiries([]);
      }
    };

    fetchInquiries();
  }, [id, brgy, statusFilter, dateFilter, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Inquiries = inquiries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inq_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("inquiries", inquiries);

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
    "name",
    "e-mail",
    "message",
    "date",
    "status",
    "actions",
  ];

  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
  };

  const handleView = (item) => {
    setInquiry(item);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setStatusMenuOpen(false);
  };

  const handleResetFilter = () => {
    setStatusFilter("all");
    setDateFilter(null);
    setSearchQuery("");
  };

  const handleDateTypeChange = (e) => {
    setDateType(e.target.value);
  };

  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col ">
        <div className="flex flex-row sm:flex-col-reverse lg:flex-row w-full ">
          <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#4b7c80] to-[#21556d] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center sm:text-[15px] mx-auto font-bold md:text-xl lg:text-[1.2rem] xl:text-[1.5rem] xxl:text-[2.1rem] xxxl:text-4xl xxxl:mt-1 text-white"
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
                      className="hs-tooltip-toggle justify-center sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#4b7c80] to-[#21556d] w-full text-white font-medium text-sm text-center inline-flex items-center"
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
                    onClick={() => handleStatusFilter("In Progress")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    IN PROGRESS
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Completed")}
                    class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#21556d] to-[#276683] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    COMPLETED
                  </a>
                </ul>
              </div>

              {/* Date Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#21556d] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  DATE
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
                  <div class="hs-dropdown relative inline-flex flex-col w-full space-y-1 px-2">
                    <label className="text-white font-medium">DATE RANGE</label>
                    <div className="flex gap-2">
                      <select
                        className="bg-[#21556d] text-white py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800"
                        value={dateType}
                        onChange={handleDateTypeChange}
                      >
                        <option value="specific">Specific Date</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                      {dateType === "specific" && (
                        <input
                          className="bg-[#21556d] text-white py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800"
                          type="date"
                          id="specificDate"
                          name="specificDate"
                        />
                      )}
                      {dateType === "week" && (
                        <input
                          className="bg-[#21556d] text-white py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800"
                          type="week"
                          id="week"
                          name="week"
                        />
                      )}
                      {dateType === "month" && (
                        <input
                          className="bg-[#21556d] text-white py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800"
                          type="month"
                          id="month"
                          name="month"
                        />
                      )}
                      {dateType === "year" && (
                        <input
                          className="bg-[#21556d] text-white py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800 w-full"
                          type="number"
                          id="year"
                          name="year"
                          placeholder="YEAR"
                          min="1900"
                          max="2100"
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      onClick={() => handleSort("date")}
                      className="bg-[#21556d] uppercase text-white mt-2 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800 hover:bg-[#0d4675]"
                    >
                      APPLY
                    </button>
                  </div>
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
                    data-hs-overlay="#hs-modal-archive"
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

       <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_275px)] xxl:h-[calc(100vh_-_275px)] xxxl:h-[calc(100vh_-_300px)]">
          <table className="relative table-auto w-full">
            <thead className="bg-[#21556d] sticky top-0">
              <tr className="">
                <th scope="col" className="px-2 xl:px-6 py-4">
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
                    className="px-2 xl:px-6 py-3 text-center text-xs font-bold text-white uppercase"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="odd:bg-slate-100">
              {Inquiries.map((item, index) => (
                <tr key={index} className="odd:bg-slate-100 text-center">
                  <td className="px-2 xl:px-6 py-3">
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
                  <td className="px-2 xl:px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 xl:px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 xl:px-6 py-3 w-full xxl:w-80 xxxl:w-96">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.compose.message}
                    </span>
                  </td>
                  <td className="px-2 xl:px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {DateFormat(item.compose.date) || ""}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 xl:px-6 py-3 xxl:w-2/12">
                    <div className="flex justify-center items-center">
                      {item.isApproved === "Completed" && (
                        <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                            COMPLETED
                          </span>
                        </div>
                      )}
                      {item.isApproved === "Pending" && (
                        <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                            PENDING
                          </span>
                        </div>
                      )}
                      {item.isApproved === "In Progress" && (
                        <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                            IN PROGRESS
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-2 xl:px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <div className="hs-tooltip inline-block">
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
                      <div className="hs-tooltip inline-block">
                        <button
                          type="button"
                          data-hs-overlay="#hs-modal-status"
                          onClick={() =>
                            handleStatus({
                              id: item._id,
                              status: item.isApproved,
                            })
                          }
                          className="hs-tooltip-toggle text-white bg-yellow-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                        >
                          <FiEdit size={24} style={{ color: "#ffffff" }} />
                        </button>
                        <span
                          className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                          role="tooltip"
                        >
                          Edit Status
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <ArchiveModal selectedItems={selectedItems} />
        <ViewInquiriesModal inquiry={inquiry} setInquiry={setInquiry} />
        <Status status={status} setStatus={setStatus} />
      </div>
    </div>
  );
};

export default Inquiries;
