import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import officialimage from "../../assets/sample/official.jpg";
import { IoIosAdd } from "react-icons/io";

function CreateOfficialModal({ onClose }) {
  return (
    <div>
      <button
        type="button"
        className="text-white w-full justify-center bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
        style={{ margin: "10px 0px", padding: "10px 20px" }}
        data-hs-overlay="#hs-create-official-modal"
      >
        <IoIosAdd
          size={24} // You can adjust the size as needed
          style={{ color: "#ffffff" }}
        />
      </button>

      <div
        id="hs-create-official-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-10 xxl:ml-0"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col w-full lg:w-[700px] bg-white shadow-sm overflow-y-auto">
            {/* Header */}
            <div class="bg-[#295141] overflow-hidden">
              <div
                class="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
                style={{ backgroundImage: `url(${bgmodal})` }}
              >
                <h3
                  class="font-base text-white mx-auto md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  CREATE NEW OFFICIAL
                </h3>
              </div>
            </div>

            {/* Modal Details */}
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row border mb-1">
                  {/* Service Description */}
                  <div class="relative mt-4 lg:ml-6 overflow-y-auto flex flex-col w-full lg:w-1/2">
                    {/* Modal Images */}
                    <div class="relative w-full overflow-y-auto">
                      <div className="relative w-full"></div>
                      <div>
                        <img
                          src={officialimage}
                          alt=""
                          className="h-32 w-32 md:h-52 md:w-52 lg:h-60 lg:w-60 mx-auto rounded-lg"
                        />
                      </div>
                    </div>

                    <input
                      class="block mt-5 w-64 md:w-96 mx-auto lg:w-full text-sm text-black rounded-lg cursor-pointer bg-gray-100 "
                      id="file_input"
                      type="file"
                    />
                  </div>

                  {/* Request Information */}
                  <div class="relative mt-4 p-4 lg:mx-6 p-2 pb-6 overflow-y-auto flex flex-col w-full lg:w-1/2 h-full rounded-lg">
                    <h1
                      class="font-medium mb-1 text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      NAME OF THE OFFICIAL
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                    />
                    <h1
                      class="font-medium mb-1 mt-3 text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      BACKGROUND OVERVIEW
                    </h1>
                    <textarea
                      id="message"
                      rows="4"
                      class="block p-2.5 w-full h-48 text-sm text-gray-900 rounded-lg bg-gray-100 resize-none "
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse."
                    ></textarea>
                  </div>
                </div>

                {/* Other info */}
                <div class="relative mt-5 mx-6 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                  {/* Position and Service Rendered */}
                  <div className="w-full lg:w-1/2">
                    <h1
                      class="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      POSITION
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full lg:w-1/2 sm:mt-2 md:mt-0">
                    <h1
                      class="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      SERVICE RENDERED
                    </h1>

                     {/* Date 1*/}
                    <div class="hs-dropdown relative inline-flex mr-2">
                      <button
                        id="hs-dropdown-basic"
                        type="button"
                        class="hs-dropdown-toggle py-1 px-2 lg:px-4 inline-flex justify-center items-center gap-2 rounded-md border font-base bg-white text-black shadow-sm align-middle"
                      >
                        START
                        <svg
                          class="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>

                      <div
                        class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                        aria-labelledby="hs-dropdown-basic"
                      >
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2023
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2022
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2021
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2020
                        </a>
                      </div>
                    </div>

                     {/* Date 2 */}
                    <div class="hs-dropdown relative inline-flex">
                      <button
                        id="hs-dropdown-basic"
                        type="button"
                        class="hs-dropdown-toggle mt-1 py-1 px-2 lg:px-4 inline-flex justify-center items-center gap-2 rounded-md border font-base bg-white text-black shadow-sm align-middle"
                      >
                        PRESENT
                        <svg
                          class="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>

                      <div
                        class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                        aria-labelledby="hs-dropdown-basic"
                      >
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          Present
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2022
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2021
                        </a>
                        <a
                          class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          2020
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* E-Mail and Password */}
                <div class="relative mt-5 mx-6 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                  <div className="w-full md:w-1/2">
                    <h1
                      class="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      E-MAIL
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 sm:mt-2 md:mt-0">
                    <h1
                      class="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      PASSWORD
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg  "
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
                data-hs-overlay="#hs-create-official-modal"
              >
                SAVE CHANGES
              </button>
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-create-official-modal"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </div>
  );
}

export default CreateOfficialModal;
