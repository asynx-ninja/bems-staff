import React from "react";
import Error from "../../assets/modals/Error.png";
import axios from "axios";
import API_LINK from "../../config/API";
import { IoArchiveOutline } from "react-icons/io5";
import { useState } from "react";
import ArchiveLoader from "./loaders/ArchiveLoader";

function ArchiveOfficialModal({ selectedItems, socket, id }) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  console.log("error", selectedItems);

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      setError(null); // Reset error state

      if (selectedItems.length === 0) {
        setUpdatingStatus("error");
        setError("Unable to archive, Please select first to archive.");
        setTimeout(() => {
          setUpdatingStatus(null);
          HSOverlay.close(document.getElementById("hs-archive-official-modal"));
        }, 3000);

        console.log("error", selectedItems);
        return;
      }
      setSubmitClicked(true);

      for (let i = 0; i < selectedItems.length; i++) {
        const response = await axios.patch(
          `${API_LINK}/brgyofficial/archived/${selectedItems[i]}/true`
        );

        if (response.status === 200) {
          const getIP = async () => {
            const response = await fetch(
              "https://api64.ipify.org?format=json"
            );
            const data = await response.json();
            return data.ip;
          };

          const ip = await getIP(); // Retrieve IP address
          const logsData = {
            action: "Archived",
            details: `Archived an official (ID: ${selectedItems[i]}).`,
            ip: ip,
          };

          const logsResult = await axios.post(
            `${API_LINK}/act_logs/add_logs/?id=${id}`,
            logsData
          );
          if (logsResult.status === 200) {
            socket.emit("send-archive-staff", response.data);

            setSubmitClicked(false);
            setError(null);
            setUpdatingStatus("success");
            setTimeout(() => {
              setUpdatingStatus(null);
              HSOverlay.close(document.getElementById("hs-archive-official-modal"));
            }, 3000);
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      id="hs-archive-official-modal"
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
                className="inline-flex items-center px-8 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-red-500 focus:outline-none transition ease-in-out duration-150"
              >
                Archive
              </button>
              <button
                type="button"
                data-hs-overlay="#hs-archive-official-modal"
                className="inline-flex items-center px-8 py-2 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none transition ease-in-out duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {submitClicked && <ArchiveLoader updatingStatus="updating" />}
      {updatingStatus && (
        <ArchiveLoader updatingStatus={updatingStatus} error={error} />
      )}
    </div>
  );
}

export default ArchiveOfficialModal;
