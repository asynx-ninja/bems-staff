import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus, FaArchive } from "react-icons/fa";
import AddResident from "../components/residents/AddResidentModal";
import EditResident from "../components/residents/EditResidentsModal";
import ArchiveResident from "../components/residents/ArchiveResidentModal";
import { useEffect } from "react";
const Residents = () => {
  useEffect(() => {
    document.title = "Residents | Barangay E-Services Management";
  }, []);
  const tableData = [
    {
      id: 1,
      name: "Juan Karlos",
      age: "44",
      gender: "Male",
      contact: "09090909099",
      civilStat: "Single ready to mingle",
      status: "Registered",
    },
  ];
  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem]  lg:mt-8 lg:mr-6">
      <div>
        <div className="flex flex-row mt-5 sm:flex-col-reverse lg:flex-row">
          <div className="bg-[#295141] py-2 lg:py-4 px-5 md:px-10 lg:px-10 rounded-tr-lg w-full lg:w-3/5">
            <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-[1.2rem] xl:text-[1.8rem] xxl:text-[2.1rem] xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              MANAGE RESIDENTS
            </h1>
          </div>
          <div className="bg-red lg:w-3/5 flex flex-row mb-2 lg:mb-1 lg:ml-5 sm:flex-col md:flex-row ">
            <div className="relative w-full my-auto">
              <form className="flex my-auto">
                <div className="relative w-full ">
                  <div className="flex flex-row sm:w-12/6 sm:h-[2.5rem] ">
                    <button
                      type="submit"
                      className=" sm:px-5 py-2 px-8 text-sm font-medium text-white bg-teal-800 rounded-l-lg border"
                    >
                      <h1>SEARCH</h1>
                    </button>

                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 flex-grow z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                      placeholder="Search Residents"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-row md:ml-2 lg:ml-2 lg:mx-5 space-x-3 lg:space-x-1 xl:space-x-2 my-auto md:relative md:bottom-1">
              <div className="w-full h-[3.5rem] rounded-lg flex justify-center">
                <div class="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-addResident "
                    className="hs-tooltip-toggle justify-center h-[2.5rem] bg-teal-800 w-full text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center mr-2"
                    style={{ margin: "10px 0", padding: "10px 20px" }}
                  >
                    <FaPlus size={24} style={{ color: "#ffffff" }} />
                    <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                      role="tooltip"
                    >
                      Add Residents
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full h-[3.5rem] rounded-lg ">
                <Link to="/archivedresidents">
                  <div class="hs-tooltip inline-block w-full">
                    <button
                      type="button"
                      data-hs-overlay="#hs-modal-add"
                      className="hs-tooltip-toggle justify-center h-[2.5rem] bg-pink-800 w-full text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center mr-2"
                      style={{ margin: "10px 0", padding: "10px 20px" }}
                    >
                      <FaArchive size={24} style={{ color: "#ffffff" }} />
                      <span
                        class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
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

        <div className="overflow-auto sm:overflow-x-auto lg:h-[680px] xl:h-[700px] xxl:h-[700px] xxxl:h-[650px]">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#FBFBFB] border">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="text-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Name
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="text-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Age
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Gender
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Contact
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Civil Status
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Status
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Actions
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Array(20)
                .fill()
                .map((_, index) => (
                  <tr
                    key={tableData[0].id + index}
                    className="bg-white hover-bg-gray-50 border"
                  >
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600  mx-5">
                          {tableData[0].name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600  mx-5">
                          {tableData[0].age}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600  mx-5">
                          {tableData[0].gender}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600  mx-5">
                          {tableData[0].contact}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600  mx-5">
                          {tableData[0].civilStat}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="bg-teal-800 py-2 rounded-lg flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-white  mx-5">
                          {tableData[0].status}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex justify-center space-x-1 sm:space-x-none">
                        <button
                          type="button"
                          data-hs-overlay="#hs-modal-editResident"
                          className="text-white bg-teal-800 font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 lg:mr-2 inline-flex items-center"
                        >
                          <FiEdit size={24} style={{ color: "#ffffff" }} />
                        </button>
                        <button
                          type="button"
                          data-hs-overlay="#hs-modal-archiveResident"
                          className="text-white bg-pink-800 font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 inline-flex items-center"
                        >
                          <AiOutlineStop
                            size={24}
                            style={{ color: "#ffffff" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditResident />
      <AddResident />
      <ArchiveResident />
    </div>
  );
};

export default Residents;
