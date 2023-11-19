import React from "react";


function EditStoryModal({ brgyInformation, setBrgyInformation, updateInfo }) {

  const handleChange = (e) => {
    setBrgyInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 

  return (
    <div>
      <div
        id="hs-edit-story-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-36 xl:ml-28 xxxl:ml-0"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 px-3 md:px-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white shadow-sm xl:w-[600px] xxxl:w-[700px] rounded-t-3xl rounded-b-3xl">
            {/* Header */}
            <div class="bg-gradient-to-r from-[#295141] to-[#408D51] w-overflow-hidden  rounded-t-2xl">
              <div
                class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform"
              >
                <h3
                  class="font-bold text-white mx-auto text-md md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  EDIT STORY
                </h3>
              </div>
            </div>

            <div className="border m-5 p-5 rounded-lg">
              <textarea
                id="story"
                rows="4"
                class="block p-2.5 w-full h-40 text-sm text-gray-900 rounded-lg bg-gray-100 resize-none"
                placeholder="Enter story....."
                name="story"
                value={brgyInformation?.story || ""}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1.5 md:py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-xs md:text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
                data-hs-overlay="#hs-edit-story-modal"
                onClick={() => {
                  updateInfo(brgyInformation); // Pass brgyInformation to updateInfo
                }}
              >
                SAVE CHANGES
              </button>

              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-edit-story-modal"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStoryModal;
