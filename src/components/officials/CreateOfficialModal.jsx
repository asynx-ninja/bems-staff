import React from "react";
import { useState, useEffect } from "react";
import bgmodal from "../../assets/modals/bg-modal2.png";
import officialimage from "../../assets/sample/official.jpg";
import { IoIosAdd } from "react-icons/io";
import API_LINK from "../../config/API";
import axios from "axios";

function CreateOfficialModal({ brgy }) {
  const [official, setOfficial] = useState({
    name: "",
    position: "",
    fromYear: "",
    toYear: "",
    brgy: brgy,
  });

  const [pfp, setPfp] = useState();

  useEffect(() => {
    var imageSrc = document.getElementById("add_pfp");
    imageSrc.src =
      "https://thenounproject.com/api/private/icons/4322871/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", pfp);

      const obj = {
        name: official.name,
        position: official.position,
        fromYear: official.fromYear,
        toYear: official.toYear,
      };

      formData.append("official", JSON.stringify(obj));

      const result = await axios.post(
        `${API_LINK}/brgyofficial/?brgy=${brgy}`,
        formData
      );

      if (result.status === 200) {
        console.log("Official added successfully!");
        setOfficial({
          name: "",
          position: "",
          fromYear: "",
          toYear: "",
          brgy: "",
        });
        setPfp(null);
      }
    } catch (err) {
      console.error("Error adding official:", err);
    }
  };

  const handlePfpChange = (e) => {
    setPfp(e.target.files[0]);

    var output = document.getElementById("add_pfp");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div>
      <div
        id="hs-create-official-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center lg:ml-10 xxl:ml-0"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col w-full lg:w-[700px] bg-white shadow-sm overflow-y-auto rounded-t-3xl rounded-b-3xl">
            {/* Header */}
            <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <div className="flex justify-between items-center px-3 py-5 md:p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  className="font-base text-white mx-auto md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  CREATE NEW OFFICIAL
                </h3>
              </div>
            </div>

            {/* Modal Details */}
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row border mb-1">
                  {/* Service Description */}
                  <div className="relative mt-4 lg:ml-6 overflow-y-auto flex flex-col w-full lg:w-1/2">
                    {/* Modal Images */}
                    <div className="relative w-full overflow-y-auto">
                      <div className="relative w-full"></div>
                      <div>
                        <img
                          id="add_pfp"
                          alt=""
                          className="h-32 w-32 md:h-52 md:w-52 lg:h-60 lg:w-60 mx-auto rounded-lg"
                        />
                      </div>
                    </div>

                    <input
                      className="block mt-5 w-64 md:w-96 mx-auto lg:w-full text-sm text-black rounded-lg cursor-pointer bg-gray-100 "
                      type="file"
                      onChange={handlePfpChange}
                      name="pfp"
                      accept="image/*"
                      value={!pfp ? "" : pfp.originalname}
                    />
                  </div>

                  {/* Request Information */}
                  <div className="relative mt-4 p-4 lg:mx-6 p-2 pb-6 overflow-y-auto flex flex-col w-full lg:w-1/2 h-full rounded-lg">
                    <h1
                      className="font-medium mb-1 text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      NAME OF THE OFFICIAL
                    </h1>
                    <input
                      type="text"
                      id="name"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      value={official.name}
                      onChange={(e) =>
                        setOfficial({ ...official, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Other info */}
                <div className="relative mt-5 mx-6 overflow-y-auto flex flex-col md:flex-row md:space-x-3">
                  {/* Position and Service Rendered */}
                  <div className="w-full lg:w-1/2">
                    <h1
                      className="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      POSITION
                    </h1>
                    <select
                      id="position"
                      className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                      onChange={(e) =>
                        setOfficial({ ...official, position: e.target.value })
                      }
                      value={official.position}
                      required
                    >
                      <option value="" disabled>
                        Select Position
                      </option>
                      <option value="Barangay Chairman">
                        Barangay Chairman
                      </option>
                      <option value="Barangay Kagawad">Barangay Kagawad</option>
                      <option value="SK Chairman">SK Chairman</option>
                      <option value="SK Kagawad">SK Kagawad</option>
                    </select>
                  </div>
                  <div className="w-full lg:w-1/2 sm:mt-2 md:mt-0">
                    <h1
                      className="font-base text-black mx-auto text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      SERVICE RENDERED
                    </h1>

                    {/* Date 1 */}
                    <div className="flex flex-row">
                      <label
                        htmlFor="from_year"
                        className=" w-[7rem] flex items-center"
                      >
                        From year:{" "}
                      </label>
                      <input
                        type="month"
                        className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                        id="from_year"
                        onChange={(e) =>
                          setOfficial({ ...official, fromYear: e.target.value })
                        }
                        value={official.fromYear}
                        required
                      />
                    </div>
                    {/* Date 2 */}
                    <div className="flex flex-row">
                      <label
                        htmlFor="To_year"
                        className=" w-[6rem] flex items-center"
                      >
                        To year:{" "}
                      </label>
                      <input
                        type="month"
                        className="block w-full mt-2 p-1 text-sm text-gray-900 bg-gray-100 rounded-lg"
                        id="To_year"
                        onChange={(e) =>
                          setOfficial({ ...official, toYear: e.target.value })
                        }
                        value={official.toYear}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                className="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
                data-hs-overlay="#hs-create-official-modal"
                onClick={handleSubmit}
              >
                SAVE CHANGES
              </button>
              <button
                type="button"
                className="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-create-official-modal"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </div>
  );
}

export default CreateOfficialModal;