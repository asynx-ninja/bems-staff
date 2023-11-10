import React from "react";
import EditResidentModal from "./EditResidentsModal";

function ViewResidentModal({ user, setUser }) {
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
    const birthdate = date === undefined ? "" : date.substr(0, 10)
    return birthdate;
}
  return (
    <div>
      <div className="">
        <div
          id="hs-modal-viewResident"
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
                    VIEW RESIDENTS
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.firstName}
                              readOnly
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.middleName}
                              readOnly
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.lastName}
                              readOnly
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.suffix}
                              readOnly
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
                              type="text"
                              id="birthday"
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder="mm/dd/yyyy"
                              value={birthdayFormat(user.birthday) || ""}
                              readOnly
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.email}
                              readOnly
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
                              className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.contact}
                              readOnly
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
                                value="Male"
                                checked={user.sex === "Male"}
                              />
                              <label htmlFor="Male" className="ml-2">
                                Male
                              </label>
                              <input
                                type="radio"
                                id="Female"
                                value="Female"
                                className="ml-4 md:ml-2 lg:ml-4"
                                checked={user.sex === "Female"}
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
                              className="w-full p-2 border rounded"
                              disabled
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
                              className="w-full p-2 border rounded"
                              disabled
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
                          <div className="flex flex-col w-full md:w-1/3 ">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              OCCUPATION
                            </label>
                            <input
                              type="text"
                              id="occupation"
                              className="block w-full p-2.5 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.occupation}
                              readOnly
                            />
                          </div>

                          <div className="flex flex-col w-full md:w-2/3 mt-2 md:mt-0 md:ml-3">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium"
                            >
                              ADDRESS
                            </label>
                            <input
                              type="text"
                              id="street"
                              className="block w-full p-2.5 text-sm text-black bg-gray-200 rounded-lg"
                              placeholder=""
                              value={user.address?.street + ", " + user.address?.brgy + ", " + user.address?.city}
                              readOnly
                            />
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
                                value="true"
                                checked={user.isVoter === true}
                              />
                              <label htmlFor="isVoterTrue" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                value="false"
                                checked={user.isVoter === false}
                                className="ml-4"
                              />
                              <label htmlFor="isVoterFalse" className="ml-2">
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
                                value="true"
                                checked={user.isHead === true}
                              />
                              <label htmlFor="Yes" className="ml-2">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="false"
                                value="false"
                                className="ml-4"
                                checked={user.isHead === false}
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
                              className="w-full p-1 pl-2 border rounded"
                              disabled
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
                            className="block w-full p-2 text-sm text-black bg-gray-200 rounded-lg"
                            placeholder=""
                            value={user.username}
                            readOnly
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
                            <label htmlFor="password" className="sr-only">
                              password
                            </label>
                            <input
                              type="text"
                              id="password"
                              className="block w-full p-2 text-sm text-black bg-gray-200 rounded-lg"
                              readOnly
                              value={"User12345"}
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
                  className="h-[2.5rem] w-[9rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-editResident"
                >
                  EDIT RESIDENT
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-[8rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-viewResident"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
          ;
        </div>
      </div>
      <EditResidentModal user={user} setUser={setUser} />
    </div>
  );
}

export default ViewResidentModal;
