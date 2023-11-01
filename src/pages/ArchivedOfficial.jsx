import React from "react";
import { useEffect } from "react";
import officialimage from "../assets/sample/official.jpg"
import BreadcrumbsOfficials from "../components/archivedOfficials/BreadcrumbsOfficials";
import { MdRestartAlt } from "react-icons/md";
import RestoreOfficialModal from "../components/archivedOfficials/RestoreOfficialModal";

const ArchivedOfficial = () => {
  useEffect(() => {
    document.title = "Archived Officials | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6">
      <BreadcrumbsOfficials />
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-col-reverse lg:flex-row mt-5">
          {/* Table Title */}
          <div className="bg-[#295141] py-2 lg:py-3.5 px-5 md:px-10 lg:px-10 rounded-tr-lg w-full lg:w-3/5 xxl:h-[6rem] xxxl:h-[7rem]">
            <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-xl xl:text-2xl xl:pt-1 xxl:text-[30px] xxl:pt-0 xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED BARANGAY OFFICIALS
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
        <div className="overflow-x-auto lg:h-[630px] xl:h-[640px] xxl:h-[640px] xxxl:h-[580px] border">
          <table className="w-full divide-y divide-gray-200">
            {/* Table Headers */}
            <thead className="bg-gray-50 border">
              <tr>
                {/* Image */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Image
                    </span>
                  </div>
                </th>

                {/* Name */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Name
                    </span>
                  </div>
                </th>

                {/* Position */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Position
                    </span>
                  </div>
                </th>

                {/* Rendered Service */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Rendered Service
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
                    {/* Image */}
                    <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="px-2 sm:px-6 py-2">
                        <img
                          src={serviceimage}
                          alt=""
                          className="w-32 mx-auto rounded-full"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="w-[30%] border">
                      <div className="px-2 sm:px-6 py-2">
                        <span className="text-xl sm:text-sm text-black lg:h-10 overflow-hidden">
                          Nyle Lorenz A. Chua
                        </span>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-black">
                          Vice President
                        </span>
                      </div>
                    </td>

                    {/* Rendered Service */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[25%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                          2001 - Present
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[5%] sm:w-1/5 whitespace-nowrap border">
                      {/* Action Buttons */}
                      <div className="flex justify-center">
                        {/* Restore */}
                        <button
                          type="button"
                          data-hs-overlay="#hs-restore-official-modal"
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
      <RestoreOfficialModal />
    </div>
  );
};

export default ArchivedOfficial;
