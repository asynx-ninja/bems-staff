import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Dropbox from "./Dropbox";
import ViewDropbox from "./ViewDropbox";
import EditDropbox from "./EditDropbox";
import ReplyLoader from "./loaders/ReplyLoader";
import moment from "moment";
import GetBrgy from "../GETBrgy/getbrgy";

function ViewInquiriesModal({ inquiry, setInquiry, brgy }) {
  const information = GetBrgy(brgy);
  const [reply, setReply] = useState(false);
  const [upload, setUpload] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [files, setFiles] = useState([]);
  const [createFiles, setCreateFiles] = useState([]);
  const [viewFiles, setViewFiles] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [replyStatus, setReplyStatus] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [errMsg, setErrMsg] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [viewTime, setViewTime] = useState({
    state: false,
    timeKey: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [statusChanger, setStatusChanger] = useState(false);
  const [newMessage, setNewMessage] = useState({
    message: "",
    date: new Date(),
  });
  const [banner, setBanner] = useState({
    link: "https://drive.google.com/thumbnail?id=1v009xuRjSNW8OGUyHbAYTJt3ynxjhtGW&sz=w1000",
    name: "inquiries_banner.jpg",
    id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
  });

  const [logo, setLogo] = useState({
    link: "https://drive.google.com/thumbnail?id=1sh24YL7RQY_cHLcTZ_G3GXCG18Y6_JAL&sz=w1000",
    name: "inquiries_logo.png",
    id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
  });

  const handleResetModal = () => {
    setCreateFiles([]);
    setNewMessage({
      message: "",
      isRepliable: true,
    });
    setStatusChanger(false);
  };

  useEffect(() => {
    setFiles(inquiry.length === 0 ? [] : inquiry.compose.file);
  }, [inquiry]);

  useEffect(() => {
    if (inquiry && inquiry.response.length !== 0) {
      const lastResponse = inquiry.response[inquiry.response.length - 1];

      if (lastResponse.file && lastResponse.file.length > 0) {
        setViewFiles(lastResponse.file);
      } else {
        setViewFiles([]);
      }
    } else {
      setViewFiles([]);
    }
  }, [inquiry]);

  // Initialize with the last index expanded
  useEffect(() => {
    const lastIndex = inquiry.response ? inquiry.response.length - 1 : 0;
    setExpandedIndexes([lastIndex]);
  }, [inquiry.response]);

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

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   setNewMessage((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleChange = (e) => {
    e.preventDefault();

    const inputValue = e.target.value;

    if (
      statusChanger &&
      (!newMessage.message || newMessage.message.trim() === "")
    ) {
      setNewMessage((prev) => ({
        ...prev,
        message: `The status of your inquiry is ${inputValue}`,
      }));
    } else {
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

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleOnSend = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    try {
      if (statusChanger && !inquiry.status) {
        setSubmitClicked(false);
        setReplyStatus("error");
        setError("Please select a status before submitting.");
        return;
      }

      const obj = {
        sender: `${userData.firstName} ${userData.lastName} (${userData.type})`,
        type: userData.type,
        message: newMessage.message,
        date: newMessage.date,
        folder_id: inquiry.folder_id,
        status: inquiry.status,
      };

      var formData = new FormData();
      formData.append("response", JSON.stringify(obj));
      for (let i = 0; i < createFiles.length; i++) {
        formData.append("files", createFiles[i]);
      }

      const response = await axios.patch(
        `${API_LINK}/inquiries/?inq_id=${inquiry._id}`,
        formData
      );

      if (response.status === 200) {
        const notify = {
          category: "One",
          compose: {
            subject: `INQUIRIES - ${inquiry.compose.subject}`,
            message: `A barangay staff has responded to your inquiry.\n\n
            
            
            Inquiries Details:\n 
            - Name: ${inquiry.name}\n
            - Message: ${inquiry.compose.message}\n
            - inquiry ID: ${inquiry.inq_id}\n
            - Date Created: ${moment(inquiry.createdAt).format(
              "MMM. DD, YYYY h:mm a"
            )}\n
            - Status: ${response.data.isApproved}\n
            - Staff Handled: ${userData.lastName}, ${userData.firstName} ${
              userData.middleName
            }\n\n
            `,
            go_to: "Inquiries",
          },
          target: {
            user_id: inquiry.user_id,
            area: inquiry.brgy,
          },
          type: "Resident",
          banner: banner,
          logo: logo,
        };

        const result = await axios.post(`${API_LINK}/notification/`, notify, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.status === 200) {
          setTimeout(() => {
            setSubmitClicked(false);
            setReplyStatus("success");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      setSubmitClicked(false);
      setReplyStatus("error");
      setError(error.message);
    }
  };

  const handleOnStatusChanger = () => {
    setStatusChanger(!statusChanger);
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
      <div className="">
        <div
          id="hs-modal-viewInquiries"
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
                  VIEW INQUIRY
                </h3>
              </div>

              <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full pt-5 px-5 overflow-y-auto relative max-h-[470px]">
                <b className="border-solid border-0 border-black/50 border-b-2  uppercase font-medium text-lg md:text-lg mb-4">
                  Inquiry Details
                </b>
                <div className="flex flex-col lg:flex-row">
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={inquiry && inquiry.name}
                      disabled
                    />
                  </div>
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={inquiry && inquiry.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={inquiry && inquiry?.compose?.subject}
                      disabled
                    />
                  </div>
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={
                        DateFormat(inquiry && inquiry?.compose?.date) || ""
                      }
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-4 px-2">
                  <label
                    htmlFor="details"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows="4"
                    className="shadow appearance-none border w-full h-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                    value={inquiry && inquiry?.compose?.message}
                    disabled
                  />
                </div>

                <EditDropbox files={inquiry && files} setFiles={setFiles} />

                {/* <div className="flex flex-col mt-5 w-full"> */}
                <div className="flex flex-col w-full">
                  <b className="border-solid border-0 w-full border-black/50 border-b-2 my-4 uppercase font-medium text-lg md:text-lg mb-4">
                    Conversation History
                  </b>
                  <form>
                    {!inquiry.response || inquiry.response.length === 0 ? (
                      <div className="flex flex-col items-center">
                        {errMsg ? (
                          <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex justify-between">
                            <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                              Please enter a message or insert a file!
                            </p>
                            <button
                              className="px-[10px] text-white"
                              onClick={() => setErrMsg(!errMsg)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : null}
                        {/* <div className="relative w-full mt-4 mx-2"> */}
                        <div className="relative w-full mt-5">
                          <textarea
                            id="message"
                            name="message"
                            onChange={handleChange}
                            rows={7}
                            value={
                              newMessage.message
                                ? newMessage.message
                                : statusChanger && inquiry.status
                                ? `The status of your inquiry is ${inquiry.status}`
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
                                                Change inquiry Status
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex mr-2">
                                          <div className="hs-tooltip inline-block">
                                            <button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleOnStatusChanger();
                                              }}
                                              className="hs-tooltip-toggle rounded-full p-2 bg-white text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                            >
                                              <MdOutlineCancel
                                                size={28}
                                                className="mx-auto"
                                              />
                                            </button>
                                            <span
                                              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                              role="tooltip"
                                            >
                                              Change Inquiry Status
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
                                            /The status of your inquiry is [\w\s]+/;
                                          let updatedMessage =
                                            newMessage.message;

                                          if (
                                            statusRegex.test(updatedMessage)
                                          ) {
                                            updatedMessage =
                                              updatedMessage.replace(
                                                statusRegex,
                                                `The status of your inquiry is ${newStatus}`
                                              );
                                          } else if (!updatedMessage.trim()) {
                                            updatedMessage = `The status of your inquiry is ${newStatus}`;
                                          }

                                          if (statusChanger) {
                                            setNewMessage((prev) => ({
                                              ...prev,
                                              message: updatedMessage,
                                            }));
                                          }

                                          setInquiry((prev) => ({
                                            ...prev,
                                            status: newStatus,
                                          }));
                                        }}
                                        className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                        value={inquiry.status}
                                        hidden={!statusChanger}
                                      >
                                        <option disabled>
                                          {" "}
                                          -- Select Status --{" "}
                                        </option>
                                        <option value="Pending">PENDING</option>
                                        <option value="In Progress">
                                          IN PROGRESS
                                        </option>
                                        <option value="Completed">
                                          COMPLETED
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
                        <div className="w-full">
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
                    {inquiry &&
                      inquiry.response &&
                      inquiry.response.map((responseItem, index) => (
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

                            {responseItem.message && (
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
                            )}

                            {responseItem.file && (
                              <div className="flex flex-col rounded-xl">
                                <ViewDropbox
                                  viewFiles={responseItem.file}
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

                          {index === inquiry.response.length - 1 && (
                            <div className="relative w-full">
                              <div className="relative w-full mt-5">
                                {errMsg ? (
                                  <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex justify-between">
                                    <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                                      Please enter a message or insert a file!
                                    </p>
                                    <button
                                      className="px-[10px] text-white"
                                      onClick={() => setErrMsg(!errMsg)}
                                    >
                                      <FaTimes />
                                    </button>
                                  </div>
                                ) : null}
                                <textarea
                                  id="message"
                                  name="message"
                                  onChange={handleChange}
                                  rows={7}
                                  value={
                                    newMessage.message
                                      ? newMessage.message
                                      : statusChanger && inquiry.status
                                      ? `The status of your inquiry is ${inquiry.status}`
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
                                                      Change inquiry Status
                                                    </span>
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-1/6 flex mr-2">
                                                <div className="hs-tooltip inline-block">
                                                  <button
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      handleOnStatusChanger();
                                                    }}
                                                    className="hs-tooltip-toggle rounded-full p-2 bg-white text-[#2d6a4f] hover:bg-white focus:shadow-outline focus:outline-none"
                                                  >
                                                    <MdOutlineCancel
                                                      size={28}
                                                      className="mx-auto"
                                                    />
                                                  </button>
                                                  <span
                                                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                                    role="tooltip"
                                                  >
                                                    Change Inquiry Status
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
                                                  /The status of your inquiry is [\w\s]+/;
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
                                                      `The status of your inquiry is ${newStatus}`
                                                    );
                                                } else if (
                                                  !updatedMessage.trim()
                                                ) {
                                                  updatedMessage = `The status of your inquiry is ${newStatus}`;
                                                }

                                                if (statusChanger) {
                                                  setNewMessage((prev) => ({
                                                    ...prev,
                                                    message: updatedMessage,
                                                  }));
                                                }

                                                setInquiry((prev) => ({
                                                  ...prev,
                                                  status: newStatus,
                                                }));
                                              }}
                                              className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                              value={inquiry.status}
                                              hidden={!statusChanger}
                                            >
                                              <option disabled>
                                                {" "}
                                                -- Select Status --{" "}
                                              </option>
                                              <option value="Pending">
                                                PENDING
                                              </option>
                                              <option value="In Progress">
                                                IN PROGRESS
                                              </option>
                                              <option value="Completed">
                                                COMPLETED
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

                              <div className="w-full">
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
                          )}
                        </div>
                      ))}
                  </form>
                </div>
                {/* </div> */}
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm"
                    data-hs-overlay="#hs-modal-viewInquiries"
                    onClick={handleResetModal}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <ReplyLoader /> */}
          {submitClicked && <ReplyLoader replyStatus="replying" />}
          {replyStatus && (
            <ReplyLoader replyStatus={replyStatus} error={error} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInquiriesModal;
