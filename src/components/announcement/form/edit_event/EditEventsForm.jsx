import React, { useState, useEffect } from "react";
import axios from "axios";
import API_LINK from "../../../../config/API";
import EditSectionForm from "./EditSectionForm";
import EditFormLoader from "../../loaders/EditFormLoader";
import GetBrgy from "../../../GETBrgy/getbrgy";

const EditEventsForm = ({
  announcement_id,
  announcement_title,
  brgy,
  setEditUpdate,
  editupdate,
  socket,
  eventsForm,
  setEventsForm,
  id
}) => {
  const information = GetBrgy(brgy);

  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFormIndex, setSelectedFormIndex] = useState("");
  const [onSend, setOnSend] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/event_form/?brgy=${brgy}&event_id=${announcement_id}`
        );
        setDetails(response.data);
        setEditUpdate((prevState) => !prevState);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, [brgy, announcement_id, editupdate]);

  const handleFormChange = (e, key) => {
    const newState = detail.form[0];
    newState[key].checked = e.target.checked;

    setDetail((prev) => ({
      ...prev,
      form: [newState, detail.form[1]],
    }));
  };

  const handleSubmit = async (e) => {
    try {
      setSubmitClicked(true);
      setOnSend(true);
      if (detail.isActive) {
        const activeFormResponse = await axios.get(
          `${API_LINK}/event_form/check/?brgy=${brgy}&event_id=${announcement_id}`
        );
        if (
          activeFormResponse.data.length === 0 ||
          activeFormResponse.data[0].version === detail.version
        ) {
          const response = await axios.patch(
            `${API_LINK}/event_form/`,
            {
              detail: detail,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
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
              action: "Updated",
              details: `A new events forms for "${announcement_title}" was updated.`,
              ip: ip,
            };

            const logsResult = await axios.post(
              `${API_LINK}/act_logs/add_logs/?id=${id}`,
              logsData
            );
            if (logsResult.status === 200) {
              socket.emit("send-edit-event-form", response.data);
              setSubmitClicked(false);
              setUpdatingStatus("success");
              setOnSend(false);
              setTimeout(() => {
                setUpdatingStatus(null);
                setDetail({});
                setSelectedFormIndex("");
                setDetail({ title: "" });
                document.querySelector('select[name="form"]').value = "";
                HSOverlay.close(document.getElementById("hs-edit-eventsForm-modal"));
              }, 3000);
            }
          }

        } else if (activeFormResponse.data[0].version !== detail.version) {

          throw new Error(
            "There's an active form. Please turn it off before updating the form."
          );
        }
      } else {
        const response = await axios.patch(
          `${API_LINK}/event_form/`,
          {
            detail: detail,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
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
            action: "Updated",
            details: `A new events forms for "${announcement_title}" was updated.`,
            ip: ip,
          };


          const logsResult = await axios.post(
            `${API_LINK}/act_logs/add_logs/?id=${id}`,
            logsData
          );
          if (logsResult.status === 200) {
            socket.emit("send-edit-event-form", response.data);
            setSubmitClicked(false);
            setUpdatingStatus("success");
            setOnSend(false);
            setTimeout(() => {
              setUpdatingStatus(null);

              setDetail({});
              setSelectedFormIndex("");
              setDetail({ title: "" });
              document.querySelector('select[name="form"]').value = "";
              HSOverlay.close(document.getElementById("hs-edit-eventsForm-modal"));
            }, 3000);
          }
        }
      }

    } catch (err) {
      console.error(err.message);
      setSubmitClicked(false);
      setUpdatingStatus("error");
      setError(err.message);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedFormIndex(e.target.value);
    setDetail(details[e.target.value]);
  };

  const handleChange = (e) => {
    setDetail((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleResetModal = () => {
    setDetail({});
    setSelectedFormIndex("");
  };

  return (
    <div>
      <div
        id="hs-edit-eventsForm-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
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
                EDIT EVENTS FORM
              </h3>
            </div>
            <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb my-2 py-5 px-2 overflow-y-auto relative h-[470px]">
              <div className="px-4 pb-2 flex flex-col md:flex-row justify-between items-center">
                <label htmlFor="" className="font-bold uppercase">
                  Select which form to edit:
                </label>
                <select
                  name="form"
                  className="border border-1 border-gray-300 shadow bg-white w-full md:w-6/12 mt-2 md:mt-0 border p-2 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  onChange={handleSelectChange}
                  value={selectedFormIndex}
                >
                  <option value="" disabled>
                    Select Form
                  </option>
                  {details &&
                    details.map((item, idx) => (
                      <option key={idx} value={idx}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-4">
                  <label className="block  text-black font-bold">
                    SERVE AS ACTIVE FORM?
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOpen"
                      onChange={(e) =>
                        setDetail((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      checked={detail.isActive}
                      disabled={detail.isArchived}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-400 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800" />
                  </label>
                </div>
                <div className="my-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    NAME OF EVENT FORM
                  </label>
                  <input
                    id="title"
                    className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    name="title"
                    type="text"
                    value={detail.title || ""}
                    onChange={handleChange}
                    placeholder="Event Form Title"
                  />
                </div>
                <fieldset className="border-2 border-black">
                  <legend className="ml-2 px-2 text-lg font-bold">
                    BASIC INFORMATION
                  </legend>
                  <div className="px-4 py-2">
                    <h1 className="font-medium text-sm">
                      Please select which are you going to display the event
                      form details:
                    </h1>
                    <div className="grid md:grid-cols-3 mt-3">
                      {detail.form &&
                        Object.entries(detail.form[0]).map(
                          ([key, value], idx) => {
                            return (
                              <label key={idx} className="font-medium text-sm">
                                <input
                                  className="mr-2"
                                  type="checkbox"
                                  checked={value.checked}
                                  onChange={(e) => handleFormChange(e, key)}
                                />
                                {value.display.toUpperCase()}
                              </label>
                            );
                          }
                        )}
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="px-4 w-full h-auto overflow-y-auto">
                <fieldset className="border-2 border-black">
                  <legend className="ml-2 px-2 text-lg font-bold">
                    CUSTOMIZE FORM
                  </legend>
                  <EditSectionForm detail={detail} setDetail={setDetail} />
                </fieldset>
              </div>
            </div>

            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                  onClick={handleSubmit}
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-edit-eventsForm-modal"
                  onClick={handleResetModal}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
        {submitClicked && <EditFormLoader updatingStatus="updating" />}
        {updatingStatus && (
          <EditFormLoader updatingStatus={updatingStatus} error={error} />
        )}
      </div>
    </div>
  );
};

export default EditEventsForm;
