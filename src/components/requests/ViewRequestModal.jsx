import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import { IoReaderOutline } from "react-icons/io5";
import RequestApprovalModal from "./RequestApprovalModal";
import RequestRejectModal from "./RequestRejectModal";

function ViewRequestModal() {
  return (
    <div>
      <div
        id="hs-view-request-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-36 xl:ml-44 xxl:ml-40"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl">
            {/* Header */}
            <div class="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <div
                class="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
              >
                <h3
                  class="font-bold text-white mx-auto md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  REQUESTED SERVICE
                </h3>
              </div>
            </div>

            {/* Modal Details */}
            <div>
              {/* Name and Type of Service*/}
              <div class="relative mt-5 mx-6 overflow-y-auto flex flex-col lg:flex-row lg:space-x-3">
                <div className="w-full lg:w-1/2">
                  <h1
                    class="font-base text-black mx-auto text-sm"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    NAME OF SERVICE
                  </h1>
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h1
                    class="font-base text-black mx-auto text-sm mt-3 lg:mt-0"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    TYPE OF SERVICE
                  </h1>
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg  "
                    placeholder=""
                    readOnly
                  />
                </div>
              </div>

              {/* Service Description */}
              <div class="relative mt-4 mx-6 overflow-y-auto flex flex-col">
                <h1
                  class="font-base mb-1 text-black text-sm"
                  style={{ letterSpacing: "0.1em" }}
                >
                  DETAILS
                </h1>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-100 resize-none"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse."
                  readOnly
                ></textarea>

                <h1
                  class="font-base mt-4 mb-1 my-2 text-black text-sm"
                  style={{ letterSpacing: "0.1em" }}
                >
                  REASON
                </h1>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-100 resize-none"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse."
                  readOnly
                ></textarea>
              </div>

              {/* Date and Service Fee */}
              <div class="relative my-4 mx-6 overflow-y-auto flex flex-col lg:flex-row lg:space-x-3">
                <div className="w-full lg:w-1/2">
                  <h1
                    class="font-base text-black mx-auto text-sm"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    DATE
                  </h1>
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                    placeholder=""
                    required
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-1/2 mt-3 lg:mt-0">
                  <div className="flex flex-row">
                    <h1
                      class="font-base text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      REFERENCE NUMBER
                    </h1>
                  </div>

                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg  "
                    placeholder=""
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                data-hs-overlay="#hs-approval-modal"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
              >
                APPROVE
              </button>

              <button
                type="button"
                data-hs-overlay="#hs-reject-modal"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
              >
                REJECT
              </button>
            </div>
          </div>
        </div>
      </div>
      <RequestApprovalModal />
      <RequestRejectModal/>
    </div>
  );
}

export default ViewRequestModal;
