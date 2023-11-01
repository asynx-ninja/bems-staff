import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import officialimage from "../../assets/sample/official.jpg";

function AddResidentModal() {
  return (
    <div>
      <div className="">
        <div
          id="hs-modal-addResident"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto lg:ml-96 xl:ml-[500px] xxl:ml-[600px] xxxl:ml-[800px]">
            <div className="flex flex-col bg-white shadow-sm ">
              {/* Header */}
              <div className="bg-[#295141] overflow-hidden">
                <div
                  className="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform"
                  style={{ backgroundImage: `url(${bgmodal})` }}
                >
                  <h3
                    className="font-base text-white mx-auto md:text-xl"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    ADD RESIDENTS
                  </h3>
                </div>
              </div>
              <div className="mt-5">
                <form>
                  <div className="mb-4 px-4">
                    <div className="flex flex-col-reverse lg:flex-row mb-1">
                      {/* Service Description */}

                      {/* Request Information */}
                      <div class="relative mt-4 p-4 pb-6 overflow-y-auto flex flex-col w-full lg:w-1/2 h-full rounded-lg border">
                        <h1
                          class="font-medium mb-1 text-black text-sm"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          NAME
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
                          AGE
                        </h1>
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                          placeholder=""
                        />

                        <div className="">
                        <h1
                          class="font-medium mt-5 text-black text-sm"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          GENDER
                        </h1>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male"
                            />
                            <label htmlFor="male" className="ml-2">
                              Male
                            </label>
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female"
                              className="ml-4"
                            />
                            <label htmlFor="female" className="ml-2">
                              Female
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="relative mt-4 lg:ml-3 overflow-y-auto flex flex-col w-full lg:w-1/2 border rounded-lg p-4">
                        {/* Modal Images */}
                        <div class="relative w-full overflow-y-auto">
                          <div className="relative w-full"></div>
                          <div>
                            <img
                              src={officialimage}
                              alt=""
                              className="h-32 w-32 md:h-36 md:w-36 mx-auto rounded-lg"
                            />
                          </div>
                        </div>

                        <input
                          class="block mt-5 w-52 md:w-96 mx-auto lg:w-full text-sm text-black rounded-lg cursor-pointer bg-gray-100 "
                          id="file_input"
                          type="file"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 px-4">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CONTACT
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="civilStatus"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CIVIL STATUS
                    </label>
                    <select
                      id="civilStatus"
                      name="civilStatus"
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div className="flex justify-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-addResident"
                >
                  ADD
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-addResident"
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

export default AddResidentModal;
