import React from "react";
import { useEffect } from "react";
import { MdRestartAlt } from "react-icons/md";
import Breadcrumbs from "../components/archivedServices/Breadcrumbs";
import RestoreServicesModal from "../components/archivedServices/RestoreServicesModal";

const ArchivedServices = () => {
  useEffect(() => {
    document.title = "Archived Services | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem]  lg:mt-8 lg:mr-6">
      <Breadcrumbs />
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-col-reverse lg:flex-row mt-5">
          {/* Table Title */}
          <div className="bg-[#295141] py-2 lg:py-3.5 px-5 md:px-10 lg:px-10 rounded-tr-lg w-full lg:w-3/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-xl xl:text-2xl xl:pt-1 xxl:text-3xl xxl:pt-0 xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED SERVICES
            </h1>
          </div>

          {/* Search - Add - Archived */}
          <div className="bg-red lg:w-3/5 flex flex-row mb-2 lg:mb-1 lg:ml-5 lg:mr-2 xl:mr-none sm:flex-col md:flex-row">
            {/* Search */}
            <div className="relative w-full my-auto">
              <form className="flex my-auto">
                <div className="relative w-full">
                  <div className="flex flex-row sm:w-12/6 sm:h-[2.5rem] ">
                    <button
                      type="submit"
                      className="sm:px-5 py-2 px-8 text-sm font-medium text-white bg-teal-800 rounded-l-lg border"
                    >
                      <h1>SEARCH</h1>
                    </button>

                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 flex-grow z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                      placeholder="Enter Service..."
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto lg:h-[660px] xl:h-[680px] xxl:h-[680px] xxxl:h-[615px] border">
          <table className="w-full divide-y divide-gray-200">
            {/* Table Headers */}
            <thead className="bg-gray-50 border">
              <tr>
                {/* Service Name */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Service Name
                    </span>
                  </div>
                </th>

                {/* Details */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Details
                    </span>
                  </div>
                </th>

                {/* Type of Service */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Type of Service
                    </span>
                  </div>
                </th>

                {/* Date */}
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

                {/* Actions */}
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

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Datas */}
              {Array(20)
                .fill("")
                .map((_, idx) => (
                  <tr className="bg-white hover-bg-gray-50 border">
                    {/* Service Name */}
                    <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="px-2 sm:px-6 py-2">
                        <span className="text-xs sm:text-lg text-black">
                          PANGKABUHAYAN QC
                        </span>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="w-[35%] sm:w-3/5 border">
                      <div className="px-2 sm:px-6 py-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 lg:h-10 overflow-hidden line-clamp-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Felis bibendum ut tristique et
                          egestas quis ipsum suspendisse. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                          Felis bibendum ut tristique et egestas quis ipsum
                          suspendisse.
                        </span>
                      </div>
                    </td>

                    {/* Service Type */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-black">
                          MEDICAL
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                          10 Jan 2023
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                      {/* Action Buttons */}
                      <div className="flex justify-center">
                        {/* Restore */}
                        <button
                          type="button"
                          data-hs-overlay="#hs-archive-services-modal"
                          className="text-white bg-custom-green-button3 font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 inline-flex items-center"
                        >
                          <MdRestartAlt
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
      <RestoreServicesModal />
    </div>
  );
};

export default ArchivedServices;
