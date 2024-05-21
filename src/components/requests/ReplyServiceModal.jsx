import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosAttach } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Dropbox from "./Dropbox";
import ViewDropbox from "./ViewDropbox";
import EditDropbox from "./EditDropbox";
import { useSearchParams } from "react-router-dom";
import ReplyLoader from "./loaders/ReplyLoader";
import moment from "moment";
import GetBrgy from "../GETBrgy/getbrgy";

function ReplyServiceModal({ request, setRequest, brgy, chatContainerRef }) {
  const information = GetBrgy(brgy);
  const [reply, setReply] = useState(false);
  const [statusChanger, setStatusChanger] = useState(false);
  const [upload, setUpload] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [files, setFiles] = useState([]);
  const [createFiles, setCreateFiles] = useState([]);
  const [viewFiles, setViewFiles] = useState([]);
  const [newMessage, setNewMessage] = useState({
    message: "",
    isRepliable: true,
  });
  const [errMsg, setErrMsg] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [viewTime, setViewTime] = useState({
    state: false,
    timeKey: 0,
  });
  const [userData, setUserData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [replyingStatus, setReplyingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [service, setService] = useState([]);
  const [eventWithCounts, setEventWithCounts] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [specificEvent, setSpecificEvent] = useState(null);

  useEffect(() => {
    var container = document.getElementById("scrolltobottom");
    container.scrollTop = container.scrollHeight;
  });

  useEffect(() => {
    setFiles(request.length === 0 ? [] : request.file);
  }, [request]);

  const handleResetModal = () => {
    setCreateFiles([]);
    setNewMessage({
      message: "",
      isRepliable: true,
    });
    setStatusChanger(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);

        if (res.status === 200) {
          setUserData(res.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!request.service_id) {
          // If there is no event_id in the application, do not fetch events
          return;
        }
        const serviceResponse = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&service_id=${request.service_id}&archived=false`
        );

        if (serviceResponse.status === 200) {
          setService(serviceResponse.data.result[0]);
        } else {
          // setEventWithCounts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
      }
    };

    fetchData();
  }, [currentPage, brgy, request.service_id]);

  useEffect(() => {
    if (request && request.response.length !== 0) {
      const lastResponse = request.response[request.response.length - 1];

      if (lastResponse.file && lastResponse.file.length > 0) {
        setViewFiles(lastResponse.file);
      } else {
        setViewFiles([]);
      }
    } else {
      setViewFiles([]);
    }
  }, [request]);

  // Initialize with the last index expanded
  useEffect(() => {
    const lastIndex = request.response ? request.response.length - 1 : 0;
    setExpandedIndexes([lastIndex]);
  }, [request.response]);

  const fileInputRef = useRef();

  const handleToggleClick = (index) => {
    if (expandedIndexes.includes(index)) {
      // Collapse the clicked div
      setExpandedIndexes((prev) => prev.filter((i) => i !== index));
    } else {
      // Expand the clicked div
      setExpandedIndexes((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (request && request.response && request.response.length > 0) {
      // Sort the responses based on date in ascending order
      request.response.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Initialize with the last index expanded
      const lastIndex = request.response.length - 1;
      setExpandedIndexes([lastIndex]);
    }
  }, [request]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (e.target.name === "isRepliable") {
      // If isRepliable checkbox is changed, update isRepliable accordingly
      setNewMessage((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (
      statusChanger &&
      (!newMessage.message || newMessage.message.trim() === "")
    ) {
      // If statusChanger is true and message is not set, update message with status
      setNewMessage((prev) => ({
        ...prev,
        message: `The status of your service request is ${inputValue}`,
        [e.target.name]: inputValue,
      }));
    } else {
      // Otherwise, update the input value normally
      setNewMessage((prev) => ({
        ...prev,
        [e.target.name]: inputValue,
      }));
    }
  };

  const DateFormat = (date) => {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setCreateFiles([...createFiles, ...e.target.files]);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

  const handleOnReply = () => {
    setReply(!reply);
  };

  const handleOnUpload = () => {
    setUpload(!upload);
  };

  const handleOnStatusChanger = () => {
    setStatusChanger(!statusChanger);
  };

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleOnSend = async (e) => {
    try {
      e.preventDefault();
      setSubmitClicked(true);

      const obj = {
        sender: `${userData.firstName} ${userData.lastName} (${userData.type})`,
        message: newMessage.message,
        status: request.status,
        isRepliable: newMessage.isRepliable,
        folder_id: request.folder_id,
        date: new Date(), // Add the current date and time
      };

      var formData = new FormData();
      formData.append("response", JSON.stringify(obj));

      const res_folder = await axios.get(
        `${API_LINK}/folder/specific/?brgy=${brgy}`
      );

      if (res_folder.status === 200) {
        for (let i = 0; i < createFiles.length; i++) {
          formData.append("files", createFiles[i]);
        }

        const response = await axios.patch(
          `${API_LINK}/requests/?req_id=${request._id}&?request_folder_id=${res_folder.data[0].request}`,
          formData
        );

        if (response.status === 200) {
          const notify = {
            category: "One",
            compose: {
              subject: `REQUEST - ${request.service_name}`,
              message: `A barangay staff has updated/replied your request for the barangay service of ${
                request.service_name
              }.\n\n
        
              Request Details:\n
              - Name: ${
                request.form && request.form[0]
                  ? request.form[0].lastName.value
                  : ""
              }, ${
                request.form && request.form[0]
                  ? request.form[0].firstName.value
                  : ""
              } ${
                request.form && request.form[0]
                  ? request.form[0].middleName.value
                  : ""
              }
              - Service Applied: ${request.service_name}\n
              - Request ID: ${request.req_id}\n
              - Date Created: ${moment(request.createdAt).format(
                "MMM. DD, YYYY h:mm a"
              )}\n
              - Status: ${response.data.status}\n
              - Staff Handled: ${userData.lastName}, ${userData.firstName} ${
                userData.middleName
              }\n\n
              Please update this service request as you've seen this notification!\n\n
              Thank you!!,`,
              go_to: "Requests",
            },
            target: {
              user_id: request.form[0].user_id.value,
              area: request.brgy,
            },
            type: "Resident",
            banner: service.collections.banner,
            logo: service.collections.logo,
          };

          const result = await axios.post(`${API_LINK}/notification/`, notify, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (result.status === 200) {
            setTimeout(() => {
              setSubmitClicked(false);
              setReplyingStatus("success");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setSubmitClicked(false);
      setReplyingStatus("error");
      setError("An error occurred while replying to the service request.");
    }
  };

  const handleOnViewTime = (item) => {
    console.log(item);
    setViewTime({
      state: !viewTime.state,
      timeKey: item,
    });
  };

  return (
    <div>
      <div
        id="hs-reply-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div
              className="py-5 px-3 flex justify-between items-center overflow-hidden rounded-t-2xl"
              style={{
                background: `radial-gradient(ellipse at bottom, ${information?.theme?.gradient?.start}, ${information?.theme?.gradient?.end})`,
              }}
            >
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                REPLY TO REQUESTED SERVICE
              </h3>
            </div>

            <div
              id="scrolltobottom"
              ref={chatContainerRef}
              className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]"
            >
              <div className="flex flex-col w-full">
                <b className="border-solid border-0 w-full border-black/50 border-b-2 my-4 uppercase font-medium text-lg md:text-lg mb-4">
                  Conversation History
                </b>
                <form>
                  {!request.response || request.response.length === 0 ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full mx-2">
                        <div className="relative w-full">
                          <textarea
                            id="message"
                            name="message"
                            onChange={handleChange}
                            rows={7}
                            value={
                              newMessage.message
                                ? newMessage.message
                                : statusChanger
                                ? `The status of your service request is ${request.status}`
                                : ""
                            }
                            className="p-4 pb-12 block w-full  border-[#b7e4c7] rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border focus:outline-none focus:ring-0 focus:border-[#b7e4c7]"
                            placeholder="Input response..."
                          />

                          <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-[#b7e4c7]">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="file"
                                  name="file"
                                  onChange={(e) => handleFileChange(e)}
                                  ref={fileInputRef}
                                  accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                                  multiple="multiple"
                                  className="hidden"
                                />
                                <button
                                  id="button"
                                  onClick={handleAdd || handleOnUpload}
                                  className="p-2 hover:rounded-full hover:bg-white focus:shadow-outline focus:outline-none"
                                >
                                  <IoIosAttach
                                    size={24}
                                    className="text-[#2d6a4f]"
                                  />
                                </button>

                                <div className="flex flex-col lg:flex-row">
                                  <div className="w-full">
                                    <div className="flex flex-row space-x-1.5">
                                      {!statusChanger ? (
                                        <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex">
                                          <div className="hs-tooltip inline-block">
                                            <button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleOnStatusChanger();
                                              }}
                                              className="hs-tooltip-toggle rounded-full p-2.5 text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                            >
                                              <FaTasks
                                                size={24}
                                                className="mx-auto"
                                              />
                                              <span
                                                className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                                role="tooltip"
                                              >
                                                Change Request Status
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex">
                                          <div className="hs-tooltip inline-block">
                                            <button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleOnStatusChanger();
                                              }}
                                              className="hs-tooltip-toggle rounded-full p-2 bg-white text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                            >
                                              <MdOutlineCancel
                                                size={24}
                                                className="mx-auto"
                                              />
                                            </button>
                                            <span
                                              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                              role="tooltip"
                                            >
                                              Change Request Status
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <select
                                        id="status"
                                        name="status"
                                        onChange={(e) => {
                                          const newStatus = e.target.value;
                                          const statusRegex =
                                            /The status of your service request is [\w\s]+/;
                                          let updatedMessage =
                                            newMessage.message;

                                          if (
                                            statusRegex.test(updatedMessage)
                                          ) {
                                            updatedMessage =
                                              updatedMessage.replace(
                                                statusRegex,
                                                `The status of your service request is ${newStatus}`
                                              );
                                          } else if (!updatedMessage.trim()) {
                                            updatedMessage = `The status of your service request is ${newStatus}`;
                                          }

                                          if (statusChanger) {
                                            setNewMessage((prev) => ({
                                              ...prev,
                                              message: updatedMessage,
                                            }));
                                          }

                                          setRequest((prev) => ({
                                            ...prev,
                                            status: newStatus,
                                          }));
                                        }}
                                        className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                        value={request.status}
                                        hidden={!statusChanger}
                                      >
                                        <option value="Pending">PENDING</option>
                                        <option value="Paid">PAID</option>
                                        <option value="Processing">
                                          PROCESSING
                                        </option>
                                        <option value="Cancelled">
                                          CANCELLED
                                        </option>
                                        <option value="Transaction Completed">
                                          TRANSACTION COMPLETED
                                        </option>
                                        <option value="Rejected">
                                          REJECTED
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-center items-center gap-x-2">
                                {/* <div className="hs-tooltip inline-block">
                                  <label className="relative flex  justify-center items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      name="isRepliable"
                                      checked={newMessage.isRepliable}
                                      onChange={handleChange}
                                      className="hs-tooltip-toggle sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800" />
                                  </label>
                                  <span
                                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                    role="tooltip"
                                  >
                                    Client can Reply
                                  </span>
                                </div> */}
                                <button
                                  type="submit"
                                  onClick={handleOnSend}
                                  className="inline-flex flex-shrink-0 justify-center items-center rounded-lg p-2 gap-2 text-[#2d6a4f] hover:bg-white hover:rounded-full  "
                                >
                                  {onSend ? (
                                    <div
                                      class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                      role="status"
                                      aria-label="loading"
                                    >
                                      <span class="sr-only">Loading...</span>
                                    </div>
                                  ) : (
                                    <IoSend
                                      size={24}
                                      className="flex-shrink-0 "
                                    />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {!upload ? (
                          // Render Dropbox only when there are uploaded files
                          createFiles.length > 0 && (
                            <Dropbox
                              createFiles={createFiles}
                              setCreateFiles={setCreateFiles}
                              handleFileChange={handleFileChange}
                            />
                          )
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {request &&
                    request.response &&
                    request.response.map((responseItem, index) => (
                      <div>
                        <div
                          key={index}
                          className={
                            responseItem.sender ===
                            `${userData?.firstName?.toUpperCase() ?? ""} ${
                              userData?.lastName?.toUpperCase() ?? ""
                            } (${userData.type})`
                              ? "flex flex-col justify-end items-end mb-2 w-full h-auto"
                              : "flex flex-col justify-start items-start mb-2 w-full h-auto"
                          }
                        >
                          <div
                            className={
                              responseItem.sender ===
                              `${userData?.firstName?.toUpperCase() ?? ""} ${
                                userData?.lastName?.toUpperCase() ?? ""
                              } (${userData.type})`
                                ? "flex flex-col items-end h-auto max-w-[80%]"
                                : "flex flex-col items-start h-auto max-w-[80%]"
                            }
                          >
                            <div
                              className={
                                responseItem.sender ===
                                `${userData?.firstName?.toUpperCase() ?? ""} ${
                                  userData?.lastName?.toUpperCase() ?? ""
                                } (${userData.type})`
                                  ? "hidden"
                                  : "flex flex-row w-full justify-between"
                              }
                            >
                              <div className="flex flex-col md:flex-row md:items-center">
                                <p className="text-[14px] text-black md:text-sm font-medium uppercase ">
                                  {responseItem.sender?.toLowerCase()}
                                </p>
                              </div>
                            </div>

                            {responseItem.message !== "" ? (
                              <div
                                className={
                                  responseItem.sender ===
                                  `${
                                    userData?.firstName?.toUpperCase() ?? ""
                                  } ${
                                    userData?.lastName?.toUpperCase() ?? ""
                                  } (${userData.type})`
                                    ? "flex flex-col rounded-xl bg-[#52b788] border border-[#2d6a4f] mb-1 text-white px-2 md:px-4 py-2 cursor-pointer"
                                    : "flex flex-col rounded-xl bg-gray-100 border text-black border-gray-300 px-2 md:px-4 py-2 cursor-pointer"
                                }
                                onClick={() => handleOnViewTime(index)}
                              >
                                <div className="w-full h-full">
                                  <div className="w-full h-full rounded-xl p-1">
                                    <p className="text-[10px] md:text-xs">
                                      {responseItem.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            {responseItem.file &&
                              responseItem.file.length > 0 && (
                                <div className="flex flex-col rounded-xl">
                                  <ViewDropbox
                                    viewFiles={responseItem.file || []}
                                    setViewFiles={setViewFiles}
                                  />
                                </div>
                              )}

                            <p
                              className={
                                !viewTime.state && viewTime.timeKey === index
                                  ? "text-[10px] md:text-xs mt-[5px] text-black text-right text-xs"
                                  : "hidden"
                              }
                            >
                              {DateFormat(responseItem.date) || ""}
                            </p>
                          </div>

                          {index === request.response.length - 1 ? (
                            <div className="flex flex-row items-center w-full">
                              <div className="relative w-full mt-4 mx-2">
                                {errMsg ? (
                                  <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex">
                                    <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                                      Please enter a message or insert a file!
                                    </p>
                                  </div>
                                ) : null}
                                <div className="relative w-full ">
                                  <textarea
                                    id="message"
                                    name="message"
                                    onChange={handleChange}
                                    rows={7}
                                    value={
                                      newMessage.message
                                        ? newMessage.message
                                        : statusChanger
                                        ? `The status of your service request is ${request.status}`
                                        : ""
                                    }
                                    className="p-4 pb-12 block w-full  border-[#b7e4c7] rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border focus:outline-none focus:ring-0 focus:border-[#b7e4c7]"
                                    placeholder="Input response..."
                                  />

                                  <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-[#b7e4c7]">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <input
                                          type="file"
                                          name="file"
                                          onChange={(e) => handleFileChange(e)}
                                          ref={fileInputRef}
                                          accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                                          multiple="multiple"
                                          className="hidden"
                                        />
                                        <button
                                          id="button"
                                          onClick={handleAdd || handleOnUpload}
                                          className="p-2 hover:rounded-full hover:bg-white focus:shadow-outline focus:outline-none"
                                        >
                                          <IoIosAttach
                                            size={24}
                                            className="text-[#2d6a4f]"
                                          />
                                        </button>

                                        <div className="flex flex-col lg:flex-row">
                                          <div className="w-full">
                                            <div className="flex flex-row space-x-1.5">
                                              {!statusChanger ? (
                                                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex">
                                                  <div className="hs-tooltip inline-block">
                                                    <button
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOnStatusChanger();
                                                      }}
                                                      className="hs-tooltip-toggle rounded-full p-2.5 text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                                    >
                                                      <FaTasks
                                                        size={24}
                                                        className="mx-auto"
                                                      />
                                                      <span
                                                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                                        role="tooltip"
                                                      >
                                                        Change Request Status
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex">
                                                  <div className="hs-tooltip inline-block">
                                                    <button
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOnStatusChanger();
                                                      }}
                                                      className="hs-tooltip-toggle rounded-full p-2 bg-white text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                                    >
                                                      <MdOutlineCancel
                                                        size={24}
                                                        className="mx-auto"
                                                      />
                                                    </button>
                                                    <span
                                                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                                      role="tooltip"
                                                    >
                                                      Change Request Status
                                                    </span>
                                                  </div>
                                                </div>
                                              )}
                                              <select
                                                id="status"
                                                name="status"
                                                onChange={(e) => {
                                                  const newStatus =
                                                    e.target.value;
                                                  const statusRegex =
                                                    /The status of your service request is [\w\s]+/;
                                                  let updatedMessage =
                                                    newMessage.message;

                                                  if (
                                                    statusRegex.test(
                                                      updatedMessage
                                                    )
                                                  ) {
                                                    updatedMessage =
                                                      updatedMessage.replace(
                                                        statusRegex,
                                                        `The status of your service request is ${newStatus}`
                                                      );
                                                  } else if (
                                                    !updatedMessage.trim()
                                                  ) {
                                                    updatedMessage = `The status of your service request is ${newStatus}`;
                                                  }

                                                  if (statusChanger) {
                                                    setNewMessage((prev) => ({
                                                      ...prev,
                                                      message: updatedMessage,
                                                    }));
                                                  }

                                                  setRequest((prev) => ({
                                                    ...prev,
                                                    status: newStatus,
                                                  }));
                                                }}
                                                className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                                value={request.status}
                                                hidden={!statusChanger}
                                              >
                                                <option value="Pending">
                                                  PENDING
                                                </option>
                                                <option value="Paid">
                                                  PAID
                                                </option>
                                                <option value="Processing">
                                                  PROCESSING
                                                </option>
                                                <option value="Cancelled">
                                                  CANCELLED
                                                </option>
                                                <option value="Transaction Completed">
                                                  TRANSACTION COMPLETED
                                                </option>
                                                <option value="Rejected">
                                                  REJECTED
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-x-1">
                                        <button
                                          type="submit"
                                          onClick={handleOnSend}
                                          disabled={onSend}
                                          className="inline-flex flex-shrink-0 justify-center items-center rounded-lg p-2 gap-2 text-[#2d6a4f] hover:bg-white hover:rounded-full  "
                                        >
                                          {onSend ? (
                                            <div
                                              class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                              role="status"
                                              aria-label="loading"
                                            >
                                              <span class="sr-only">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            <IoSend
                                              size={24}
                                              className="flex-shrink-0 "
                                            />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {!upload ? (
                                  // Render Dropbox only when there are uploaded files
                                  createFiles.length > 0 && (
                                    <Dropbox
                                      createFiles={createFiles}
                                      setCreateFiles={setCreateFiles}
                                      handleFileChange={handleFileChange}
                                    />
                                  )
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                </form>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm"
                data-hs-overlay="#hs-reply-modal"
                onClick={handleResetModal}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
        {submitClicked && <ReplyLoader replyingStatus="replying" />}
        {replyingStatus && (
          <ReplyLoader replyingStatus={replyingStatus} error={error} />
        )}
      </div>
    </div>
  );
}

export default ReplyServiceModal;
