import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditDropbox from "./EditDropbox";
import API_LINK from "../../config/API";
import EditLoader from "./loaders/EditLoader";

function ManageAnnouncementModal({ announcement, setAnnouncement, brgy }) {
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dateFormat = (date) => {
    const eventdate = date === undefined ? "" : date.substr(0, 10);
    return eventdate;
  };

  const handleOnEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    setFiles(announcement.length === 0 ? [] : announcement.collections.file);

    var logoSrc = document.getElementById("edit_logo");
    logoSrc.src =
      announcement.length === 0 ? "" : announcement.collections.logo.link;

    var bannerSrc = document.getElementById("edit_banner");
    bannerSrc.src =
      announcement.length === 0 ? "" : announcement.collections.banner.link;
  }, [announcement]);

  const renameFile = (file, newName) => {
    const newFile = new File([file], newName, { type: file.type });
    return newFile;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const renamedFile = renameFile(file, "logo");

    setLogo(renamedFile);

    var output = document.getElementById("edit_logo");
    output.src = URL.createObjectURL(file);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    const renamedFile = renameFile(file, "banner");

    setBanner(renamedFile);

    var output = document.getElementById("edit_banner");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setAnnouncement((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "isOpen" ? e.target.checked : e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setFiles([...files, ...e.target.files]);
  };

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitClicked(true);

      var formData = new FormData();

      const arr1 = [banner, logo];
      const combined = arr1.concat(files);

      const savedFiles = combined.filter(function (element) {
        return element !== undefined && element.hasOwnProperty("link");
      });

      const newFiles = combined.filter(function (element) {
        return element !== undefined && element instanceof File;
      });

      if (savedFiles.length !== 0) {
        savedFiles.forEach((item) => {
          formData.append(`saved`, JSON.stringify(item));
        });
      }

      if (newFiles.length !== 0)
        for (let f = 0; f < newFiles.length; f += 1) {
          formData.append("files", newFiles[f]);
        }

      console.log("announcement", announcement);

      formData.append("announcement", JSON.stringify(announcement));

      const res_folder = await axios.get(
        `${API_LINK}/folder/specific/?brgy=${brgy}`
      );

      console.log("brgy: ", brgy);
      console.log("res_folder: ", res_folder);

      if (res_folder.status === 200) {
        const response = await axios.patch(
          `${API_LINK}/announcement/${announcement._id}`,
          formData
        );

        if (response.status === 200) {
          var logoSrc = document.getElementById("logo");
          logoSrc.src =
            "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";

          var bannerSrc = document.getElementById("banner");
          bannerSrc.src =
            "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";

          let notify;

          if (announcement.isOpen) {
            notify = {
              category: "All",
              compose: {
                subject: `EVENT - ${response.data.title}`,
                message: `Barangay ${brgy} has updated an event named: ${response.data.title}.\n\n
                
                Event Details:\n 
                ${response.data.details}\n\n
    
                Event Date:
                ${response.data.date}\n\n
                `,
                go_to: "Events",
              },
              target: {
                user_id: null,
                area: null,
              },
              type: null,
              banner: response.data.collections.banner,
              logo: response.data.collections.logo,
            };
          } else {
            notify = {
              category: "Many",
              compose: {
                subject: `EVENT - ${response.data.title}`,
                message: `Barangay ${brgy} has updated an event named: ${response.data.title}.\n\n
                
                Event Details:\n 
                ${response.data.details}\n\n
    
                Event Date:
                ${response.data.date}\n\n
                `,
                go_to: "Events",
              },
              target: {
                user_id: null,
                area: brgy,
              },
              type: "Resident",
              banner: response.data.collections.banner,
              logo: response.data.collections.logo,
            };
          }

          console.log("Notify: ", notify);
          console.log("Result: ", response);

          const result = await axios.post(`${API_LINK}/notification/`, notify, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (result.status === 200) {
            setTimeout(() => {
              // HSOverlay.close(document.getElementById("hs-modal-editAnnouncement"));
              setSubmitClicked(false);
              setUpdatingStatus("success");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }, 1000);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setSubmitClicked(false);
      setUpdatingStatus("error");
      setError("An error occurred while creating the announcement.");
    }
  };

  return (
    <div>
      <div className="">
        <div
          id="hs-modal-editAnnouncement"
          className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center r"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
            <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
              {/* Header */}
              <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#4b7c80] to-[#21556d] overflow-hidden rounded-t-2xl">
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  MANAGE BARANGAY EVENT
                </h3>
              </div>

              <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
                <div className="flex mb-4 w-full flex-col md:flex-row sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0">
                  <div className="w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Logo
                    </label>
                    <div className="flex flex-col items-center space-y-2 relative">
                      <div className="w-full border border-gray-300">
                        <img
                          className="w-[200px] md:w-[250px] mx-auto lg:w-full md:h-[140px] lg:h-[250px] object-cover"
                          id="edit_logo"
                          alt="Current profile photo"
                        />
                      </div>
                      <label className="w-full bg-white border border-gray-300">
                        <span className="sr-only">Choose logo photo</span>
                        <input
                          type="file"
                          onChange={handleLogoChange}
                          name="logo"
                          accept="image/*"
                          value={!logo ? "" : logo.originalname}
                          disabled={!edit}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Banner
                    </label>
                    <div className="flex flex-col items-center space-y-2 relative">
                      <div className="w-full border border-gray-300">
                        <img
                          className="w-[200px] md:w-[250px] mx-auto lg:w-full md:h-[140px] lg:h-[250px] object-cover"
                          id="edit_banner"
                          alt="Current profile photo"
                        />
                      </div>
                      <label className="w-full bg-white border border-gray-300">
                        <span className="sr-only">Choose banner photo</span>
                        <input
                          type="file"
                          onChange={handleBannerChange}
                          disabled={!edit}
                          name="banner"
                          accept="image/*"
                          value={!banner ? "" : banner.originalname}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block sm:text-xs lg:text-sm text-gray-700 font-bold">
                    OPEN FOR ALL?
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOpen"
                      onChange={handleChange}
                      disabled={!edit}
                      checked={announcement.isOpen}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-400 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800" />
                  </label>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Announcement Title
                  </label>
                  <input
                    id="title"
                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    type="text"
                    name="title"
                    value={announcement && announcement.title}
                    disabled={!edit}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-bold text-gray-700 "
                  >
                    Details
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    name="details"
                    className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    placeholder="Enter announcement details..."
                    value={announcement && announcement.details}
                    disabled={!edit}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fee"
                  >
                    Date
                  </label>
                  <input
                    className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    id="date"
                    type="date"
                    name="date"
                    value={announcement && dateFormat(announcement.date)}
                    disabled={!edit}
                    onChange={handleChange}
                  />
                </div>

                <EditDropbox
                  edit={edit}
                  files={announcement && files}
                  setFiles={setFiles}
                  handleFileChange={handleFileChange}
                  handleSubmit={handleSubmit}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                {!edit ? (
                  <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                    <button
                      type="button"
                      className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                      onClick={handleOnEdit}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="h-[2.5rem] w-full py-1 px-6  gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                      data-hs-overlay="#hs-modal-editAnnouncement"
                    >
                      CLOSE
                    </button>
                  </div>
                ) : (
                  <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                    >
                      SAVE CHANGES
                    </button>
                    <button
                      type="button"
                      className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                      onClick={handleOnEdit}
                    >
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {submitClicked && <EditLoader updatingStatus="updating" />}
          {updatingStatus && (
            <EditLoader updatingStatus={updatingStatus} error={error} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageAnnouncementModal;
