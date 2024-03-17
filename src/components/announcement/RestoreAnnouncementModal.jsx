import React from "react";
import Error from "../../assets/modals/Error.png";
import axios from "axios";
import API_LINK from "../../config/API";
import { IoArchiveOutline } from "react-icons/io5";

function RestoreAnnouncementModal({ selectedItems }) {
  const handleSave = async (e) => {
    try {
      e.preventDefault();

      for (let i = 0; i < selectedItems.length; i++) {
        const response = await axios.patch(
          `${API_LINK}/announcement/archived/${selectedItems[i]}/false`
        );
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      id="hs-modal-restore"
      className="z-[100] hs-overlay hidden w-full h-full fixed top-0 left-0 z-60 overflow-x-hidden overflow-y-auto"
      >
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-400 bg-opacity-0 ">
          <div className="flex items-center justify-center min-h-screen pt-4 pb-20 ">
            <div className="w-10/12 lg:max-w-md p-6 bg-white rounded-lg shadow-xl ">
              <IoArchiveOutline size={40} className="mb-5 justify-start" />
              <h3 className="text-2xl font-bold mb-4">Are you sure?</h3>
              <p className="text-md mb-8">
                You are going to archive a specific/some of the information that
                will not be able to view in public
              </p>
              <div className="flex space-x-4 justify-center">
              <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-8 py-2 bg-[#369987] text-white font-semibold rounded-lg hover:bg-[#48b6a2] focus:ring-4 focus:ring-[#48b6a2] focus:outline-none transition ease-in-out duration-150"
                >
                  Restore
                </button>
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-restore"
                  className="inline-flex items-center px-8 py-2 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none transition ease-in-out duration-150"
                >
                  Cancel
                </button>
                
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default RestoreAnnouncementModal;
