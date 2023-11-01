import React from 'react';
import { FaTrashRestore } from "react-icons/fa";
import imgSrc from '/imgs/bg-header.png'
import Breadcrumbs from '../components/archivedAnnouncement/Breadcrums'
import Restore from '../components/announcement/RestoreAnnouncementModal'
import { useEffect } from 'react'

const ArchivedAnnouncement = () => {
  useEffect(() => {
    document.title = "Archived Announcement | Barangay E-Services Management"
  }, []);
  
  const tableData = [
    {
      id: 1,
      imageSrc: imgSrc,
      title: 'Libreng Tuli',
      details: 'TUTULIIN O YUNG TITE MONG SUPOT KINANG INA MONG HAYUP KA',
      file: 'Tite.docs',
      date: '10 Jan 2023',
    },
  ];
  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem]  lg:mt-8 lg:mr-6">
      <div>
        <Breadcrumbs />
        <div className="flex flex-row mt-2 sm:flex-col-reverse lg:flex-row">
          <div className="bg-[#295141] py-2 sm:flex-row lg:flex-col lg:py-4 px-5 md:px-10 lg:px-10 rounded-tr-lg w-full lg:w-3/5 xxl:h-[5rem] xxxl:h-[5rem] flex justify-center flex-col">
          <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-[1.2rem] xl:text-[1.8rem] xxl:text-[2.1rem] xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED <span>ANNOUNCEMENTS</span>
            </h1>
          </div>
          <div className="bg-red lg:w-3/5 flex flex-row mb-2 lg:mb-1 lg:ml-5 sm:flex-col md:flex-row">
            <div className="relative w-full my-auto">
              <form className="flex my-auto">
                <div className="relative w-full">
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
                      placeholder="Search Announcements"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="overflow-auto sm:overflow-x-auto lg:h-[660px] xl:h-[660px] xxl:h-[670px] xxxl:h-[630px]">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#FBFBFB] border">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="text-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Image
                    </span>
                  </div>
                </th>

                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="text-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Title
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="text-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Details
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      File
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Date
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
                <tr key={tableData[0].id + index} className="bg-white hover-bg-gray-50 border">
                  <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                    <div className="p-1">
                      <img src={tableData[0].imageSrc} alt="" />
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                         {tableData[0].title}
                      </span>
                    </div>
                  </td>
                  <td className="w-[35%] sm:w-3/5 border">
                    <div className="px-2 sm:px-6 py-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 lg:h-10 overflow-hidden line-clamp-3">
                      {tableData[0].details}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                      {tableData[0].file}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                      {tableData[0].date}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <button
                        type="button"
                        data-hs-overlay="#hs-modal-restore"
                        className="text-white bg-teal-800 font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 lg:mr-2 inline-flex items-center"
                      >
                        <FaTrashRestore size={24} style={{ color: "#ffffff" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Restore />
    </div>
  );
};

export default ArchivedAnnouncement