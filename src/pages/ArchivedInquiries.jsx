import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import RestoreModal from "../components/inquiries/RestoreInquiries";
import imgSrc from "/imgs/bg-header.png";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Breadcrumbs from "../components/archivedInquiries/Breadcrumbs";
import ViewArchivedModal from "../components/inquiries/ViewArchived";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/?brgy=${brgy}&archived=true`
      );
      if (response.status === 200) setInquiries(response.data);
      else setInquiries([]);
        console.log(response.data);
    };

    fetch();
  }, []);

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
    if (inquiries.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = inquiries.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableData = [
    {
      id: 1,
      imageSrc: imgSrc,
      name: "Juanito Madrigal",
      email: "JuanitoMadrigal@gmail.com",
      subject: "English",
      message: "wag mo ginagalaw oten ko",
      status: "no reply",
      date: "10 Jan 2023",
    },
  ];

  const tableHeader = [
    "Inquiry id",
    "name",
    "e-mail",
    "date",
    "status",
    "actions",
  ];

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
  };

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = inquiries.slice().sort((a, b) => {
      if (sortBy === "inquiries_id") {
        return newSortOrder === "asc"
          ? a.inquiries_id.localeCompare(b.inquiries_id)
          : b.inquiries_id.localeCompare(a.inquiries_id);
      } else if (sortBy === "lastName") {
        return newSortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      } else if (sortBy === "isApproved") {
        const order = { Completed: 1, "In Progress": 2, "Not Responded": 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setInquiries(sortedData);
  };

  const handleView = (item) => {
    setInquiry(item);
  };


  return (
    <div className="mx-4 mt-8">
      <div>
        <Breadcrumbs />
        <div className="flex flex-row lg:mt-5 sm:flex-col-reverse lg:flex-row w-full">
          <div className="flex justify-center items-center sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3e5fc2] to-[#1f2f5e] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="mx-auto font-bold text-xs md:text-xl lg:text-[17px] xl:text-[20px] xxl:text-[1.5rem] xxxl:text-4xl text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED INQUIRIES
            </h1>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
          <div className="sm:flex-col-reverse md:flex-row flex justify-between w-full">
            <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
              <button
                id="hs-dropdown"
                type="button"
                className="bg-[#253a7a] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
              >
                SORT BY
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
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
                className="bg-[#253a7a] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
                aria-labelledby="hs-dropdown"
              >
                <li className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#253a7a] to-[#2645a6] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 ">
                  TITLE
                </li>
                <li className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#253a7a] to-[#2645a6] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 ">
                  DATE
                </li>
              </ul>
            </div>
            <div className="sm:flex-col md:flex-row flex sm:w-full md:w-7/12">
              <div className="flex flex-row w-full md:mr-2">
                <button className=" bg-[#253a7a] p-3 rounded-l-md">
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
                  className="sm:px-3 sm:py-1 md:px-3 md:py-1 block w-full text-black border-gray-200 rounded-r-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="Search for items"
                />
              </div>
              <div className="sm:mt-2 md:mt-0 flex w-full items-center justify-center space-x-2">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-restoreInquiry"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md bg-blue-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <BsPrinter size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Generate Report
                    </span>
                  </button>
                </div>
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-restoreInquiry"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-[#253a7a] font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                     <MdRestartAlt size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Restore Selected Inquiries
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_320px)] xxxl:h-[calc(100vh_-_340px)]">
          <table className="w-full relative table-auto">
            <thead className="bg-[#253a7a] sticky top-0">
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
              {inquiries.map((item, index) => (
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
                      {item.inq_id}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {DateFormat(item.compose.date) || ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                    {item.isApproved === "Completed" && (
                        <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                            COMPLETED
                          </span>
                        </div>
                      )}
                      {item.isApproved === "Not Responded" && (
                        <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                          <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                            NOT RESPONDED
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
                  <td className="px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <div className="hs-tooltip inline-block w-full">
                        <button
                          type="button"
                          data-hs-overlay="#hs-modal-viewArchived"
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
                          View Inquiry
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:py-4 md:px-4 bg-[#253a7a] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
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
        <RestoreModal selectedItems={selectedItems}/>
        <ViewArchivedModal inquiry={inquiry} setInquiry={setInquiry} />
      </div>
    </div>
  );
};

export default Inquiries;
