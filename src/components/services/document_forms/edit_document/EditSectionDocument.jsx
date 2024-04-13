import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import API_LINK from "../../../../config/API";

const EditSectionDocument = ({brgy, service_id, document, setDocument, docDetail, setDocDetail}) => {
  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState({});
  const [selectedForm, setSelectedForm] = useState(null);
  const [formOptions, setFormOptions] = useState([]);
  const [formOptions2, setFormOptions2] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/forms/?brgy=${brgy}&service_id=${service_id}`
        );

        setDetails(response.data);

        // Check if the form_id is already present in the docDetail
        if (docDetail.form_id) {
          const selectedForm = details.find((item) => item.version === docDetail.form_id);

          // Update the selected form in the state
          setSelectedForm(selectedForm);

          // Update the form options based on the selectedForm
          updateFormOptions(selectedForm);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetch();
  }, [brgy, service_id, docDetail.form_id]); 



  const handleSelectChange = (e) => {
    const selectedVersion = e.target.value;
  
    // Find the selected form based on the version
    const selectedForm = details.find((item) => item.version === selectedVersion);
  
    // Update the form_id in the document state
    setDocDetail((prev) => ({
      ...prev,
      form_id: selectedForm ? selectedForm.version : "", // Set to empty string if not found
    }));
  
    // Update the selected form in the state
    setSelectedForm(selectedForm);

    // Update form options based on the selected form
    updateFormOptions(selectedForm);
  };

  const formatVariable = (value) => {
    const newValue = value.toLowerCase();

    return newValue.replace(/ /g, "_");
  };

  const addSectionField = () => {
    const updatedData = [...section, { inputs: "" }];
    setSection(updatedData);

    // Also update the document state to include the new section
    const updatedDocument = {
      ...docDetail,
      inputs: [...docDetail.inputs, ""],
    };
    setDocDetail(updatedDocument);
  };

  const handleSectionChange = (e, sectionIndex) => {
    const updatedSectionFields = [...section];
    updatedSectionFields[sectionIndex] = {
      ...updatedSectionFields[sectionIndex],
      inputs: e.target.value,
    };

    // Update the selected type in the document.inputs array
    const updatedDocument = {
      ...docDetail,
      inputs: docDetail.inputs.map((field, index) =>
        index === sectionIndex ? e.target.value : field
      ),
    };

    setDocDetail(updatedDocument);
    setSection(updatedSectionFields);
  };

  const removeSectionField = (sectionIndex) => {
    const updatedSectionFields = [...section];
    updatedSectionFields.splice(sectionIndex, 1);

    // Remove the corresponding input from the document.inputs array
    const updatedDocument = {
      ...docDetail,
      inputs: docDetail.inputs.filter((_, index) => index !== sectionIndex),
    };

    setDocDetail(updatedDocument);
    setSection(updatedSectionFields);
  };

  const updateFormOptions = (selectedForm) => {
    if (selectedForm) {
      const formOptions = Object.entries(selectedForm.form[0]).map(
        ([key, value], idx) => ({
          key,
          value: value.display,
          checked: value.checked, // Include the checked property
        })
      );

      // Filter formOptions to include only options with checked: true
      const filteredFormOptions = formOptions.filter(({ checked }) => checked);

      setFormOptions(filteredFormOptions);

      const formOptions2 = [].concat(
        ...selectedForm.form[1].map((item, idx) =>
          item.form.map((formItem, formIdx) => ({
            key: formatVariable(formItem.display), // Format key as needed
            value: formItem.display,
          }))
        )
      );


      setFormOptions2(formOptions2);
    } else {
      // If selectedForm is null, reset form options
      setFormOptions([]);
      setFormOptions2([]);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between w-full my-2">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 pl-1 sticky top-0 mx-3 mt-2 w-4/5">
          <label htmlFor="" className="font-bold uppercase text-sm xxl:text-md">
            Select which form to edit:
          </label>
          <select
            name="form"
            className="border border-1 border-gray-300 shadow bg-white w-full md:w-6/12 mt-2 md:mt-0 border p-2 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
            onChange={handleSelectChange}
            value={docDetail.form_id || ""}
          >
            <option>-- Select Form --</option>
            {details &&
              details.map((item, idx) => (
                <option key={idx} value={item.version}>
                  {item.form_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between items-center w-1/5 bg-pink-800 mb-2 px-3 py-2 sticky top-0 mr-3 mt-2 rounded-md">
          <h1 className="text-white font-bold text-xs xxl:text-sm">
            ADD INPUT
          </h1>
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
        {docDetail.inputs &&
          docDetail.inputs.map((section, sectionIndex) => (
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
                      {sectionIndex}
                    </label>

                    <select
                      name="inputs"
                      onChange={(e) => handleSectionChange(e, sectionIndex)}
                      value={section}
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

export default EditSectionDocument;
