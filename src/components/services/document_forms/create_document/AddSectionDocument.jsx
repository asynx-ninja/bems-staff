import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import API_LINK from "../../../../config/API";

const AddSectionDocument = ({ section, setSection, brgy, service_id }) => {
  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState({});
  const [selectedForm, setSelectedForm] = useState(null);
  const [formOptions, setFormOptions] = useState([]);
  const [formOptions2, setFormOptions2] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/forms/?brgy=${brgy}&service_id=${service_id}`
        );

        setDetails(response.data);

        if (selectedForm) {
          const formOptions = Object.entries(selectedForm.form[0]).map(
            ([key, value], idx) => ({
              key,
              value: value.display,
            })
          );

          setFormOptions(formOptions);

          const formOptions2 = [].concat(
            ...selectedForm.form[1].map((item, idx) =>
              item.form.map((formItem, formIdx) => ({
                key: `${idx}-${formIdx}`,
                value: formItem.display,
              }))
            )
          );

          console.log("formOptions2:", formOptions2);

          setFormOptions2(formOptions2);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetch();
  }, [brgy, service_id, selectedForm]);

  const handleFormChange = (e, key) => {
    const newState = detail.form[0];
    newState[key].checked = e.target.checked;

    setDetail((prev) => ({
      ...prev,
      form: [newState, detail.form[1]],
    }));
  };

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.value;
    setSelectedForm(details[selectedIndex]);
  };

  const formatVariable = (value) => {
    const newValue = value.toLowerCase();

    return newValue.replace(/ /g, "_");
  };

  const addSectionField = () => {
    const updatedData = [...section];
    updatedData.push({
      section_title: "",
      section_variable: "",
      form: [
        {
          variable: "",
          display: "",
          type: "text",
          accept: "",
          value: null,
          children: [],
        },
      ],
    });
    setSection(updatedData);
  };

  const handleSectionChange = (e, index) => {
    const updatedSectionFields = [...section];

    updatedSectionFields[index] = {
      ...updatedSectionFields[index],
      section_title: e.target.value,
      section_variable: formatVariable(e.target.value),
    };

    setSection(updatedSectionFields);
  };

  const removeSectionField = (index) => {
    const updatedSectionFields = [...section];
    updatedSectionFields.splice(index, 1);

    setSection(updatedSectionFields);
  };

  // INPUT FIELDS

  const addInputField = (index) => {
    const updatedData = [...section];
    updatedData[index].form.push({
      variable: "",
      display: "",
      type: "text",
      accept: "",
      value: null,
      children: [],
    });
    setSection(updatedData);
  };

  const handleInputChange = (e, sectionIndex, formIndex) => {
    const updatedInputFields = [...section];
    updatedInputFields[sectionIndex].form[formIndex] = {
      ...updatedInputFields[sectionIndex].form[formIndex],
      [e.target.name]:
        e.target.name === "variable"
          ? formatVariable(e.target.value)
          : e.target.value,
    };

    if (
      updatedInputFields[sectionIndex].form[formIndex].type !== "radio" &&
      updatedInputFields[sectionIndex].form[formIndex].type !== "select" &&
      updatedInputFields[sectionIndex].form[formIndex].type !== "checkbox"
    ) {
      updatedInputFields[sectionIndex].form[formIndex] = {
        ...updatedInputFields[sectionIndex].form[formIndex],
        children: [],
      };
    }

    if (updatedInputFields[sectionIndex].form[formIndex].type === "checkbox") {
      updatedInputFields[sectionIndex].form[formIndex] = {
        ...updatedInputFields[sectionIndex].form[formIndex],
        value: [],
      };
    }

    if (updatedInputFields[sectionIndex].form[formIndex].type !== "file") {
      updatedInputFields[sectionIndex].form[formIndex] = {
        ...updatedInputFields[sectionIndex].form[formIndex],
        accept: "",
      };
    }

    setSection(updatedInputFields);
  };

  const removeInputField = (sectionIndex, formIndex) => {
    const updatedData = [...section];
    updatedData[sectionIndex].form.splice(formIndex, 1);
    setSection(updatedData);
  };

  // OPTION FIELD

  const addOptionField = (sectionIndex, formIndex) => {
    const updatedData = [...section];
    updatedData[sectionIndex].form[formIndex].children.push({
      value: "",
      option: "",
    });
    setSection(updatedData);
  };

  const removeOptionField = (sectionIndex, formIndex, childrenIndex) => {
    const updatedData = [...section];
    updatedData[sectionIndex].form[formIndex].children.splice(childrenIndex, 1);
    setSection(updatedData);
  };

  const handleOptionChange = (e, sectionIndex, formIndex, childrenIndex) => {
    const updatedData = [...section];
    const updatedChildren = [
      ...updatedData[sectionIndex].form[formIndex].children,
    ];
    updatedChildren[childrenIndex] = {
      ...updatedChildren[childrenIndex],
      [e.target.name]: e.target.value,
    };
    updatedData[sectionIndex].form[formIndex].children = updatedChildren;

    setSection(updatedData);
  };

  return (
    <div>
      <div className="flex justify-between w-full my-2">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 pl-1 sticky top-0 mx-3 mt-2 w-4/5">
          <label htmlFor="" className="font-bold uppercase">
            Select which form to edit:
          </label>
          <select
            name="form"
            className="border border-1 border-gray-300 shadow bg-white w-full md:w-6/12 mt-2 md:mt-0 border p-2 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
            onChange={handleSelectChange}
            defaultValue={""}
          >
            <option value="" disabled>
              Select Form
            </option>
            {details &&
              details.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.version}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between items-center w-1/5 bg-pink-800 mb-2 px-3 py-2 sticky top-0 mr-3 mt-2 rounded-md">
          <h1 className="text-white font-bold text-sm">ADD INPUT</h1>
          <button
            className=" text-white font-bold uppercase text-sm"
            onClick={addSectionField}
          >
            <IoIosAddCircleOutline
              size={24}
              className="text-white hover:text-yellow-500 rounded-full"
            />
          </button>
        </div>
      </div>

      <div className="w-full px-3">
        {section &&
          section.map((section, sectionIndex) => (
            <div key={sectionIndex} className="rounded-lg mb-2 w-full">
              {/* DROPDOWN */}
              <div
                className={`hs-dropdown relative bg-gradient-to-r bg-[#036666] pb-2 text-white flex flex-col justify-between items-centertext-sm px-3 py-1 md:text-base lg:text-lg rounded-lg`}
              >
                <button
                  id="hs-unstyled-collapse"
                  data-hs-collapse={`#hs-statistics-dashboard-${sectionIndex}`}
                  className="hs-collapse-toggle justify-between flex items-center w-full gap-x-3 text-sm rounded-md"
                >
                  <div className="flex items-center gap-x-3 py-2 w-full inline-flex items-center text-base rounded-lg">
                    <label className="px-2 border rounded-xl">
                      {sectionIndex + 1}
                    </label>

                    <select
                      name="type"
                      // onChange={handleChange}
                      className="shadow uppercase placeholder-gray-400 font-medium appearance-none border w-full p-1 text-sm bg-white border-green-500 text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled>
                        -- Select Type --
                      </option>
                      {formOptions &&
                        formOptions.map(({ key, value }, idx) => (
                          <option className="uppercase" key={idx} value={key}>
                            {value}
                          </option>
                        ))}

                      {formOptions2 &&
                        formOptions2.map(({ key, value }, idx) => (
                          <option className="uppercase" key={idx} value={key}>
                            {value}
                          </option>
                        ))}
                    </select>

                    <button
                      onClick={() => removeSectionField(sectionIndex)}
                      className=" border-black bg-red-500 hover:bg-white rounded-full"
                    >
                      <TiDelete
                        size={25}
                        className="text-white hover:text-red-500 hover:border-2  rounded-full"
                      />
                    </button>
                  </div>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddSectionDocument;
