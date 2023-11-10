import React from "react";
import axios from "axios";
import API_LINK from "../../config/API";

function StatusServices({ status, setStatus }) {
  const handleSave = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.patch(
        `${API_LINK}/services/status/${status.id}`,
        {
          isApproved: status.status,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response);
      if (response.status === 200){ 
        console.log("YEY");
        window.location.reload();
    }
      else console.log("NYARK");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    setStatus((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="">
        <div
          id="hs-modal-statusServices"
          class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto lg:ml-96 xl:ml-[500px] xxl:ml-[600px] xxxl:ml-[850px]">
            <div class="flex flex-col bg-white rounded-xl shadow-sm ">
              {/* Header */}
              <div class="rounded-t-xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden ">
                <div class="flex justify-between items-center p-5 w-full h-full">
                  <h3
                    class="font-heavy text-white mx-auto md:text-xl"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    STATUS
                  </h3>
                </div>
              </div>
              <div className="mt-5">
                <form>
                  <div className="flex flex-col lg:flex-row">
                    <div className="mb-4 px-4 w-full">
                      <div className="mb-4 px-4">
                        <label
                          htmlFor="civilStatus"
                          className="block text-sm font-medium text-gray-700"
                        >
                          STATUS OF SERVICES
                        </label>
                        <select
                          id="civilStatus"
                          onChange={handleOnChange}
                          name="status"
                          className="w-full mt-3 p-2 border border-gray-300 rounded"
                        >
                          <option
                            value="Approved"
                            selected={status.status === "Approved"}
                          >
                            APPROVED
                          </option>
                          <option
                            value="Disapproved"
                            selected={status.status === "Disapproved"}
                          >
                            DISAPPROVED
                          </option>
                          <option
                            value="Pending"
                            selected={status.status === "Pending"}
                          >
                            PENDING
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div class="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleSave}
                  className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-statusServices"
                >
                  SAVE CHANGES
                </button>
                <button
                  type="button"
                  class="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-statusServices"
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

export default StatusServices;
