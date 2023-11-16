import React from "react";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

const AddServicesForm = () => {
  const [form, setForm] = useState({
    user_id: { display: "user id", checked: true, type: "text" },
    firstName: { display: "first name", checked: true, type: "text" },
    middleName: { display: "middle name", checked: true, type: "text" },
    lastName: { display: "last name", checked: true, type: "text" },
    suffix: { display: "suffix", checked: true, type: "text" },
    religion: { display: "religion", checked: false, type: "select" },
    email: { display: "email", checked: false, type: "email" },
    birthday: { display: "birthday and age", checked: false, type: "date" },
    contact: { display: "contact", checked: false, type: "text" },
    sex: { display: "sex", checked: false, type: "radio" },
    address: { display: "address", checked: false, type: "object" },
    occupation: { display: "occupation", checked: false, type: "select" },
    civil_status: {
      display: "civil status",
      checked: false,
      type: "select",
    },
  });

  const [inputFields, setInputFields] = useState([
    {
      variable: "",
      display: "",
      type: "",
      children: [{ value: "", option: "" }],
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        variable: "",
        display: "",
        type: "",
        children: [{ value: "", option: "" }],
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index] = {
      ...updatedInputFields[index],
      [e.target.name]: e.target.value,
    };

    if (
      updatedInputFields[index].type !== "radio" &&
      updatedInputFields[index].type !== "select"
    ) {
      console.log("bakit");
      updatedInputFields[index] = {
        ...updatedInputFields[index],
        children: [{ value: "", option: "" }],
      };
    }

    setInputFields(updatedInputFields);
  };

  const handleFormChange = (e, key) => {
    const newState = { ...form };
    newState[key].checked = e.target.checked;

    console.log("New State: ", newState);
    setForm(newState);
  };

  const removeInputField = (index) => {
    const updatedInputFields = [...inputFields];

    if (updatedInputFields.length === 1) console.log("Di pwede pars pag input");
    else {
      updatedInputFields.splice(index, 1);
      setInputFields(updatedInputFields);
    }
  };

  // OPTION FIELD
  const removeOptionField = (index, childrenIndex) => {
    const updatedInputFields = [...inputFields];

    if (updatedInputFields[index].children.length === 1)
      console.log("Di pwede pars pag option");
    else {
      updatedInputFields[index].children.splice(childrenIndex, 1);
      setInputFields(updatedInputFields);
    }
  };

  const addOptionField = (index) => {
    const updatedData = [...inputFields];
    updatedData[index].children.push({ value: "", option: "" });
    setInputFields(updatedData);
  };

  const handleOptionChange = (e, index, childrenIndex) => {
    const updatedData = [...inputFields];
    const updatedChildren = [...updatedData[index].children];
    updatedChildren[childrenIndex] = {
      ...updatedChildren[childrenIndex],
      [e.target.name]: e.target.value,
    };
    updatedData[index].children = updatedChildren;

    setInputFields(updatedData);
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/forms/?brgy=BALITE",
        {
          form: form,
          inputFields: inputFields,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div
        id="hs-create-serviceForm-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                CREATE SERVICE FORM
              </h3>
            </div>
            <div className="my-2">
              <div className="px-4 pb-4">
                <fieldset className="border-2 border-black">
                  <legend className="ml-2 px-2 text-lg font-bold">
                    BASIC INFORMATION
                  </legend>
                  <div className="px-4 py-2">
                    <h1 className="font-medium text-sm">
                      Please select which are you going to display the service
                      form details:
                    </h1>
                    <div className="grid grid-cols-3 mt-3">
                      {Object.entries(form).map(([key, value], idx) => {
                        return (
                          <label key={idx} className="font-medium text-sm">
                            <input
                              className="mr-2"
                              type="checkbox"
                              defaultChecked={value.checked}
                              onChange={(e) => handleFormChange(e, key)}
                            />
                            {value.display.toUpperCase()}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="px-4 w-full h-[300px] overflow-y-auto">
                <fieldset className="border-2 border-black">
                  <legend className="ml-2 px-2 text-lg font-bold">
                    CUSTOMIZE FORM
                  </legend>
                  <div className="flex justify-between items-center bg-green-800 mb-2 px-3 py-2 sticky top-0 mx-3 mt-2">
                    <h1 className="text-white font-bold text-sm">
                      ADD CUSTOMIZABLE INFORMATION
                    </h1>
                    <button
                      className=" text-white font-bold uppercase text-sm"
                      onClick={addInputField}
                    >
                      <IoIosAddCircleOutline
                        size={24}
                        className="text-white hover:text-yellow-500 rounded-full"
                      />
                    </button>
                  </div>
                  <div className="w-full px-3">
                    {inputFields.map((inputField, index) => (
                      <div
                        className="flex flex-col border-2 border-gray-600 px-2 mb-2"
                        key={index}
                      >
                        <div className="flex space-x-2  py-2">
                          <button
                            onClick={() => removeInputField(index)}
                            className=" border-black"
                          >
                            <TiDelete
                              size={24}
                              className="text-red-600 hover:text-red-800 rounded-full"
                            />
                          </button>
                          <input
                            type="text"
                            name="variable"
                            className="border border-1 border-black w-full text-sm"
                            value={inputField.variable}
                            placeholder="Variable Name (i.e: firstName, lastName)"
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                          />
                          <input
                            type="text"
                            name="display"
                            className="border border-1 border-black w-full text-sm"
                            value={inputField.display}
                            placeholder="Display Name (i.e: First Name, Last Name)"
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                          />
                          <select
                            name="type"
                            className="border border-1 border-black w-6/12 text-sm"
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                          >
                            <option value="" disabled>
                              Select Type
                            </option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="select">Select</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="file">File</option>
                          </select>
                        </div>
                        {(inputField.type === "radio" ||
                          inputField.type === "select") && (
                          <div className="ml-9">
                            <div className="flex justify-between items-center bg-green-800 mb-2 px-3 py-2 sticky top-0 ">
                              <h1 className="text-white font-bold text-sm">
                                ADD CUSTOMIZABLE OPTION
                              </h1>
                              <button
                                className=" text-white font-bold uppercase text-sm"
                                onClick={() => addOptionField(index)}
                              >
                                <IoIosAddCircleOutline size={24} />
                              </button>
                            </div>

                            {inputField.children.map((item, childrenIndex) => (
                              <div key={childrenIndex}>
                                <div className="flex space-x-2 mb-2 ">
                                  <button
                                    onClick={() =>
                                      removeOptionField(index, childrenIndex)
                                    }
                                    className="border px-2 border-black"
                                  >
                                    X
                                  </button>
                                  <input
                                    type="text"
                                    name="value"
                                    className="border border-1 border-black w-full text-sm"
                                    value={item.value}
                                    placeholder="Value (i.e: 1,2,3)"
                                    onChange={(event) =>
                                      handleOptionChange(
                                        event,
                                        index,
                                        childrenIndex
                                      )
                                    }
                                  />
                                  <input
                                    type="text"
                                    name="option"
                                    className="border border-1 border-black w-full text-sm"
                                    value={item.option}
                                    placeholder="Option Name (i.e: First Name, Last Name)"
                                    onChange={(event) =>
                                      handleOptionChange(
                                        event,
                                        index,
                                        childrenIndex
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                  onClick={handleSubmit}
                >
                  CREATE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-create-serviceForm-modal"
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
};

export default AddServicesForm;
