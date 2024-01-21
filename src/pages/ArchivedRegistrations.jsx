import React from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../config/API";
import axios from "axios";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";
import ArchiveRegistrationModal from "../components/eventRegistrations/ArchiveRegistrationModal";
import RequestsReportsModal from "../components/eventRegistrations/RequestsReportsModal";
import ViewRegistrationModal from "../components/eventRegistrations/ViewRegistrationModal";
import Breadcrumbs from "../components/archivedRegistrations/Breadcrumbs";
import RestoreRegistrationModal from "../components/archivedRegistrations/RestoreRegistrationModal";

const ArchivedRegistrations = () => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState({ response: [{ file: [] }] });
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //status
  const [statusFilter, setStatusFilter] = useState("all"); // Default is "all"
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);


  //date filtering
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selected, setSelected] = useState("date");


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/application/?brgy=${brgy}&archived=true&status=${statusFilter}&page=${currentPage}`
        );

        if (response.status === 200) {
          setApplications(response.data.result);
          setPageCount(response.data.pageCount);
          setFilteredApplications(response.data.result)
        }
        else setRequests([]);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [brgy, statusFilter, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const Applications = applications.filter((item) =>
    item.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusFilter = (selectedStatus) => {
    setStatusFilter(selectedStatus);
  };

  const handleResetFilter = () => {
    setStatusFilter("all");
    setRequests();
    setSearchQuery("");
  }; 

  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
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
    const applicationsToCheck =
      Applications.length > 0 ? Applications : applications;

    if (applicationsToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = applicationsToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "EVENT NAME",
    "SENDER",
    "DATE",
    "STATUS",
    "ACTIONS",
  ];

  const handleView = (item) => {
    setApplication(item);
  };

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = applications.slice().sort((a, b) => {
      if (sortBy === "event_id") {
        return newSortOrder === "asc"
          ? a.event_id.localeCompare(b.event_id)
          : b.event_id.localeCompare(a.event_id);
      } else if (sortBy === "service_name") {
        return newSortOrder === "asc"
          ? a.service_name.localeCompare(b.service_name)
          : b.service_name.localeCompare(a.service_name);
      } else if (sortBy === "status") {
        const order = {
          "Transaction Completed": 1,
          Pending: 2,
          Paid: 3,
          Processing: 4,
          Cancelled: 5,
          Rejected: 6,
        };
        return newSortOrder === "asc"
          ? order[a.status] - order[b.status]
          : order[b.status] - order[a.status];
      }

      return 0;
    });

    setApplications(sortedData);
  };

  useEffect(() => {
    document.title = "Archived Applications | Barangay E-Services Management";
  }, []);

  const filters = (choice, selectedDate) => {
    switch (choice) {
      case "date":
        return applications.filter((item) => {
          console.log(typeof new Date(item.createdAt), selectedDate);
          return (
            new Date(item.createdAt).getFullYear() === selectedDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === selectedDate.getMonth() &&
            new Date(item.createdAt).getDate() === selectedDate.getDate()
          );
        });
      case "week":
        const startDate = selectedDate;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        console.log("start and end", startDate, endDate);

        return applications.filter(
          (item) =>
            new Date(item.createdAt).getFullYear() === startDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === startDate.getMonth() &&
            new Date(item.createdAt).getDate() >= startDate.getDate() &&
            new Date(item.createdAt).getDate() <= endDate.getDate()
        );
      case "month":
        return applications.filter(
          (item) =>
            new Date(item.createdAt).getFullYear() === selectedDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === selectedDate.getMonth()
        );
      case "year":
        return applications.filter(
          (item) => new Date(item.createdAt).getFullYear() === selectedDate.getFullYear()
        );
    }
  };

  const onSelect = (e) => {
    console.log("select", e.target.value);

    setSelected(e.target.value);

    console.log("specified select", filters(e.target.value, specifiedDate));
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setSpecifiedDate(date);
    setFilteredApplications(filters(selected, date))
  };

  const onChangeWeek = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredApplications(filters(selected, date))
  };

  const onChangeMonth = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredApplications(filters(selected, date))
  };

  const onChangeYear = (e) => {
    if (e.target.value === "") {
      setFilteredApplications(applications)
    } else {
      const date = new Date(e.target.value, 0, 1);
      setSpecifiedDate(date);
      console.log("selected year converted date", date);
      console.log("specified year", filters(selected, date));
      setFilteredApplications(filters(selected, date))
    }
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
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-xl xxxl:text-3xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED EVENTS APPLICATIONS
            </h1>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
          <div className="sm:flex-col-reverse lg:flex-row flex justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-2 md:mt-2 lg:mt-0 md:space-y-2 lg:space-y-0">

              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#21556d] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  STATUS
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
                    onClick={() => handleStatusFilter("Pending")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    PENDING
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Paid")}
                     class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    PAID
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Processing")}
                     class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    PROCESSING
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Cancelled")}
                     class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    CANCELLED
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Transaction Completed")}
                     class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    TRANSACTION COMPLETED
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Rejected")}
                     class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    REJECTED
                  </a>
                </ul>
              </div>

              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#21556d] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
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
                  <div class="hs-dropdown relative inline-flex flex-col w-full space-y-1 my-2 px-2">
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
                          className=" text-black py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800 w-full"
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
                  onChange={(e) => {setSearchQuery(e.target.value)
                    const Applications = applications.filter(
                      (item) =>
                        item.event_name.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                
                    setFilteredApplications(Applications)
                  }}
                />
              </div>
              <div className="sm:mt-2 md:mt-0 flex w-full lg:w-64 items-center justify-center">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-restore-requests-modal"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-[#21556d] font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <MdRestartAlt size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Restore Selected Event Applications
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_325px)] xxxl:h-[calc(100vh_-_345px)]">
          <table className="relative table-auto w-full">
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
              {filteredApplications.map((item, index) => (
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
                  <td className="px-6 py-3">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.event_name}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.form[0].lastName.value +
                        ", " +
                        item.form[0].firstName.value +
                        " " +
                        item.form[0].middleName.value}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {DateFormat(item.createdAt) || ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 xxl:w-3/12">
                    {item.status === "Transaction Completed" && (
                      <div className="flex items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          TRANSACTION COMPLETED
                        </span>
                      </div>
                    )}

                    {item.status === "Rejected" && (
                      <div className="flex items-center justify-center bg-custom-red-button m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          REJECTED
                        </span>
                      </div>
                    )}

                    {item.status === "Pending" && (
                      <div className="flex items-center justify-center bg-custom-amber m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PENDING
                        </span>
                      </div>
                    )}
                    {item.status === "Paid" && (
                      <div className="flex items-center justify-center bg-violet-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PAID
                        </span>
                      </div>
                    )}

                    {item.status === "Processing" && (
                      <div className="flex items-center justify-center bg-blue-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PROCESSING
                        </span>
                      </div>
                    )}

                    {item.status === "Cancelled" && (
                      <div className="flex items-center justify-center bg-gray-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          CANCELLED
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <div className="hs-tooltip inline-block">
                        <button
                          type="button"
                          data-hs-overlay="#hs-view-application-modal"
                          onClick={() => handleView({ ...item })}
                          className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
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
                          View Event Registration
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
      {Object.hasOwn(application, "event_id") ? (
        <ViewRegistrationModal application={application} />
      ) : null}
      <ArchiveRegistrationModal />
      <RequestsReportsModal />
      <RestoreRegistrationModal selectedItems={selectedItems} />
    </div>
  );
};

export default ArchivedRegistrations;
