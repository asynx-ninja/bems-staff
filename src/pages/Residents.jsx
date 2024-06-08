import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArchive, FaPlus, FaTrash } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineEye, AiOutlineStop } from "react-icons/ai";
import { FiEdit, FiMail } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import AddResidentsModal from "../components/residents/AddResidentModal";
import GenerateReportsModal from "../components/services/GenerateReportsModal";
import ArchiveResidentModal from "../components/residents/ArchiveResidentModal";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";
import StatusResident from "../components/residents/StatusResident";
import ManageResidentModal from "../components/residents/ManageResidentsModal";
import MessageResidentModal from "../components/residents/messageResident";
import noData from "../assets/image/no-data.png";
import GetBrgy from "../components/GETBrgy/getbrgy";
import moment from "moment";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";

import { io } from "socket.io-client";
import Socket_link from "../config/Socket";

const socket = io(Socket_link);

const Residents = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [user, setUser] = useState({});
  const [status, setStatus] = useState({});
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // Default is "all"
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const information = GetBrgy(brgy);
  const [update, setUpdate] = useState(false);
  const [editupdate, setEditUpdate] = useState(false);
  const [eventsForm, setEventsForm] = useState([]);

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
    const handleResident = (obj) => {
      setUsers(obj);
      setFilteredResidents((curItem) =>
        curItem.map((item) => (item._id === obj._id ? obj : item))
      );
    };

    const handleEventArchive = (obj) => {
      setUser(obj);
      setUsers((prev) => prev.filter((item) => item._id !== obj._id));
      setFilteredResidents((prev) =>
        prev.filter((item) => item._id !== obj._id)
      );
    };

    socket.on("receive-update-status-resident", handleResident);
    socket.on("receive-archive-staff", handleEventArchive);

    return () => {
      socket.off("receive-update-status-resident", handleResident);
      socket.off("receive-archive-staff", handleEventArchive);
    };
  }, [socket, setUsers]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/users/?brgy=${brgy}&type=Resident&status=${statusFilter}`
      );
      if (response.status === 200) {
        setUsers(response.data.result);
        setFilteredResidents(response.data.result.slice(0, 10));
        setNewUsers(response.data.result);
        setPageCount(response.data.pageCount);
      } else {
        setUsers([]);
      }
    };

    fetch();
  }, [brgy, statusFilter]);

  useEffect(() => {
    const filteredData = newUsers.filter((item) => {
      const fullName =
        item.lastName.toLowerCase() +
        ", " +
        item.firstName.toLowerCase() +
        (item.middleName !== undefined
          ? " " + item.middleName.toLowerCase()
          : "");

      return (
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase())
      );
    });

    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    setFilteredResidents(filteredData.slice(startIndex, endIndex));
    setPageCount(Math.ceil(filteredData.length / 10));
  }, [newUsers, searchQuery, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // const handleStatusFilter = (selectedStatus) => {
  //   setStatusFilter(selectedStatus);
  // };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };

  // const Users = users.filter((item) => {
  //   const fullName =
  //     `${item.lastName} ${item.firstName} ${item.middleName}`.toLowerCase();
  //   const userIdMatches = item.user_id
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   const nameMatches = fullName.includes(searchQuery.toLowerCase());

  //   return userIdMatches || nameMatches;
  // });

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
    const usersToCheck = users.length > 0 ? users : users;

    if (usersToCheck.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = usersToCheck.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = ["NAME", "EMAIL", "AGE", "CONTACT", "STATUS", "ACTIONS"];

  useEffect(() => {
    document.title = "Residents | Barangay E-Services Management";
  }, []);

  const handleView = (item) => {
    setUser(item);
  };

  const handleStatus = (status) => {
    setStatus(status);
  };

  const handleResetFilter = () => {
    setStatusFilter("all");
    setDateFilter(null);
    setSearchQuery("");
  };

  const handleCombinedActions = (item) => {
    handleView({ ...item });
    handleStatus({
      id: item._id,
      status: item.isApproved,
    });
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Barangay Residents");

    console.log("Filtered Residents", filteredResidents);

    const dataForExcel = filteredResidents.map((item) => ({
      FULLNAME: item.lastName + ", " + item.firstName + " " + item.middleName,
      EMAIL: item.email || "N/A",
      CONTACT: item.contact || "N/A",
      BIRTHDAY: moment(item.birthday).format("MMMM DD, YYYY") || "N/A",
      AGE: item.age || 'N/A"',
      GENDER: item.sex || "N/A",
      "CIVIL STATUS": item.civil_status || "N/A",
      RELIGION: item.religion || "N/A",
      ADDRESS:
        item.address.street +
          ", " +
          item.address.brgy +
          ", " +
          item.address.city || "N/A",
      "REGISTERED VOTER": item.isVoter || "N/A",
      STATUS: item.isApproved || "N/A",
    }));

    // Check for empty data BEFORE creating the worksheet
    if (dataForExcel.length === 0) {
      alert("No data to export!");
      return;
    }

    // Define a common border style
    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Add Title Row
    const titleRow = worksheet.addRow([
      `LIST OF RESIDENTS FOR BARANGAY ${brgy} `,
    ]);
    worksheet.mergeCells(
      `A1:${String.fromCharCode(65 + Object.keys(dataForExcel[0]).length - 1)}1`
    );
    titleRow.getCell(1).font = {
      bold: true,
      size: 16,
    };
    titleRow.getCell(1).alignment = { horizontal: "center" };
    titleRow.eachCell((cell) => {
      cell.border = borderStyle;
    });

    // Add Header Row
    const headerRow = worksheet.addRow(Object.keys(dataForExcel[0]));
    headerRow.eachCell((cell) => {
      if (cell.value) {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center" };
        cell.border = borderStyle;
      }
    });

    // Add Data Rows
    dataForExcel.forEach((item, index) => {
      const row = worksheet.addRow(Object.values(item));
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = borderStyle;
      });
    });

    // Set Column Widths
    worksheet.columns.forEach((column) => {
      column.width = 30; // Adjust the column width as needed
    });

    // Save the Workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "residents/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Residents of Barangay ${brgy}.xlsx`;
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const titleText = `LIST OF RESIDENTS FOR BARANGAY ${brgy}`;
    doc.setFontSize(18);
    doc.setTextColor(41, 81, 65);
    const textWidth = doc.getTextWidth(titleText);
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPosition = (pageWidth - textWidth) / 2;
    doc.text(titleText, xPosition, 20); // Place the title

    const tableColumn = [
      "FULLNAME",
      "EMAIL",
      "CONTACT",
      "BIRTHDAY",
      "AGE",
      "GENDER",
      "CIVIL STATUS",
      "RELIGION",
      "ADDRESS",
      "REGISTERED VOTER",
      "STATUS",
    ];

    const tableRows = [];

    // Check for empty data BEFORE creating the worksheet
    if (filteredResidents.length === 0) {
      alert("No data to export!");
      return;
    }

    filteredResidents.forEach((resident) => {
      const FullName = `${resident.lastName}, ${resident.firstName} ${resident.middleName}`;
      const Address = `${resident.address.street}, ${resident.address.brgy}, ${resident.address.city}`;
      const rowData = [
        FullName,
        resident.email,
        resident.contact,
        moment(resident.birthday).format("MMMM DD, YYYY"),
        resident.age,
        resident.sex,
        resident.civil_status,
        resident.religion,
        Address,
        resident.isVoter,
        resident.isApproved,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 7 },
      columnStyles: {
        0: { cellWidth: "wrap" },
        1: { cellWidth: "wrap" },
        2: { cellWidth: "wrap" },
        3: { cellWidth: "wrap" },
        4: { cellWidth: "wrap" },
        5: { cellWidth: "wrap" },
        6: { cellWidth: "wrap" },
        7: { cellWidth: "wrap" },
        8: { cellWidth: "wrap" },
        9: { cellWidth: "wrap" },
        10: { cellWidth: "wrap" },
      },
    });

    doc.save(`Residents of Barangay ${brgy}.pdf`);
  };

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const handleStatusFilter = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    // Pass minAge and maxAge to filterResidents function
    filterResidents(selectedStatus, minAge, maxAge);
  };

  // Create a new function to filter residents based on status and age
  const filterResidents = (selectedStatus, minAge, maxAge) => {
    let filteredData = newUsers;
    // Filter by status
    filteredData = filteredData.filter((item) =>
      selectedStatus === "all" ? true : item.isApproved === selectedStatus
    );
    // Filter by age range
    if (minAge && maxAge) {
      filteredData = filteredData.filter(
        (item) => item.age >= minAge && item.age <= maxAge
      );
    }
    // Update filtered residents state
    setFilteredResidents(filteredData);
  };

  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col ">
        <div className="flex flex-row sm:flex-col-reverse lg:flex-row w-full ">
          <div
            className="sm:mt-5 md:mt-4 lg:mt-0 bg-teal-700 py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]"
            style={{
              background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
            }}
          >
            <h1
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[24px] xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              MANAGE RESIDENTS
            </h1>
          </div>
          <div className="lg:w-3/5 flex flex-row justify-end items-center ">
            <div className="sm:w-full md:w-full lg:w-2/5 flex sm:flex-col md:flex-row md:justify-center md:items-center sm:space-y-2 md:space-y-0 md:space-x-2 ">
              <div className="w-full rounded-lg flex justify-center">
                <div className="hs-tooltip inline-block w-full">
                  <Link
                    to={`/addresidents/?id=${id}&brgy=${brgy}`}
                    type="button"
                    className="hs-tooltip-toggle justify-center bg-teal-700 sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg  w-full text-white font-medium text-sm  text-center inline-flex items-center "
                    style={{
                      background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                    }}
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
                  </Link>

                  {/* <Link
                    onClick={() => handleView({ ...item })}
                    to={{
                      pathname: `/create_residents/`,
                      search: `?id=${id}&brgy=${brgy}
                      )}`,
                    }}
                  >
                    <button
                      type="button"
                      data-hs-overlay="#hs-modal-addResident"
                      className="hs-tooltip-toggle justify-center sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg w-full text-white font-medium text-sm text-center inline-flex items-center "
                      style={{
                        background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                      }}
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
                  </Link> */}
                </div>
              </div>
              <div className="w-full rounded-lg ">
                <Link to={`/archivedresidents/?id=${id}&brgy=${brgy}`}>
                  <div className="hs-tooltip inline-block w-full">
                    <button
                      type="button"
                      data-hs-overlay="#hs-modal-add"
                      className="hs-tooltip-toggle justify-center bg-teal-700 sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg  w-full text-white font-medium text-sm text-center inline-flex items-center"
                      style={{
                        background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                      }}
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
          <div className="sm:flex-col-reverse lg:flex-row flex justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-2 md:mt-2 lg:mt-0 md:space-y-2 lg:space-y-0">
              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full bg-teal-700 sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                  style={{ backgroundColor: information?.theme?.primary }}
                >
                  FILTERS
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

                <div
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 shadow-xl rounded-xl p-2 overflow-hidden"
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

                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Partially Verified"}
                        onChange={() =>
                          handleStatusFilter("Partially Verified")
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <label> REGISTERED VOTER </label>
                    </div>

                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Fully Verified"}
                        onChange={() => handleStatusFilter("Fully Verified")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      HEAD OF THE FAMILY
                    </div>
                  </div>

                  <div className="flex flex-col w-full mt-3">
                    <label className="font-medium text-sm">
                      {" "}
                      CIVIL STATUS{" "}
                    </label>
                    <hr className="border-[#4e4e4e] my-1" />
                  </div>

                  <div className="flex flex-wrap w-full gap-3 mt-1">
                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Fully Verified"}
                        onChange={() => handleStatusFilter("Fully Verified")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      SINGLE
                    </div>

                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Fully Verified"}
                        onChange={() => handleStatusFilter("Fully Verified")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      MARRIED
                    </div>

                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Fully Verified"}
                        onChange={() => handleStatusFilter("Fully Verified")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      WIDOWED
                    </div>

                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter === "Fully Verified"}
                        onChange={() => handleStatusFilter("Fully Verified")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      LEGALLY SEPARATED
                    </div>
                  </div>

                  {/* Age Range Section */}
                  <div className="flex flex-col w-full mt-4">
                    <label
                      htmlFor="basic-range-slider-usage"
                      className="text-sm font-medium"
                    >
                      AGE RANGE
                    </label>
                    <hr className="border-[#4e4e4e] my-1" />
                  </div>

                  <div className="flex flex-col justify-between mt-1 w-full">
                    <div className="flex flex-row gap-6">
                      <div className="flex w-1/2 items-center justify-center">
                        <label
                          htmlFor="min-age"
                          className="text-sm font-medium"
                        >
                          Minimum Age
                        </label>
                      </div>
                      
                      <div className="flex w-1/2 items-center justify-center">
                        <label
                          htmlFor="min-age"
                          className="text-sm font-medium"
                        >
                          Maximum Age
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center w-full">
                      <input
                        type="number"
                        id="min-age"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        className="border rounded-md w-[50%] px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <label className="font-medium"> - </label>
                      <input
                        type="number"
                        id="max-age"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                        className="border rounded-md w-[50%] px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full bg-teal-700 sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                  style={{ backgroundColor: information?.theme?.primary }}
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
                  <li
                    onClick={() => handleStatusFilter("For Review")}
                    className={`flex items-center font-medium uppercase my-1 gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                      statusFilter === "For Review" && "bg-[#b3c5cc]"
                    }`}
                  >
                    FOR REVIEW
                  </li>
                  <li
                    onClick={() => handleStatusFilter("Rejected")}
                    className={`flex items-center font-medium uppercase my-1 gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                      statusFilter === "Denied" && "bg-[#b3c5cc]"
                    }`}
                  >
                    REJECTED
                  </li>
                  <li
                    onClick={() => handleStatusFilter("Partially Verified")}
                    className={`flex items-center font-medium uppercase my-1 gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                      statusFilter === "Verified" && "bg-[#b3c5cc]"
                    }`}
                  >
                    PARTIALLY VERIFIED
                  </li>
                  <li
                    onClick={() => handleStatusFilter("Fully Verified")}
                    className={`flex items-center font-medium uppercase my-1 gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                      statusFilter === "Verified" && "bg-[#b3c5cc]"
                    }`}
                  >
                    FULLY VERIFIED
                  </li>
                </ul>
              </div>

              {/* Generate Report */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className=" sm:w-full md:w-full bg-teal-700 sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                  style={{ backgroundColor: information?.theme?.primary }}
                >
                  GENERATE REPORT
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
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <div className="flex flex-col h-auto">
                    <a
                      className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                      onClick={
                        exportToExcel // Export immediately after selection
                      }
                    >
                      Export to Excel
                    </a>
                    <a
                      className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                      onClick={
                        exportToPDF // Export immediately after selection
                      }
                    >
                      Export to PDF
                    </a>
                  </div>
                </ul>
              </div>
            </div>

            <div className="sm:flex-col md:flex-row flex sm:w-full lg:w-7/12">
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
              <div className="sm:mt-2 md:mt-0 flex w-full lg:w-64 items-center justify-center space-x-2">
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
        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_275px)] xl:h-[calc(100vh_-_300px)] xxl:h-[calc(100vh_-_275px)] xxxl:h-[calc(100vh_-_300px)]">
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
              {filteredResidents.length > 0 ? (
                filteredResidents.map((item, index) => (
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
                    <td className="py-3 w-1/5">
                      <span className="text-xs sm:text-sm lg:text-xs xl:text-sm text-black line-clamp-2">
                        {item.lastName +
                          ", " +
                          item.firstName +
                          (item.middleName !== undefined
                            ? " " + item.middleName
                            : "")}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-xs sm:text-sm lg:text-xs xl:text-sm text-black line-clamp-2 ">
                        {item.email}
                      </span>
                    </td>
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                          {item.age}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                          {item.contact}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      {item.isApproved === "For Review" && (
                        <div className="flex w-full items-center justify-center bg-[#cf8455] xl:m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 lg:mx-0 xl:mx-5">
                            FOR REVIEW
                          </span>
                        </div>
                      )}
                      {item.isApproved === "Partially Verified" && (
                        <div className="flex w-full items-center justify-center bg-custom-amber xl:m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 lg:mx-0 xl:mx-5">
                            PARTIALLY VERIFIED
                          </span>
                        </div>
                      )}
                      {item.isApproved === "Fully Verified" && (
                        <div className="flex w-full items-center justify-center bg-[#6f75c2] xl:m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 lg:mx-0 xl:mx-5">
                            FULLY VERIFIED
                          </span>
                        </div>
                      )}
                      {item.isApproved === "Rejected" && (
                        <div className="flex w-full items-center justify-center bg-custom-red-button xl:m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 lg:mx-0 xl:mx-5">
                            REJECTED
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="xl:px-6 py-3">
                      <div className="flex justify-center space-x-1 sm:space-x-none">
                        <div className="hs-tooltip inline-block">
                          <Link
                            to={`/editresidents/?id=${id}&brgy=${brgy}`}
                            state={{ ...item }}
                            className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                          >
                            <AiOutlineEye
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </Link>
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
                            onClick={() => handleCombinedActions(item)}
                            className="hs-tooltip-toggle text-white bg-yellow-600 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
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
                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            data-hs-overlay="#hs-modal-messageResident"
                            onClick={() => handleCombinedActions(item)}
                            className="hs-tooltip-toggle text-white bg-red-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                          >
                            <FiMail size={24} style={{ color: "#ffffff" }} />
                          </button>
                          <span
                            className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                            role="tooltip"
                          >
                            Send Message
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
                    className="text-center sm:h-[18.7rem] xl:py-1 lg:h-[17rem] xxl:py-32 xl:h-[18.8rem]"
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
        <AddResidentsModal brgy={brgy} socket={socket} />
        <ArchiveResidentModal selectedItems={selectedItems} socket={socket} />
        <GenerateReportsModal />
        <StatusResident
          user={user}
          setUser={setUser}
          brgy={brgy}
          status={status}
          setStatus={setStatus}
          socket={socket}
        />
        <MessageResidentModal
          user={user}
          setUser={setUser}
          brgy={brgy}
          socket={socket}
        />
        <ManageResidentModal user={user} setUser={setUser} brgy={brgy} />
      </div>
    </div>
  );
};

export default Residents;
