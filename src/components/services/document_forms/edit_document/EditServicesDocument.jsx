import React, { useState, useEffect } from "react";
import axios from "axios";
import API_LINK from "../../../../config/API";
import EditSectionDocument from "./EditSectionDocument";
import EditFormLoader from "../../loaders/EditFormLoader";
import GetBrgy from "../../../GETBrgy/getbrgy";
import { useRef } from "react";

const EditServicesDocument = ({ service_id, service_title, brgy, officials, documentForm, setDocumentForm, serviceForm, setServiceForm, socket, id }) => {
  const information = GetBrgy(brgy);
  const modal = useRef()
  const [details, setDetails] = useState([]);
  const [docDetails, setDocDetails] = useState([]);
  const [docDetail, setDocDetail] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState({
    form_id: "",
    doc_title: "",
    details: "",
    type: "",
    punong_brgy: "",
    witnessed_by: "",
    inputs: [""],
    email: "",
    address: "",
    tel: "",
  });
  const [selectedDocIndex, setSelectedDocIndex] = useState("");

  // useEffect(() => {
  //   const fetchForms = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_LINK}/forms/?brgy=${brgy}&service_id=${service_id}`
  //       );
  //       setDetails(response.data);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   fetchForms();
  // }, [brgy, service_id]);

  useEffect(() => {
    setDocDetails(documentForm)
    setDetails(serviceForm)
  }, [documentForm, serviceForm]);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_LINK}/document/?brgy=${brgy}&service_id=${service_id}`
  //       );
  //       setDocDetails(response.data);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   fetchDocuments();
  // }, [brgy, service_id]);

  const handleFormChange = (e, key) => {
    const newState = docDetail.form[0];
    newState[key].checked = e.target.checked;

    setDocDetail((prev) => ({
      ...prev,
      form: [newState, docDetail.form[1]],
    }));
  };

  const handleSubmit = async () => {
    try {
      // setSubmitClicked(true);
      setError(null); // Reset error state

      const response = await axios.patch(
        `${API_LINK}/document/`,
        {
          document: docDetail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const getIP = async () => {
          const response = await fetch(
            "https://api64.ipify.org?format=json"
          );
          const data = await response.json();
          return data.ip;
        };

        const ip = await getIP(); // Retrieve IP address

        const logsData = {
          action: "Updated",
          details: `A document form`,
          ip: ip,
        };

        const logsResult = await axios.post(
          `${API_LINK}/act_logs/add_logs/?id=${id}`,
          logsData
        );
        if (logsResult.status === 200) {
          socket.emit("send-edit-service-form", response.data);
          setSubmitClicked(false);
          setUpdatingStatus("success");
          setTimeout(() => {
            setUpdatingStatus(null);

            HSOverlay.close(
              modal.current
            );
          }, 3000);
        }
      }
    } catch (err) {
      // setSubmitClicked(false);
      setUpdatingStatus("error");
      setError(err.message);
      setSubmitClicked(false);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedDocIndex(e.target.value);
    setDocDetail(docDetails[e.target.value]);
  };

  const handleChange = (e) => {
    setDocDetail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetDocDetail = () => {
    setDocDetail({});
    setSelectedDocIndex("");
  };

  return (
    <div>
      <div
        ref={modal}
        id="hs-edit-serviceDocument-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            <div className="py-5 px-3 flex justify-between items-center overflow-hidden rounded-t-2xl" style={{
              background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
            }}>
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                EDIT SERVICE DOCUMENTS
              </h3>
            </div>
            <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb my-2 py-5 px-2 overflow-y-auto relative h-[470px]">
              <div className="px-4 pb-2 flex flex-col md:flex-row justify-between items-center">
                <label htmlFor="" className="font-bold uppercase">
                  Select which document to edit:
                </label>
                <select
                  name="form"
                  className="border border-1 border-gray-300 shadow bg-white w-full md:w-6/12 mt-2 md:mt-0 border p-2 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  onChange={handleSelectChange}
                  value={selectedDocIndex}
                >
                  <option value="" disabled>
                    Select Document
                  </option>
                  {docDetails &&
                    docDetails.map((item, idx) => (
                      <option key={idx} value={idx}>
                        {item.doc_title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="block  text-black font-bold">
                    SERVE AS ACTIVE FORM?
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOpen"
                      onChange={(e) =>
                        setDocDetail((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      checked={docDetail.isActive}
                      disabled={docDetail.isArchived}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-400 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800" />
                  </label>
                </div>
                {/* DOCUMENT INFORMATION */}
                <fieldset className="border-2 border-black">
                  <legend className="ml-2 px-2 text-lg font-medium">
                    DOCUMENT INFORMATION
                  </legend>
                  <div className="px-4 py-2">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Document Title
                      </label>
                      <input
                        id="doc_title"
                        className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                        name="doc_title"
                        type="text"
                        value={docDetail.doc_title || ""}
                        onChange={handleChange}
                        placeholder="Service Name"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-bold text-gray-700 "
                      >
                        Details
                      </label>
                      <textarea
                        id="details"
                        rows={7}
                        name="details"
                        value={docDetail.details || ""}
                        onChange={handleChange}
                        className="shadow appearance-none border w-full p-2.5 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                        placeholder="Enter service details..."
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="type"
                      >
                        TYPE OF DOCUMENT LAYOUT:
                      </label>
                      <select
                        name="type"
                        onChange={handleChange}
                        value={docDetail.type || ""}
                        className="shadow  border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      >
                        <option>-- Select a Document Type --</option>
                        <option value="Type A">
                          Barangay Certificate without Officials
                        </option>
                        <option value="Type B">
                          Barangay Certificate with Officials
                        </option>
                        <option value="Type C">Cedula</option>
                        <option value="Type D">Barangay ID</option>
                        <option value="Type E">
                          First Time Job Seeker with Oath of Undertaking
                        </option>
                        <option value="Type F">Barangay Clearance</option>
                        <option value="Type G">Certificate of Indigency</option>
                        <option value="Type H">Solo Parent Certification</option>
                        {/* <option value="Type I">Barangay Blotter</option> */}
                        <option value="Type J">Late Registration</option>
                        <option value="Type K">Residency Certification</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="type"
                      >
                        Punong Barangay
                      </label>
                      <select
                        name="punong_brgy"
                        onChange={handleChange}
                        value={docDetail.punong_brgy || ""}
                        className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      >
                        <option>-- Select an Official --</option>
                        {/* Map filtered officials with position "Barangay Chairman" to options */}
                        {officials
                          .filter(
                            (official) =>
                              official.position === "Barangay Chairman"
                          )
                          .map((official) => (
                            <option
                              key={official.user_id}
                              value={official.user_id}
                            >
                              {official.lastName}, {official.firstName}{" "}
                              {official.middleName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="type"
                      >
                        Witnessed By:
                      </label>
                      <select
                        name="witnessed_by"
                        onChange={handleChange}
                        value={docDetail.witnessed_by || ""}
                        className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      >
                        <option>-- Select an Official --</option>
                        {/* Map filtered officials with position "Barangay Chairman" to options */}
                        {officials
                          .filter(
                            (official) =>
                              official.position === "Secretary"
                          )
                          .map((official) => (
                            <option
                              key={official.user_id}
                              value={official.user_id}
                            >
                              {official.lastName}, {official.firstName}{" "}
                              {official.middleName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        E-mail
                      </label>
                      <input
                        id="email"
                        className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                        name="email"
                        type="text"
                        value={docDetail.email || ""}
                        onChange={handleChange}
                        placeholder="E-mail"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                        name="address"
                        type="text"
                        value={docDetail.address || ""}
                        onChange={handleChange}
                        placeholder="Address"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Telephone Number
                      </label>
                      <input
                        id="tel"
                        className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                        name="tel"
                        type="number"
                        value={docDetail.tel || ""}
                        onChange={handleChange}
                        placeholder="Telephone Number"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* CUSTOMIZE DOCUMENT */}
              <div className="px-4 w-full h-auto overflow-y-auto">
                <fieldset className="border-2 border-black">
                  <legend className=" ml-2 px-2 text-lg font-bold">
                    CUSTOMIZE FIELDS
                  </legend>
                  <EditSectionDocument
                    brgy={brgy}
                    service_id={service_id}
                    document={document}
                    setDocument={setDocument}
                    docDetail={docDetail}
                    setDocDetail={setDocDetail}
                  />
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
                  UPDATE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-edit-serviceDocument-modal"
                  onClick={handleResetDocDetail}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
        {submitClicked && <EditFormLoader updatingStatus="updating" />}
        {updatingStatus && (
          <EditFormLoader updatingStatus={updatingStatus} error={error} />
        )}
      </div>
    </div>
  );
};

export default EditServicesDocument;