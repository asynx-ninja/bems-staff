import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropbox from "./Dropbox";
import API_LINK from '../../config/API'
function CreateAnnouncementModal({ brgy }) {
  const [announcement, setAnnouncement] = useState({
    title: "",
    details: "",
    date: "",
    brgy: brgy,
  });

  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var logoSrc = document.getElementById("logo");
    logoSrc.src =
      "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";

    var bannerSrc = document.getElementById("banner");
    bannerSrc.src =
      "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";
  }, []);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);

    var output = document.getElementById("logo");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);

    var output = document.getElementById("banner");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleChange = (e) => {
    setAnnouncement((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setFiles([...files, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      var formData = new FormData();

      const arr1 = [banner, logo];
      const newFiles = arr1.concat(files);

      for (let f = 0; f < newFiles.length; f += 1) {
        formData.append("files", newFiles[f]);
      }

      const obj = {
        title: announcement.title,
        details: announcement.details,
        date: announcement.date,
        brgy: brgy,
      }

      formData.append("announcement", JSON.stringify(obj));

      console.log("announcement", announcement)
      console.log("Logo", logo)
      console.log("Banner", banner)
      console.log("File", files)
      const result = await axios.post(
        `${API_LINK}/announcement/`,
        formData
      );

      if (result.status === 200) {
        var logoSrc = document.getElementById("logo");
        logoSrc.src =
          "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";

        var bannerSrc = document.getElementById("banner");
        bannerSrc.src =
          "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";
        setAnnouncement({
          title: "",
          details: "",
          date: "",
          brgy: "",
        });
        setLogo();
        setBanner();
        setFiles([]);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        id="hs-modal-add"
        class="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all m-3 smx-auto">
        <div class="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full lg:w-[900px]">
            {/* Header */}
            <div class="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <div class="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  class="font-bold text-white mx-auto md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  ANNOUNCEMENT CREATION
                </h3>
              </div>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 h-[800px] md:h-[750px] overflow-y-auto">
              <div className="flex mb-4 border w-full flex-col md:flex-row md:space-x-2">
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 pl-2"
                    htmlFor="username"
                  >
                    Logo
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full">
                      <img
                       className="w-[200px] md:w-[250px] mx-auto lg:w-full md:h-[140px] lg:h-[250px] object-cover"
                        id="logo"
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
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full border-l">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 pl-2"
                    htmlFor="username"
                  >
                    Banner
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full">
                      <img
                        className="w-[200px] md:w-[250px] mx-auto lg:w-full md:h-[140px] lg:h-[250px] object-cover"
                        id="banner"
                        alt="Current profile photo"
                      />
                    </div>
                    <label className="w-full bg-white border border-gray-300">
                      <span className="sr-only">Choose banner photo</span>
                      <input
                        type="file"
                        onChange={handleBannerChange}
                        name="banner"
                        accept="image/*"
                        value={!banner ? "" : banner.originalname}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </div>
                </div>
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  type="text"
                  value={announcement.title}
                  onChange={handleChange}
                  placeholder="Announcement title"
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
                  value={announcement.details}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter announcement details..."
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  name="date"
                  type="date"
                  value={announcement.date}
                  onChange={handleChange}
                />
              </div>
              <Dropbox
                files={files}
                setFiles={setFiles}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAnnouncementModal;
