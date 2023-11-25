import React from "react";

function ViewArchivedModal() {
  return (
    <div>
      <div className="">
        <div
          id="hs-modal-viewArchived"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
            <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
              {/* Header */}
              <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3e5fc2] to-[#1f2f5e] overflow-hidden rounded-t-2xl">
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  VIEW INQUIRY
                </h3>
              </div>

              <div className="flex flex-col mx-auto w-full pt-5 px-5 overflow-y-auto relative max-h-[470px]">
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
                </form>
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm"
                  data-hs-overlay="#hs-modal-viewArchived"
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

export default ViewArchivedModal;
