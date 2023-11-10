import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import API_LINK from "../../config/API";
import OccupationList from "./OccupationList";
import { LiaRandomSolid } from "react-icons/lia";

function AddResidentModal({ brgy }) {
  const [user, setUser] = useState({
    user_id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    religion: "",
    email: "",
    birthday: "",
    age: "",
    contact: "",
    sex: "",
    address: "",
    occupation: "",
    civil_status: "",
    type: "",
    isVoter: "",
    isHead: "",
    username: "",
    password: "",
    isArchived: false,
    isApproved: "Registered",
    city: "Rodriguez, Rizal",
    brgy: brgy,
  });

  const handleButtonClick = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      password: "User12345",
    }));
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const calculatedAge = calculateAge(user.birthday);

      const obj = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        suffix: user.suffix,
        religion: user.religion,
        email: user.email,
        birthday: user.birthday,
        age: calculatedAge,
        contact: user.contact,
        sex: user.sex,
        address: { street: user.street, brgy: user.brgy, city: user.city },
        occupation: user.occupation,
        civil_status: user.civil_status,
        type: user.type === "" ? "Resident" : user.type,
        isVoter: user.isVoter,
        isHead: user.isHead,
        isArchived: user.isArchived,
        username: user.username,
        password: user.password,
      };
      const result = await axios.post(`${API_LINK}/users/`, obj);

      console.log(result);

      if (result.status === 200) {
        setUser({
          user_id: "",
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          religion: "",
          email: "",
          birthday: "",
          age: "",
          contact: "",
          sex: "",
          address: "",
          occupation: "",
          civil_status: "",
          type: "",
          isVoter: "",
          isHead: "",
          username: "",
          password: "",
          isArchived: "",
          isApproved: "",
          city: "Rodriguez, Rizal",
          brgy: brgy,
        });
        //window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          id="hs-modal-addResident"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all m-3 smx-auto">
            <div className="flex flex-col bg-white w-full shadow-sm rounded-t-3xl rounded-b-3xl w-full lg:w-[700px]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#295141] to-[#408D51] w-overflow-hidden rounded-t-2xl">
                <div className="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform">
                  <h3
                    className="font-base text-white mx-auto md:text-xl"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    ADD RESIDENTS
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
                              placeholder="mm/dd/yyyy"
                              value={birthdayFormat(user.birthday) || ""}
                            />
                          </div>

                          <div className="flex flex-col  ml-2 mt-0 md:ml-2 md:w-[30%]">
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
                              value={calculateAge(user.birthday) || ""}
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
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Legally Separated">
                                Legally Separated
                              </option>
                              <option value="Widowed">Widowed</option>
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
                                <option value={religion}>{religion}</option>
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
                            <OccupationList handleChange={handleChange} />
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
                              <option selected>Select Barangay</option>
                              <option value="Balite">Balite</option>
                              <option value="Burgos">Burgos</option>
                              <option value="Geronimo">Geronimo</option>
                              <option value="Macabud">Macabud</option>
                              <option value="Manggahan">Manggahan</option>
                              <option value="Mascap">Mascap</option>
                              <option value="Puray">Puray</option>
                              <option value="Rosario">Rosario</option>
                              <option value="San Isidro">San Isidro</option>
                              <option value="San Jose">San Jose</option>
                              <option value="San Rafael">San Rafael</option>
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
                              onChange={handleChange}
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
                                onChange={handleChange}
                                value="true"
                              />
                              <label htmlFor="Male" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                name="isVoter"
                                onChange={handleChange}
                                value="false"
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
                                onChange={handleChange}
                                value="true"
                              />
                              <label htmlFor="Yes" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                name="isHead"
                                onChange={handleChange}
                                value="false"
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
                              ACTIVE USER
                            </h1>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="false"
                                name="isArchived"
                                onChange={() =>
                                  handleChange2("isArchived", false)
                                }
                                value="false"
                              />
                              <label htmlFor="Yes" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="true"
                                name="isArchived"
                                onChange={() =>
                                  handleChange2("isArchived", true)
                                }
                                value="true"
                                className="ml-4"
                              />
                              <label htmlFor="No" className="ml-2">
                                No
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* <div className="mt-2 flex flex-row px-1">
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
                              disabled
                            >
                              {/*<option selected>-- Select User Type --</option>
                              <option value="Admin">Admin</option>
                              <option value="Staff">Staff</option>
                              <option value="Resident" selected>Resident</option>
                            </select>
                          </div>
                        </div> */}
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
                  type="button"
                  onClick={handleSubmit}
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-addResident"
                >
                  ADD
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-addResident"
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

export default AddResidentModal;
