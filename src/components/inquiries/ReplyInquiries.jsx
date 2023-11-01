import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";

function ReplyInquiryModal() {
  return (
    <div>
      <div className="">
        <div
          id="hs-modal-reply"
          class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto lg:ml-96 xl:ml-[500px] xxl:ml-[600px] xxxl:ml-[850px]">
            <div class="flex flex-col bg-white shadow-sm ">
              {/* Header */}
              <div class="bg-[#295141] overflow-hidden ">
                <div
                  class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform"
                  style={{ backgroundImage: `url(${bgmodal})` }}
                >
                  <h3
                    class="font-base text-white mx-auto md:text-xl"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    REPLY TO INQUIRY
                  </h3>
                </div>
              </div>
              <div className="mt-5">
                <form>
                  <div className="flex flex-col lg:flex-row">
                    <div className="mb-4 px-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4 px-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows="4"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4 px-4">
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Response
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows="4"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div class="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  type="button"
                  class="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-reply"
                >
                  REPLY
                </button>
                <button
                  type="button"
                  class="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-reply"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyInquiryModal;
