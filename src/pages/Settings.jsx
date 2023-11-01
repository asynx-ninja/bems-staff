import React from "react";
import { useEffect } from "react";
import profilePicture from "/imgs/bg-header.png";
import { FaCamera } from "react-icons/fa";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6">
      <div className="flex flex-col w-full">
        <b className="border-solid border-0 border-black border-b-2 pb-2 mb-3 uppercase font-heavy text-lg md:text-xl">
          Profile Settings
        </b>
        <div className="flex sm:flex-col-reverse lg:flex-row w-full lg:space-x-4">
          <div className="flex lg:flex-row sm:w-full lg:w-9/12">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  First name
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="First name"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Middle name
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Middle name"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Last name
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Last name"
                  aria-describedby="hs-input-helper-text"
                />
              </div>

              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Suffix
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Suffix"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Age
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Suffix"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Birthday
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Birthday"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div className="lg:col-span-2">
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Birthplace
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Birthplace"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Address
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Select Barangay"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Street
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="Street"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  House Number
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="House #"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="you@example.com"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Phone number
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  placeholder="#"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label
                  htmlFor="input-label-with-helper-text"
                  className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                  Occupation
                </label>
                <input
                  id="input-label-with-helper-text"
                  className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  aria-describedby="hs-input-helper-text"
                />
              </div>
              <div>
                <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                  * Working on Rodriguez Rizal?
                </label>
                <div className="flex items-center">
                  <input type="radio" />
                  <label htmlFor="male" className="ml-2">
                    Yes
                  </label>
                  <input type="radio" className="ml-4" />
                  <label className="ml-2">No</label>
                </div>
              </div>
              <div>
                <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                  * Registered Voter
                </label>
                <div className="flex items-center">
                  <input type="radio" />
                  <label htmlFor="male" className="ml-2">
                    Yes
                  </label>
                  <input type="radio" className="ml-4" />
                  <label className="ml-2">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-3/12">
            <div className="relative sm:w-5/12 lg:w-full m-auto">
              <img
                src={profilePicture}
                className="w-full sm:h-[200px] sm:mb-3 lg:mb-0 border-[5px] border-[#295141] object-cover"
                alt=""
              />
              <button className="absolute bottom-0 right-0 bg-[#295141] text-white px-3 py-2">
                <FaCamera size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
