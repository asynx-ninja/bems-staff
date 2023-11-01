import React from "react";
import { useEffect } from "react";
import bgmodal from "../assets/modals/bg-modal.png";
import officialimage from "../assets/sample/official.jpg";
import EditStoryModal from "../components/information/EditStoryModal";
import EditLogoModal from "../components/information/EditLogoModal";
import EditMissionModal from "../components/information/EditMissionModal";
import EditVisionModal from "../components/information/EditVisionModal";

const Information = () => {
  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem]  lg:mt-8 lg:mr-6">
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-col-reverse lg:flex-row mt-5">
          {/* Table Title */}
          <div className="bg-[#295141] py-2 lg:py-3.5 px-5 md:px-10 lg:px-10 rounded-tr-lg w-full lg:w-3/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-xl xl:text-2xl xl:pt-1 xxl:text-3xl xxl:pt-0 xxxl:text-4xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              BARANGAY INFORMATION
            </h1>
          </div>

          <div></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto xxxl:h-[640px] border h-full">
          <div className="flex flex-col lg:h-[680px] xxxl:h-full overflow-y-auto">
            <div className="flex flex-col lg:flex-row px-5 lg:space-x-3">
              {/* STORY */}
              <div className="flex flex-col border w-full lg:w-1/2 my-3 lg:my-5 xxxl:h-[19rem]">
                {/* Header */}
                <div class="bg-[#295141] overflow-hidden">
                  <div
                    class="flex justify-between items-center px-3 py-2 lg:py-3 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
                    style={{ backgroundImage: `url(${bgmodal})` }}
                  >
                    <h3
                      class="font-base text-white mx-auto lg:text-xl"
                      style={{ letterSpacing: "0.3em" }}
                    >
                      STORY
                    </h3>
                  </div>
                </div>

                {/* Story Details*/}
                <div>
                  <div class="relative mt-5 xl:mt-2 mx-6 bg-grey-100 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                    <div className="w-full text-center">
                      <h1
                        class="font-base text-black mx-auto text-sm h-36 lg:h-40 overflow-y-auto mb-5"
                        style={{ letterSpacing: "0.1em" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </h1>

                      <EditStoryModal />
                    </div>
                  </div>
                </div>
              </div>

              {/* LOGO */}
              <div className="flex flex-col border w-full lg:w-1/2 my-3 lg:my-5 lg:[22rem]">
                {/* Header */}
                <div class="bg-[#295141] overflow-hidden">
                  <div
                    class="flex justify-between items-center px-3 py-2 lg:py-3 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
                    style={{ backgroundImage: `url(${bgmodal})` }}
                  >
                    <h3
                      class="font-base text-white mx-auto lg:text-xl"
                      style={{ letterSpacing: "0.3em" }}
                    >
                      LOGO
                    </h3>
                  </div>
                </div>

                {/* Story Details*/}
                <div>
                  <div class="relative mt-5 mx-6 bg-grey-100 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                    <div className="w-full text-center">
                      <div className="w-full text-center">
                        <img
                          src={officialimage}
                          alt=""
                          className="h-32 w-32 md:h-52 md:w-52 lg:h-40 lg:w-40 mb-2 mx-auto rounded-xl"
                        />

                        <EditLogoModal />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row px-5 lg:space-x-3">
              {/* Mission */}
              <div className="flex flex-col border w-full lg:w-1/2 my-3 my-3 xxxl:h-64">
                {/* Header */}
                <div class="bg-[#295141] overflow-hidden">
                  <div
                    class="flex justify-between items-center px-3 py-2 lg:py-3 xl:py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
                    style={{ backgroundImage: `url(${bgmodal})` }}
                  >
                    <h3
                      class="font-base text-white mx-auto lg:text-xl"
                      style={{ letterSpacing: "0.3em" }}
                    >
                      MISSION
                    </h3>
                  </div>
                </div>

                {/* Story Details*/}
                <div>
                <div class="relative mt-5 xl:mt-2 mx-6 bg-grey-100 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                    <div className="w-full text-center">
                      <h1
                        class="font-base text-black mx-auto text-sm h-36 lg:h-28 overflow-y-auto mb-5"
                        style={{ letterSpacing: "0.1em" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                      </h1>

                      <EditMissionModal />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="flex flex-col border w-full lg:w-1/2 my-3 my-3 xxxl::h-64">
                {/* Header */}
                <div class="bg-[#295141] overflow-hidden">
                  <div
                    class="flex justify-between items-center px-3 py-2 lg:py-3 xl:py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform"
                    style={{ backgroundImage: `url(${bgmodal})` }}
                  >
                    <h3
                      class="font-base text-white mx-auto lg:text-xl"
                      style={{ letterSpacing: "0.3em" }}
                    >
                      VISION
                    </h3>
                  </div>
                </div>

                {/* Story Details*/}
                <div>
                <div class="relative mt-5 xl:mt-2 mx-6 bg-grey-100 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                    <div className="w-full text-center">
                      <h1
                        class="font-base text-black mx-auto text-sm h-36 lg:h-28 overflow-y-auto mb-5"
                        style={{ letterSpacing: "0.1em" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                      </h1>

                      <EditVisionModal />
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
