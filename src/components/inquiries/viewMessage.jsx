import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";
import EditDropbox from "./EditDropbox";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Dropbox from "./Dropbox";

function ViewInquiriesModal({ inquiry, setInquiry }) {
  const [reply, setReply] = useState(false);
  const [upload, setUpload] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [files, setFiles] = useState([]);
  const [createFiles, setCreateFiles] = useState([]);

  useEffect(() => {
    setFiles(inquiry.length === 0 ? [] : inquiry.compose.file);
  }, [inquiry]);

  const handleOnReply = () => {
    setReply(!reply);
  };

  const handleOnUpload = () => {
    setUpload(!upload);
  };

  const handleChange = (e) => {
    setInquiry((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handleToggleClick = (index) => {
    if (expandedIndexes.includes(index)) {
      // Collapse the clicked div
      setExpandedIndexes((prev) => prev.filter((i) => i !== index));
    } else {
      // Expand the clicked div
      setExpandedIndexes((prev) => [...prev, index]);
    }
  };

  // Initialize with the last index expanded
  useEffect(() => {
    const lastIndex = inquiry.response ? inquiry.response.length - 1 : 0;
    setExpandedIndexes([lastIndex]);
  }, [inquiry.response]);

  const fileInputRef = useRef();

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setCreateFiles([...createFiles, ...e.target.files]);
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
              <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3e5fc2] to-[#1f2f5e] overflow-hidden rounded-t-2xl">
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  VIEW INQUIRY
                </h3>
              </div>

              <div className="flex flex-col mx-auto w-full pt-5 px-5 overflow-y-auto relative max-h-[470px]">
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

                <div className="flex flex-col mt-5 w-full">
                  <b className="border-solid border-0 w-full border-black/50 border-b-2 my-4 uppercase font-medium text-lg md:text-lg mb-4">
                    Conversation History
                  </b>
                  <form>
                    {inquiry &&
                      inquiry.response &&
                      inquiry.response.map((responseItem, index) => (
                        <div
                          key={index}
                          className={`flex flex-col lg:flex-row h-16 mb-2 border-b ${
                            expandedIndexes.includes(index)
                              ? "h-auto border-b"
                              : ""
                          }`}
                          onClick={() => handleToggleClick(index)}
                        >
                          {!expandedIndexes.includes(index) ? (
                            <div className="flex flex-col w-full px-2 md:px-4 py-2">
                              <div className="flex flex-row w-full justify-between">
                                <p className="text-[14px] md:text-sm font-medium uppercase">
                                  {responseItem.sender}
                                </p>
                                <p className="text-[10px] md:text-xs text-right text-xs">
                                  {DateFormat(responseItem.date) || ""}
                                </p>
                              </div>
                              <p className="text-[10px] md:text-xs">
                                {responseItem.message}
                              </p>
                            </div>
                          ) : (
                            <div
                              className="flex flex-col w-full px-2 md:px-4 py-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                className="flex flex-row w-full justify-between"
                                onClick={() => handleToggleClick(index)}
                              >
                                <div className="flex flex-col md:flex-row md:items-center">
                                  <p className="text-[14px] md:text-sm font-medium uppercase ">
                                    {responseItem.sender}
                                  </p>
                                </div>
                                <p className="text-[10px] md:text-xs text-right text-xs">
                                  {DateFormat(responseItem.date) || ""}
                                </p>
                              </div>
                              <div className="w-full py-4 h-full md:px-2">
                                <div className="w-full border h-full rounded-xl p-5">
                                  <p className="text-[10px] md:text-xs">
                                    {responseItem.message}
                                  </p>
                                </div>
                              </div>
                              {index === inquiry.response.length - 1 && (
                                <div className="flex flex-row items-center">
                                  <button
                                    type="button"
                                    className="h-8 w-full lg:w-32 py-1 px-2 gap-2 rounded-full borde text-sm font-base bg-teal-900 text-white shadow-sm"
                                    onClick={handleOnReply}
                                    hidden={reply}
                                  >
                                    REPLY
                                  </button>

                                  {!reply ? (
                                    <div></div>
                                  ) : (
                                    <div className="relative w-full mx-2">
                                      <div className="relative w-full">
                                        <textarea
                                          id="response"
                                          name="response"
                                          class="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border"
                                          placeholder="Input response..."
                                        ></textarea>

                                        <div class="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white">
                                          <div class="flex justify-between items-center">
                                            <div class="flex items-center">
                                              <input
                                                type="file"
                                                name="file"
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                                accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                                                multiple="multiple"
                                                className="hidden"
                                              />
                                              <button
                                                id="button"
                                                onClick={
                                                  handleAdd || handleOnUpload
                                                }
                                                className="mt-2 rounded-xl px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                              >
                                                <IoIosAttach size={24} />
                                              </button>
                                              {/* <IoIosAttach size={24} /> */}
                                            </div>

                                            <div class="flex items-center gap-x-1">
                                              <button
                                                type="submit"
                                                class="inline-flex flex-shrink-0 justify-center items-center w-28 rounded-lg text-white py-1 px-6 gap-2 bg-cyan-700"
                                              >
                                                <span>SEND</span>
                                                <IoSend
                                                  size={18}
                                                  className="flex-shrink-0"
                                                />
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
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </form>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm"
                    data-hs-overlay="#hs-modal-viewInquiries"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInquiriesModal;
