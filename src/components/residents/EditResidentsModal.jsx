import React from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import officialimage from "../../assets/sample/official.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import OccupationList from "./OccupationList";
import { LiaRandomSolid } from "react-icons/lia";

function EditResidentModal({ user, setUser }) {

  const religions = [
    "Roman Catholic",
    "Islam",
    "Iglesia ni Cristo",
    "Philippine Independent Church (Aglipayan)",
    "Seventh-day Adventist",
    "Bible Baptist Church",
    "United Church of Christ in the Philippines",
    "Jehovah Witnesses",
    "Church of Christ",
    "Born Again",
    "Other Religous Affiliation",
    // Add more religions here...
  ];

  const handleChange2 = (e) => {
    const { name, value, type } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
      age: name === "birthday" ? calculateAge(value) : prev.age,
    }));
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      password: "User12345",
    }));
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();

      var formData = new FormData();
      formData.append("users", JSON.stringify(user));

      const response = await axios.patch(
        `${API_LINK}/users/${user._id}`,
        formData
      );

      if (response.status === 200) {
        console.log("Update successful:", response.data);
        window.location.reload();
      } else {
        console.error("Update failed. Status:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const birthdayFormat = (date) => {
    const birthdate = date === undefined ? "" : date.substr(0, 10);
    return birthdate;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <div className="">
        <div
          id="hs-modal-editResident"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg w-full m-3 sm:mx-auto lg:ml-48 xl:ml-[300px] xxl:ml-[450px] xxxl:ml-[600px]">
            <div className="flex flex-col bg-white w-full shadow-sm rounded-t-3xl rounded-b-3xl w-full lg:w-[700px]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#295141] to-[#408D51] w-overflow-hidden rounded-t-2xl">
                <div className="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform">
                  <h3
                    className="font-base text-white mx-auto md:text-xl"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    EDIT RESIDENTS
                  </h3>
                </div>
              </div>
              <div className="mt-5 w-full">
                <form>
                  <div className="mb-4 px-4 flex h-[700px] md:h-full overflow-y-auto">
                    <div className="flex flex-col mb-1 w-full">
                      {/* Service Description */}

                      {/* Section 1 */}
                      <div class="relative p-1 pb-6 flex flex-col w-full h-full">
                        <b className="border-solid border-0 border-black/50 border-b-2  uppercase font-medium text-lg md:text-lg">
                          Personal Data
                        </b>
                        <div className="flex flex-col md:flex-row mt-2">
                          <div className="flex flex-col w-full">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              FIRST NAME
                            </h1>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.firstName}
                            />
                          </div>

                          <div className="flex flex-col mt-2 md:mt-0 md:ml-2 w-full">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              MIDDLE NAME
                            </h1>
                            <input
                              type="text"
                              id="middleName"
                              name="middleName"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.middleName}
                            />
                          </div>

                          <div className="flex flex-col mt-2 md:mt-0 md:ml-2 w-full">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              LAST NAME
                            </h1>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.lastName}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row mt-2">
                          <div className="flex flex-col w-full">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              SUFFIX
                            </h1>
                            <input
                              type="text"
                              id="suffix"
                              name="suffix"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.suffix}
                            />
                          </div>

                          <div className="flex flex-col ml-2 w-full">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              BIRTHDAY
                            </h1>
                            <input
                              type="date"
                              id="birthday"
                              name="birthday"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              value={birthdayFormat(user.birthday) || ""}
                            />
                          </div>

                          <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-3">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              AGE
                            </h1>
                            <input
                              type="text"
                              id="age"
                              name="age"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.age}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-2">
                          <div className="flex flex-col w-full md:w-[36%] lg:w-[40%]">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              E-MAIL
                            </h1>
                            <input
                              type="text"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.email}
                            />
                          </div>

                          <div className="flex flex-col mt-2 md:mt-0 md:ml-2 w-full md:w-[27%] lg:w-[32%]">
                            <h1
                              class="font-medium mb-1 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              CONTACT
                            </h1>
                            <input
                              type="text"
                              id="contact"
                              name="contact"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.contact}
                            />
                          </div>

                          <div className="w-full md:ml-4 md:w-[20%]">
                            <h1
                              class="font-medium mt-2 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              GENDER
                            </h1>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="Male"
                                name="sex"
                                value="Male"
                                onChange={handleChange}
                                checked={user.sex === "Male"}
                              />
                              <label htmlFor="Male" className="ml-2">
                                Male
                              </label>
                              <input
                                type="radio"
                                id="Female"
                                name="sex"
                                value="Female"
                                onChange={handleChange}
                                checked={user.sex === "Female"}
                                className="ml-4 md:ml-2 lg:ml-4"
                              />
                              <label htmlFor="Female" className="ml-2">
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <b className="border-solid border-0 border-black/50 border-b-2  uppercase font-medium text-lg md:text-lg">
                        Additional Data
                      </b>
                      <div>
                        <div className="flex flex-row mt-2 px-1 space-x-2">
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              CIVIL STATUS
                            </label>
                            <select
                              id="civil_status"
                              name="civil_status"
                              onChange={handleChange}
                              className="w-full p-2 border  rounded"
                            >
                              <option selected>-- Select Status --</option>
                              <option
                                value="Single"
                                selected={user.civil_status === "Single"}
                              >
                                Single
                              </option>
                              <option
                                value="Married"
                                selected={user.civil_status === "Married"}
                              >
                                Married
                              </option>
                              <option
                                value="Legally Separated"
                                selected={user.civil_status === "Legally Separated"}
                              >
                                Legally Separated
                              </option>
                              <option
                                value="Widowed"
                                selected={user.civil_status === "Widowed"}
                              >
                                Widowed
                              </option>
                            </select>
                          </div>

                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              RELIGION
                            </label>
                            <select
                              name="religion"
                              onChange={handleChange}
                              className="w-full p-2 border rounded"
                            >
                              <option value="">-- Select Religion --</option>
                              {religions.map((religion) => (
                                <option
                                  value={religion}
                                  selected={user.religion === religion}
                                >
                                  {religion}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-2 px-1 flex flex-col md:flex-row w-full">
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              OCCUPATION
                            </label>
                            <OccupationList
                              handleChange={handleChange}
                              user1={user}
                              setUser={setUser}
                            />
                          </div>

                          <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-3">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              STREET
                            </label>
                            <input
                              type="text"
                              id="street"
                              name="street"
                              onChange={handleChange}
                              className="block w-full p-2.5 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.address?.street}
                            />
                          </div>

                          <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-3">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              BARANGAY
                            </label>
                            <select
                              id="brgy"
                              name="brgy"
                              onChange={handleChange}
                              className="w-full p-2 border rounded"
                            >
                              <option>Select Barangay</option>
                              <option
                                value="Balite"
                                selected={user.address?.brgy === "BALITE"}
                              >
                                Balite
                              </option>
                              <option
                                value="Burgos"
                                selected={user.address?.brgy === "BURGOS"}
                              >
                                Burgos
                              </option>
                              <option
                                value="Geronimo"
                                selected={user.address?.brgy === "GERONIMO"}
                              >
                                Geronimo
                              </option>
                              <option
                                value="Macabud"
                                selected={user.address?.brgy === "MACABUD"}
                              >
                                Macabud
                              </option>
                              <option
                                value="Manggahan"
                                selected={user.address?.brgy === "MANGGAHAN"}
                              >
                                Manggahan
                              </option>
                              <option
                                value="Mascap"
                                selected={user.address?.brgy === "MASCAP"}
                              >
                                Mascap
                              </option>
                              <option
                                value="Puray"
                                selected={user.address?.brgy === "PURAY"}
                              >
                                Puray
                              </option>
                              <option
                                value="Rosario"
                                selected={user.address?.brgy === "ROSARIO"}
                              >
                                Rosario
                              </option>
                              <option
                                value="San Isidro"
                                selected={user.address?.brgy === "SAN ISIDRO"}
                              >
                                San Isidro
                              </option>
                              <option
                                value="San Jose"
                                selected={user.address?.brgy === "SAN JOSE"}
                              >
                                San Jose
                              </option>
                              <option
                                value="San Rafael"
                                selected={user.address?.brgy === "SAN RAFAEL"}
                              >
                                San Rafael
                              </option>
                            </select>
                          </div>

                          <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-3">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              CITY
                            </label>
                            <select
                              id="city"
                              name="city"
                              onChange={handleChange2}
                              className="w-full p-2 border rounded"
                              disabled
                            >
                              <option value="Rodriguez, Rizal">
                                Rodriguez, Rizal
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-col md:flex-row px-1">
                          <div className="w-full">
                            <h1
                              class="font-medium mt-2 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              REGISTERED VOTER?
                            </h1>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="true"
                                name="isVoter"
                                onChange={handleChange2}
                                checked={user.isVoter === true}
                                value="true"
                              />
                              <label htmlFor="Male" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                name="isVoter"
                                onChange={handleChange2}
                                value="false"
                                checked={user.isVoter === false}
                                className="ml-4"
                              />
                              <label htmlFor="No" className="ml-2">
                                No
                              </label>
                            </div>
                          </div>

                          <div className="w-full">
                            <h1
                              class="font-medium mt-2 text-black text-sm"
                              style={{ letterSpacing: "0.1em" }}
                            >
                              HEAD OF FAMILY?
                            </h1>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="true"
                                name="isHead"
                                onChange={handleChange2}
                                checked={user.isHead === true}
                                value="true"
                              />
                              <label htmlFor="Yes" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                name="isHead"
                                onChange={handleChange2}
                                value="false"
                                checked={user.isHead === false}
                                className="ml-4"
                              />
                              <label htmlFor="No" className="ml-2">
                                No
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-row px-1">
                          <div className="w-full">
                            <label
                              htmlFor="type"
                              className="block text-sm font-medium"
                            >
                              USER TYPE
                            </label>
                            <select
                              id="type"
                              name="type"
                              onChange={handleChange}
                              className="w-full p-1 pl-2 border rounded"
                            >
                              <option selected>-- Select User Type --</option>
                              <option
                                value="Admin"
                                selected={user.type === "Admin"}
                              >
                                Admin
                              </option>
                              <option
                                value="Staff"
                                selected={user.type === "Staff"}
                              >
                                Barangay Staff
                              </option>
                              <option
                                value="Resident"
                                selected={user.type === "Resident"}
                              >
                                Resident
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 3 */}
                      <b className="border-solid border-0 border-black/50 border-b-2  uppercase font-medium text-lg md:text-lg mt-4">
                        Account
                      </b>
                      <div className="flex flex-row mt-2 px-1">
                        <div className="flex flex-col w-full">
                          <h1
                            class="font-medium mb-1 text-black text-sm"
                            style={{ letterSpacing: "0.1em" }}
                          >
                            USERNAME
                          </h1>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            className="block w-full p-2 text-sm text-black bg-gray-200 rounded-lg"
                            value={user.username}
                            placeholder=""
                          />
                        </div>

                        <div className="flex flex-col ml-2 w-full">
                          <h1
                            class="font-medium mb-1 text-black text-sm"
                            style={{ letterSpacing: "0.1em" }}
                          >
                            PASSWORD
                          </h1>
                          <div className="flex flex-row w-full md:mr-2">
                            <button
                              className="bg-[#295141] p-2.5 rounded-l-md"
                              onClick={handleButtonClick}
                            >
                              <div className="w-full overflow-hidden">
                                <LiaRandomSolid
                                  size={15}
                                  style={{ color: "#ffffff" }}
                                />
                              </div>
                            </button>
                            <label htmlFor="password" className="sr-only">
                              password
                            </label>
                            <input
                              type="text"
                              name="password"
                              id="password"
                              onChange={handleChange}
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-r-lg"
                              value={user.password}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div className="flex justify-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  onClick={handleSave}
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-editResident"
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-editResident"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditResidentModal;
