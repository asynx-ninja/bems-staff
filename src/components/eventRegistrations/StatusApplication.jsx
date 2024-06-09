import React from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import StatusLoader from "./loaders/StatusLoader";
import { useState } from "react";
import GetBrgy from "../GETBrgy/getbrgy";

function StatusApplication({
  application,
  setApplication,
  brgy,
  status,
  setStatus,
  socket,
  id,
}) {
  const information = GetBrgy(brgy);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [banner, setBanner] = useState({
    link: "https://drive.google.com/thumbnail?id=1KNgbPSDYIaoDs2Ve644pvCpqdd0K6GXZ&sz=w1000",
    name: "resident_banner.png",
    id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
  });

  const [logo, setLogo] = useState({
    link: "https://drive.google.com/thumbnail?id=1jKinPMGDMtkRibohcdhVfq0VJt7KUrvO&sz=w1000",
    name: "resident_logo.png",
    id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
  });

  console.log(status);

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      setSubmitClicked(true);
      setError(null); // Reset error state

      const response = await axios.patch(
        `${API_LINK}/application/status/?id=${status.id}`,
        {
          status: status.status,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const getIP = async () => {
          const response = await fetch("https://api64.ipify.org?format=json");
          const data = await response.json();
          return data.ip;
        };

        const ip = await getIP(); // Retrieve IP address
        const logsData = {
          action: "Updated",
          details: `Updated the status of the event application.`,
          ip: ip,
        };

        const logsResult = await axios.post(
          `${API_LINK}/act_logs/add_logs/?id=${id}`,
          logsData
        );

        if (logsResult.status === 200) {
          socket.emit("send-status-request-staff", response.data);
          const notify = {
            category: "One",
            compose: {
              subject: `EVENT APPLICATION STATUS UPDATED`,
              message: `The event application you have submitted has been updated.\n\n`,
              go_to: null,
            },
            target: {
              user_id: application.form[0].user_id.value,
              area: brgy,
            },
            type: "Resident",
            banner: banner,
            logo: logo,
          };

          const result = await axios.post(`${API_LINK}/notification/`, notify, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (result.status === 200) {
            socket.emit("send-status-request-staff", response.data);
            setTimeout(() => {
              setSubmitClicked(false);
              setUpdatingStatus("success");
              setTimeout(() => {
                setSubmitClicked(null);
                setUpdatingStatus(null);
                HSOverlay.close(
                  document.getElementById("hs-modal-status-applications")
                );
              }, 3000);
            }, 1000);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setSubmitClicked(false);
      setUpdatingStatus("error");
      setError("An error occurred while updating the inquiry.");
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
          id="hs-modal-status-applications"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-xl">
            <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto">
              {/* Header */}
              <div
                className="py-5 px-3 flex justify-between items-center overflow-hidden rounded-t-2xl"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
                }}
              >
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  STATUS
                </h3>
              </div>

              <div className="mt-5">
                <form>
                  <div className="flex flex-col lg:flex-row">
                    <div className="mb-4 px-4 w-full">
                      <div className="mb-4 px-4">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          STATUS OF THE EVENT APPLICATION
                        </label>
                        <select
                          id="status"
                          onChange={handleOnChange}
                          name="status"
                          className="w-full mt-3 p-2 border border-gray-300 rounded"
                          value={status.status}
                        >
                          <option value="For Review">FOR REVIEW</option>
                          <option value="Cancelled">CANCELLED</option>
                          <option value="Rejected">REJECTED</option>
                          <option value="Approved">APPROVED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700 mx-auto">
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="h-[2.5rem] w-full md:w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    type="button"
                    className="h-[2.5rem] w-full md:w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                    data-hs-overlay="#hs-modal-status-applications"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {submitClicked && <StatusLoader updatingStatus="updating" />}
          {updatingStatus && (
            <StatusLoader updatingStatus={updatingStatus} error={error} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatusApplication;