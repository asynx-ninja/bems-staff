import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";

function EditStoryModal({ onClose }) {
  return (
    <div>
      <button
        type="button"
        className="text-white w-full justify-center bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
        style={{ margin: "10px 0px", padding: "10px 20px" }}
        data-hs-overlay="#hs-edit-story-modal"
      >
        EDIT
      </button>

      <div
        id="hs-edit-story-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-36 xl:ml-28 xxxl:ml-0"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 px-3 md:px-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white shadow-sm xl:w-[600px] xxxl:w-[700px]">
            {/* Header */}
            <div class="bg-[#295141] w-overflow-hidden">
              <div
                class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform"
                style={{ backgroundImage: `url(${bgmodal})` }}
              >
                <h3
                  class="font-base text-white mx-auto text-md md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  EDIT STORY
                </h3>
              </div>
            </div>

            <div className="border m-5 p-5 rounded-lg">
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full h-40 text-sm text-gray-900 rounded-lg bg-gray-100 resize-none"
                placeholder="Enter story....."
              ></textarea>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1.5 md:py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-xs md:text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
                data-hs-overlay="#hs-edit-story-modal"
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
