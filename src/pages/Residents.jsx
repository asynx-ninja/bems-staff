import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArchive, FaPlus, FaTrash } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineEye, AiOutlineStop } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import AddResidentsModal from "../components/residents/AddResidentModal";
import GenerateReportsModal from "../components/services/GenerateReportsModal";
import ArchiveResidentModal from "../components/residents/ArchiveResidentModal";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";
import StatusResident from "../components/residents/StatusResident";
import ManageResidentModal from "../components/residents/ManageResidentsModal";

const Residents = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [user, setUser] = useState({});
  const [status, setStatus] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = users.slice().sort((a, b) => {
      if (sortBy === "user_id") {
        return newSortOrder === "asc"
          ? a.user_id.localeCompare(b.user_id)
          : b.user_id.localeCompare(a.user_id);
      } else if (sortBy === "lastName") {
        return newSortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      } else if (sortBy === "isApproved") {
        const order = { Registered: 1, Pending: 2, Denied: 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setUsers(sortedData);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/users/?brgy=${brgy}&type=Resident`
      );
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    };

    fetch();
  }, [brgy]);

  const Users = users.filter((item) => {
    const fullName = `${item.lastName} ${item.firstName} ${item.middleName}`.toLowerCase();
    const userIdMatches = item.user_id.toLowerCase().includes(searchQuery.toLowerCase());
    const nameMatches = fullName.includes(searchQuery.toLowerCase());

    return userIdMatches || nameMatches;
  });

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
    const usersToCheck = Users.length > 0 ? Users : users;

    if (usersToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = usersToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "NAME",
    "EMAIL",
    "AGE",
    "GENDER",
    "CONTACT",
    "STATUS",
    "ACTIONS",
  ];

  useEffect(() => {
    document.title = "Residents | Barangay E-Services Management";
  }, []);

  const handleView = (item) => {
    setUser(item);
  };

  const handleStatus = (status) => {
    setStatus(status);
  };

  return (
    <div className="mx-4 ">
      <div className="flex flex-col ">
      {/* Header */}
      <div className="flex flex-row mt-4 sm:flex-col-reverse lg:flex-row ">
        <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#2e65ac] to-[#0d4b75] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
          <h1
            className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-3xl xxxl:text-4xl xxxl:mt-1 text-white"
            style={{ letterSpacing: "0.2em" }}
          >
            MANAGE RESIDENTS
          </h1>
        </div>
        <div className="lg:w-3/5 flex flex-row justify-end items-center ">
          <div className="sm:w-full md:w-full lg:w-2/5 flex sm:flex-col md:flex-row md:justify-center md:items-center sm:space-y-2 md:space-y-0 md:space-x-2 ">
            <div className="w-full rounded-lg flex justify-center">
              <div className="hs-tooltip inline-block w-full">
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-addResident"
                  className="hs-tooltip-toggle justify-center sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#2e65ac] to-[#0d4b75] w-full text-white font-medium text-sm  text-center inline-flex items-center "
                >
                  <FaPlus size={24} style={{ color: "#ffffff" }} />
                  <span className="sm:block md:hidden sm:pl-5">
                    Add Residents
                  </span>

                  <span
                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                    role="tooltip"
                  >
                    Add Residents
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full rounded-lg ">
              <Link to={`/archivedresidents/?id=${id}&brgy=${brgy}`}>
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-add"
                    className="hs-tooltip-toggle justify-center sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#2e65ac] to-[#0d4b75] w-full text-white font-medium text-sm text-center inline-flex items-center"
                  >
                    <FaArchive size={24} style={{ color: "#ffffff" }} />
                    <span className="sm:block md:hidden sm:pl-5">
                      Archived Residents
                    </span>
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Archived Residents
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
          <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
            <button
              id="hs-dropdown"
              type="button"
              className="bg-[#0d4b75] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
            >
              SORT BY
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
              className="bg-[#0d4b75] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 shadow-md rounded-lg p-2"
              aria-labelledby="hs-dropdown"
            >
              <li
                onClick={() => handleSort("user_id")}
                className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#0d4b75] to-[#2645a6] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
              >
                USER ID
                {sortColumn === "user_id" && (
                  <span className="ml-auto">
                    {sortOrder === "asc" ? (
                      <span>DESC &darr;</span>
                    ) : (
                      <span>ASC &uarr;</span>
                    )}
                  </span>
                )}
              </li>
              <li
                onClick={() => handleSort("lastName")}
                className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#0d4b75] to-[#2645a6] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
              >
                LAST NAME
                {sortColumn === "lastName" && (
                  <span className="ml-auto">
                    {sortOrder === "asc" ? (
                      <span>DESC &darr;</span>
                    ) : (
                      <span>ASC &uarr;</span>
                    )}
                  </span>
                )}
              </li>
              <li
                onClick={() => handleSort("isApproved")}
                className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#0d4b75] to-[#2645a6] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
              >
                STATUS
                {sortColumn === "isApproved" && (
                  <span className="ml-auto">
                    {sortOrder === "asc" ? (
                      <span>DESC &darr;</span>
                    ) : (
                      <span>ASC &uarr;</span>
                    )}
                  </span>
                )}
              </li>
            </ul>
          </div>
          <div className="sm:flex-col md:flex-row flex sm:w-full md:w-7/12">
            <div className="flex flex-row w-full md:mr-2">
              <button className=" bg-[#0d4b75] p-3 rounded-l-md">
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
            <div className="sm:mt-2 md:mt-0 flex w-64 items-center justify-center space-x-2">
              <div className="hs-tooltip inline-block w-full">
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-archiveResident"
                  className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                >
                  <AiOutlineStop size={24} style={{ color: "#ffffff" }} />
                  <span
                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                    role="tooltip"
                  >
                    Archived Selected Residents
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_273px)] xxxl:h-[calc(100vh_-_300px)]">
        <table className="relative table-auto w-full">
          <thead className="bg-[#0d4b75] sticky top-0">
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
            {Users.map((item, index) => (
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
                <td className="px-6 py-3">
                  <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                    {item.lastName +
                      ", " +
                      item.firstName +
                      " " +
                      item.middleName}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                    {item.email}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center items-center">
                    <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                      {item.age}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center items-center">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.sex}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center items-center">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.contact}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  {item.isApproved === "Registered" && (
                    <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                      <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                        REGISTERED
                      </span>
                    </div>
                  )}
                  {item.isApproved === "Denied" && (
                    <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                      <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                        DENIED
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
                <td className="px-6 py-3">
                  <div className="flex justify-center space-x-1 sm:space-x-none">
                    <div className="hs-tooltip inline-block">
                      <button
                        type="button"
                        data-hs-overlay="#hs-modal-editResident"
                        onClick={() => handleView({ ...item })}
                        className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                      >
                        <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
                      </button>
                      <span
                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                        role="tooltip"
                      >
                        View Resident
                      </span>
                    </div>
                    <div className="hs-tooltip inline-block">
                      <button
                        type="button"
                        data-hs-overlay="#hs-modal-statusResident"
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
                        Change Status
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:py-4 md:px-4 bg-[#0d4b75] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
        <span className="font-medium text-white sm:text-xs text-sm">
          Showing 1 out of 15 pages
        </span>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={() => {}}
          pageRangeDisplayed={3}
          pageCount={15}
          previousLabel="<<"
          className="flex space-x-3 text-white font-bold "
          activeClassName="text-yellow-500"
          disabledLinkClassName="text-gray-300"
          renderOnZeroPageCount={null}
        />
      </div>
      <AddResidentsModal brgy={brgy} />
      <ArchiveResidentModal selectedItems={selectedItems} />
      <GenerateReportsModal />
      <StatusResident status={status} setStatus={setStatus} />
      <ManageResidentModal user={user} setUser={setUser} />
    </div>
    </div>
  );
};

export default Residents;
