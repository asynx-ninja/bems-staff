import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import officialimage from "../../assets/sample/official.jpg";

function ViewOfficialModal({ selectedOfficial, setSelectedOfficial, brgy, officials }) {
  console.log("selected", selectedOfficial)
  console.log("selected", officials)
  const dateFormat = (date) => {
    const eventdate = date === undefined ? "" : date.substr(0, 7);
    console.log(eventdate);
    return eventdate;
  };
  return (
    <div>
      <div
        id="hs-view-archived-official-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-10 xxl:ml-0"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col w-full lg:w-[700px] bg-white shadow-sm overflow-y-auto rounded-t-3xl rounded-b-3xl">
            {/* Header */}
            <div class="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <div class="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  class="font-base text-white mx-auto text-sm md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  VIEW BARANGAY OFFICIAL
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
                          src={selectedOfficial.picture?.link || ""}
                          alt=""
                          className="h-32 w-32 md:h-52 md:w-52 lg:h-60 lg:w-60 mx-auto rounded-lg"
                        />
                      </div>
                    </div>

                    <input
                      class="block mt-5 w-64 mx-auto lg:w-full text-sm text-black rounded-lg cursor-pointer bg-gray-100 "
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
                      value={selectedOfficial.name || ""}
                      readOnly
                    />
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
                      value={selectedOfficial.position}
                      readOnly
                    />
                  </div>
                 
                    <div className="w-full lg:w-1/2 sm:mt-2 md:mt-0">
                    <h1
                      class="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      SERVICE RENDERED
                    </h1>

                    {/* Date 1 */}
                    <div className="flex flex-row">
                      <label
                        htmlFor="from_year"
                        className=" w-[7rem] flex items-center"
                      >
                        From year:{" "}
                      </label>
                      <input
                        type="month"
                        className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                        id="from_year"
                        name="fromYear"
                        
                        value={dateFormat(selectedOfficial.fromYear)}
                        required
                      />
                    </div>
                    {/* Date 2 */}
                    <div className="flex flex-row">
                      <label
                        htmlFor="To_year"
                        className=" w-[6rem] flex items-center"
                      >
                        To year:{" "}
                      </label>
                      <input
                        type="month"
                        className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                        id="To_year"
                        name="toYear"
                        
                        value={dateFormat(selectedOfficial.toYear)}
                        required
                      />
                    </div>
                  

                  
                  </div>
                </div>

              
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-view-archived-official-modal"
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

export default ViewOfficialModal;
