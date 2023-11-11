import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewArchivedServiceModal({service, setService}) {
  const [logo, setLogo] = useState();

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);

    var output = document.getElementById("view_logo");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div>
      <div
        id="hs-view-archived-service-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-32 xl:ml-28 "
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all m-3 smx-auto">
          <div class="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full lg:w-[900px]">
            {/* Header */}
            <div class="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <div class="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  class="font-bold text-white mx-auto md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  VIEW ARCHIVED SERVICE
                </h3>
              </div>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 h-[800px] md:h-full overflow-y-auto">
              <div className="flex mb-4 border w-full flex-col md:flex-row md:space-x-2">
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 sm:ml-2 md:ml-0"
                    htmlFor="username"
                  >
                    Logo
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full">
                      <img
                        className="w-[200px] mx-auto lg:w-full h-[110px] lg:h-[250px] object-cover"
                        id="view_logo"
                        alt="Current profile photo"
                        src={service.length === 0 ? "": service.collections.logo.link}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 sm:ml-2 md:ml-0 sm:mt-2 md:mt-0"
                    htmlFor="username"
                  >
                    Banner
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full">
                      <img
                        className="w-[200px] mx-auto lg:w-full h-[110px] lg:h-[250px] object-cover"
                        id="view_logo"
                        alt="Current profile photo"
                        src={service.length === 0 ? "": service.collections.banner.link}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Service Name
                </label>
                <input
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={service.name}
                  placeholder="Service Name"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Service Type
                </label>
                <select
                  name="type"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  disabled
                >
                  <option
                    value="Healthcare"
                    selected={service.type === "Healthcare"}
                  >
                    Healthcare Services
                  </option>
                  <option
                    value="Education"
                    selected={service.type === "Education"}
                  >
                    Education Services
                  </option>
                  <option
                    value="Social Welfare"
                    selected={service.type === "Social Welfare"}
                  >
                    Social Welfare Services
                  </option>
                  <option
                    value="Security and Safety"
                    selected={service.type === "Security and Safety"}
                  >
                    Security and Safety Services
                  </option>
                  <option
                    value="Infrastructure"
                    selected={service.type === "Infrastructure"}
                  >
                    Infrastructure Services
                  </option>
                  <option
                    value="Community Services"
                    selected={service.type === "Community Services"}
                  >
                    Community Services
                  </option>
                  <option
                    value="Administrative"
                    selected={service.type === "Administrative"}
                  >
                    Administrative Services
                  </option>
                  <option
                    value="Environmental"
                    selected={service.type === "Environmental"}
                  >
                    Environmental Services
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-bold text-gray-700 "
                >
                  Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="details"
                  value={service.details}
                  className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter service details..."
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fee"
                >
                  Service Fee
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fee"
                  name="fee"
                  type="number"
                  value={service.fee}
                  placeholder="Service Fee"
                  readOnly
                />
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
            <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle mx-auto"
                data-hs-overlay="#hs-view-archived-service-modal"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewArchivedServiceModal;
