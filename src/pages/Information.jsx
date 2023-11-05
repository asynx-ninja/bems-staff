import React from "react";
import { useEffect } from "react";
import { BsCamera } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import EditMissionModal from "../components/information/EditMissionModal";
import EditStoryModal from "../components/information/EditStoryModal";
import EditVisionModal from "../components/information/EditVisionModal";
import official from "../assets/sample/official.jpg";
import header from "/imgs/bg-header.png"

const Information = () => {
  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6">
      <div>
        <div className="bg-cover bg-center h-96 rounded-lg">
          <div className="relative flex justify-end">
            <label
              htmlFor="file_input"
              className="absolute mt-7 transform -translate-x-1/2 -translate-y-1/2 block text-transparent font-medium rounded-full text-sm"
            >
              <MdOutlineFileUpload size={40} style={{ color: "#ffffff" }} />
            </label>
            <input className="hidden" id="file_input" type="file" />
          </div>

          <div>
            <img
              src={header}
              alt=""
              className="w-full h-[150px] md:h-[300px] lg:h-[350px] xl:h-[470px] rounded-lg"
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
                    src={official}
                    alt=""
                    className="sm:w-[120px] md:w-56 rounded-full border-4 border-white mx-auto absolute left-0 right-0 sm:-top-[73px] md:-top-[6rem]"
                  />
                  <div className="absolute top-[19px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <label
                      htmlFor="file_input"
                      className="block text-transparent px-8 py-8 mb-[60px] md:mb-0  md:px-[83px] md:py-[87px] font-medium rounded-full text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60"
                    >
                      <BsCamera size={50} style={{ color: "#ffffff" }} />
                    </label>
                    <input className="hidden" id="file_input" type="file" />
                  </div>

                  <div className="flex justify-center items-end h-full">
                    <div className="text-center">
                      <h1 className="font-bold text-sm md:text-xl md:text-2xl xl:text-3xl text-white mb-10" style={{ letterSpacing: "0.4em" }}>BARANGAY SAN JOSE</h1>
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
                  <h1
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </h1>

                  <div className="self-end">
                    <button
                      type="button"
                      className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                      data-hs-overlay="#hs-edit-story-modal"
                    >
                      EDIT
                    </button>
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
                  <h1
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </h1>

                  <div className="self-end">
                    <button
                      type="button"
                      className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                      data-hs-overlay="#hs-edit-mission-modal"
                    >
                      EDIT
                    </button>
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
                  <h1
                    className="font-base text-black text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </h1>

                  <div className="self-end">
                    <button
                      type="button"
                      className="text-white w-36 bg-custom-green-button3 font-medium rounded-full text-sm m-2 py-2 px-10 text-center"
                      data-hs-overlay="#hs-edit-vision-modal"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditMissionModal />
      <EditStoryModal />
      <EditVisionModal />
    </div>
  );
};

export default Information;
