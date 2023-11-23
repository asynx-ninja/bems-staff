import React from "react";
import { useEffect } from "react";
import { BsCamera } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import { useState } from "react";

const Information = () => {
  const [information, setInformation] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [brgyInformation, setBrgyInformation] = useState({});
  const [isEditingMode, setisEditingMode] = useState(false);
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const renameFile = (file, newName) => {
    const newFile = new File([file], newName, { type: file.type });
    return newFile;
  };

  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";

    const fetchInformation = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/brgyinfo/?brgy=${brgy}&archived=true`
        );

        console.log("Response:", response);

        if (response.status === 200) {
          setInformation(response.data[0]);
          var logoSrc = document.getElementById("edit_logo");
          logoSrc.src = response.data[0].logo.link;
          var bannerSrc = document.getElementById("edit_banner");
          bannerSrc.src = response.data[0].banner.link;
        } else {
          setInformation({});
        }
      } catch (error) {
        console.error("Error fetching information:", error);
        setInformation({});
      }
    };

    fetchInformation();
  }, [brgy]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (logo) formData.append("files", logo);
      if (banner) formData.append("files", banner);

      formData.append("brgyinfo", JSON.stringify(information));

      const result = await axios.patch(
        `${API_LINK}/brgyinfo/${brgy}`,
        formData
      );

      // if (!response.ok) {
      //   throw new Error("Info is not updated");
      // }

      console.log(result);
      window.location.reload();
      // setBrgyInformation({});
    } catch (error) {
      console.error(error);
    }
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
    setInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mx-4">
      <div>
        <div className="bg-cover bg-center h-96 rounded-lg">
          <div className="relative flex justify-end">
            {isEditingMode && (
              <label
                htmlFor="banner_input"
                className="absolute mt-7 transform -translate-x-1/2 -translate-y-1/2 block text-transparent font-medium rounded-full text-sm"
              >
                <MdOutlineFileUpload size={40} style={{ color: "#ffffff" }} />
              </label>
            )}
            {isEditingMode && (
              <div>
                <input
                  type="file"
                  id="banner_input"
                  onChange={handleBannerChange}
                  name="banner"
                  accept="image/*"
                  value={!banner ? "" : banner.originalname}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div>
            <img
              id="edit_banner"
              className="w-full h-[150px] md:h-[300px] lg:h-[350px] xl:h-[470px] rounded-lg object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center sm:-mt-[260px] md:-mt-[220px] lg:-mt-[140px] xl:-mt-[60px]  h-auto md:mx-4 lg:mx-5">
          <div className="w-full md:w-96 h-full lg:my-0 lg:mx-5 relative rounded-[28px] mx-auto bg-white shadow-2xl md:w-full flex flex-col">
            <div className="h-auto rounded-lg">
              <div className="bg-gradient-to-r from-[#295141] to-[#408D51] rounded-t-[28px]">
                <div
                  className="relative h-32 md:h-60 mx-auto justify-center items-center rounded-t-lg"
                  style={{
                    backgroundImage: 'url("./public/imgs/header-bg.png")',
                  }}
                >
                  <img
                    id="edit_logo"
                    className="w-[120px] bg-white object-cover md:h-56 bg-cover md:w-56 rounded-full border-4 border-white mx-auto absolute left-0 right-0 sm:-top-[73px] md:-top-[6rem]"
                  />

                  {isEditingMode && (
                    <div className="absolute top-[19px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <label
                        htmlFor="logo_input"
                        className="block text-transparent px-8 py-8 mb-[60px] md:mb-0  md:px-[83px] md:py-[87px] font-medium rounded-full text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60"
                      >
                        <BsCamera size={50} style={{ color: "#ffffff" }} />
                      </label>
                      <input
                        id="logo_input"
                        type="file"
                        onChange={handleLogoChange}
                        name="logo"
                        accept="image/*"
                        value={!logo ? "" : logo.originalname}
                        className="hidden"
                      />
                    </div>
                  )}

                  <div className="flex justify-center items-end h-full">
                    <div className="text-center">
                      <h1
                        className="font-bold text-sm md:text-xl md:text-2xl xl:text-3xl text-white mb-10"
                        style={{ letterSpacing: "0.4em" }}
                      >
                        BARANGAY {brgy}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row mx-8 my-8 xxxl:mx-36 xxxl:my-10">
                <div className="w-full md:w-1/3 py-5 md:py-0 flex items-center justify-center bg-gradient-to-r from-[#295141] to-[#408D51] rounded-t-[20px] md:rounded-t-[0px] md:rounded-tl-[20px] md:rounded-bl-[20px]">
                  <h1
                    className="text-center text-white text-2xl font-bold"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    STORY
                  </h1>
                </div>
                <div className="w-full md:w-2/3 px-6 py-4 border md:rounded-tr-[20px] rounded-b-[20px] md:rounded-br-[20px] flex flex-col">
                  <textarea
                    name="story"
                    readOnly={!isEditingMode}
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em", whiteSpace: "pre-line" }}
                    value={information.story}
                    onChange={handleChange}
                  />

                  <div className="self-end">
                    {/* <button
                      type="button"
                      className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                      data-hs-overlay="#hs-edit-story-modal"
                      onClick={() =>
                        setBrgyInformation({ ...information, brgy: brgy })
                      }
                    >
                      EDIT
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row mx-8 my-8 xxxl:mx-36 xxxl:my-10">
                <div className="w-full md:w-1/3 py-5 md:py-0 flex items-center justify-center bg-gradient-to-r from-[#295141] to-[#408D51] rounded-t-[20px] md:rounded-t-[0px] md:rounded-tl-[20px] md:rounded-bl-[20px]">
                  <h1
                    className="text-center text-white text-2xl font-bold"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    MISSION
                  </h1>
                </div>
                <div className="w-full md:w-2/3 px-6 py-4 border md:rounded-tr-[20px] rounded-b-[20px] md:rounded-br-[20px] flex flex-col">
                  <textarea
                    readOnly={!isEditingMode}
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em", whiteSpace: "pre-line" }}
                    value={information.mission}
                    name="mission"
                    onChange={handleChange}
                  />

                  <div className="self-end">
                    {/* <button
                      type="button"
                      className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                      data-hs-overlay="#hs-edit-mission-modal"
                      onClick={() => setBrgyInformation({ ...information })}
                    >
                      EDIT
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row mx-8 my-8 xxxl:mx-36 xxxl:my-10">
                <div className="w-full md:w-1/3 py-5 md:py-0 flex items-center justify-center bg-gradient-to-r from-[#295141] to-[#408D51] rounded-t-[20px] md:rounded-t-[0px] md:rounded-tl-[20px] md:rounded-bl-[20px]">
                  <h1
                    className="text-center text-white text-2xl font-bold"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    VISION
                  </h1>
                </div>
                <div className="w-full md:w-2/3 px-6 py-4 border md:rounded-tr-[20px] rounded-b-[20px] md:rounded-br-[20px] flex flex-col">
                  <textarea
                    readOnly={!isEditingMode}
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em", whiteSpace: "pre-line" }}
                    value={information.vision}
                    name="vision"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex justify-center py-6 text-white">
                {isEditingMode ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="bg-green-800 px-7 py-2 rounded-xl mr-2"
                    >
                      Save changes
                    </button>
                    <button
                      className="bg-red-800 px-7 py-2 rounded-xl mr-2"
                      onClick={() => setisEditingMode(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                    onClick={() => setisEditingMode(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <EditMissionModal
        brgyInformation={brgyInformation}
        setBrgyInformation={setBrgyInformation}
        updateInfo={handleSaveChanges}
      />
      <EditStoryModal
        brgyInformation={brgyInformation}
        setBrgyInformation={setBrgyInformation}
        updateInfo={handleSaveChanges}
        information={information}
        brgy={brgy}
      />
      <EditVisionModal
        brgyInformation={brgyInformation}
        setBrgyInformation={setBrgyInformation}
        updateInfo={handleSaveChanges}
      /> */}
    </div>
  );
};

export default Information;
