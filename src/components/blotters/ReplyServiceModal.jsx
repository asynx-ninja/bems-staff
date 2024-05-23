import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosAttach } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import Dropbox from "./Dropbox";
import ViewDropbox from "./ViewDropbox";
import EditDropbox from "./EditDropbox";
import { useSearchParams } from "react-router-dom";
import ReplyLoader from "./loaders/ReplyLoader";
import moment from "moment";
import GetBrgy from "../GETBrgy/getbrgy";
import { CiCircleRemove } from "react-icons/ci";
import { MdRemoveCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function ReplyServiceModal({
  request,
  setRequest,
  brgy,
  // chatContainerRef,
  socket,
  setUpdate,
}) {
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
    isRepliable: false,
  });
  const [userData, setUserData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [replyingStatus, setReplyingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [service, setService] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [viewTime, setViewTime] = useState({
    state: false,
    timeKey: 0,
  });

  const [blotterDetails, setBlotterDetails] = useState([]);
  const [detail, setDetail] = useState(request);

  const [users, setUsers] = useState([]);
  const [selectedComplainant, setSelectedComplainant] = useState(null);
  const [selectedDefendant, setSelectedDefendant] = useState(null);
  const [complainantInfo, setComplainantInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [defendantInfo, setDefendantInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [customComplainant, setCustomComplainant] = useState(false);
  const [customDefendant, setCustomDefendant] = useState(false);
  const [ComplainantData, setComplainantData] = useState([]);
  const [DefendantData, setDefendantData] = useState([]);
  const [ResponseData, setResponseData] = useState({
    sender: "",
    type: "Staff",
    message: "",
    date: new Date().toISOString(),
    status: "",
  });
  const [patawagData, setPatawagData] = useState({
    name: "",
    to: [ComplainantData, DefendantData],
    response: [ResponseData],
    brgy: "",
    req_id: "",
  });

  // console.log("blotterDetails: ", blotterDetails);

  const handleAddComplainant = () => {
    if (
      complainantInfo.firstName &&
      complainantInfo.middleName &&
      complainantInfo.lastName
    ) {
      setComplainantData([...ComplainantData, complainantInfo]);
      setComplainantInfo({
        firstName: "",
        middleName: "",
        lastName: "",
      });
    }
  };

  const handleComplainantChange = (e) => {
    const selectedUserId = e.target.value;

    // Check if the selected user is already in the ComplainantData array
    const isUserAlreadyAdded = ComplainantData.some(
      (complainant) => complainant.user_id === selectedUserId
    );

    // If the user is already added, do not add it again
    if (isUserAlreadyAdded) {
      return;
    }

    setSelectedComplainant(selectedUserId);

    const selectedUser = users.find((user) => user._id === selectedUserId);
    const newComplainant = {
      firstName: selectedUser.firstName,
      middleName: selectedUser.middleName || "",
      lastName: selectedUser.lastName,
      user_id: selectedUser.user_id,
      type: "Complainant",
    };

    setComplainantData((prevComplainants) => [
      ...prevComplainants,
      newComplainant,
    ]);
  };

  const removeComplainant = (e, index) => {
    e.preventDefault();
    setComplainantData(ComplainantData.filter((_, i) => i !== index));
  };

  const handleAddDefendant = () => {
    if (
      defendantInfo.firstName &&
      defendantInfo.middleName &&
      defendantInfo.lastName
    ) {
      setDefendantData([...DefendantData, defendantInfo]);
      setDefendantInfo({
        firstName: "",
        middleName: "",
        lastName: "",
      });
    }
  };

  const handleDefendantChange = (e) => {
    const selectedUserId = e.target.value;

    // Check if the selected user is already in the DefendantData array
    const isUserAlreadyAdded = DefendantData.some(
      (defendant) => defendant.user_id === selectedUserId
    );

    // If the user is already added, do not add it again
    if (isUserAlreadyAdded) {
      return;
    }

    setSelectedDefendant(selectedUserId);

    const selectedUser = users.find((user) => user._id === selectedUserId);
    const newDefendant = {
      firstName: selectedUser.firstName,
      middleName: selectedUser.middleName || "",
      lastName: selectedUser.lastName,
      user_id: selectedUser.user_id,
      type: "Defendant",
    };

    setDefendantData((prevDefendants) => [...prevDefendants, newDefendant]);
  };

  const removeDefendant = (e, index) => {
    e.preventDefault();
    setDefendantData(DefendantData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setDetail(request);
  }, [request]);

  useEffect(() => {
    setFiles(request.length === 0 ? [] : request.file);
  }, [request]);

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
    const fetchUsers = async () => {
      let page = null;
      let hasMoreResults = true;

      while (hasMoreResults) {
        try {
          const response = await axios.get(
            `${API_LINK}/users/?brgy=${brgy}&type=Resident&page=${page}`
          );

          if (response.status === 200 && response.data.result.length > 0) {
            setUsers((prevUsers) => [...prevUsers, ...response.data.result]);
            page++;
          } else {
            hasMoreResults = false;
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          hasMoreResults = false;
        }
      }
    };

    fetchUsers();
  }, [brgy]);

  useEffect(() => {
    // function to filter
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/blotter/?brgy=${brgy}&req_id=${detail.req_id}`
        );

        // filter
        setBlotterDetails(response.data);
      } catch (err) {
        console.log(err.message);
        setBlotterDetails([]);
      }
    };

    fetch();
  }, [brgy, request, detail]);

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
  }, [brgy, request.service_id]);

  useEffect(() => {
    if (blotterDetails && blotterDetails.status) {
      // If blotterDetails has status, set it as the default status for ResponseData
      setResponseData((prev) => ({
        ...prev,
        status: blotterDetails.status,
      }));
    }
  }, [blotterDetails]);

  useEffect(() => {
    if (
      blotterDetails &&
      blotterDetails.responses &&
      blotterDetails.responses.length !== 0
    ) {
      const lastResponse =
        blotterDetails.responses[blotterDetails.responses.length - 1];

      if (lastResponse && lastResponse.file && lastResponse.file.length > 0) {
        setViewFiles(lastResponse.file);
      } else {
        setViewFiles([]);
      }
    } else {
      setViewFiles([]);
    }
  }, [blotterDetails]);

  // Initialize with the last index expanded
  useEffect(() => {
    const lastIndex = blotterDetails.responses
      ? blotterDetails.responses.length - 1
      : 0;
    setExpandedIndexes([lastIndex]);
  }, [blotterDetails.responses]);

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
    if (
      blotterDetails &&
      blotterDetails.responses &&
      blotterDetails.responses.length > 0
    ) {
      // Sort the responses based on date in ascending order
      blotterDetails.responses.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Initialize with the last index expanded
      const lastIndex = blotterDetails.responses.length - 1;
      setExpandedIndexes([lastIndex]);
    }
  }, [blotterDetails]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (e.target.name === "isRepliable") {
      // If isRepliable checkbox is changed, update isRepliable accordingly
      setResponseData((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (
      statusChanger &&
      (!ResponseData.message || ResponseData.message.trim() === "")
    ) {
      // If statusChanger is true and message is not set, update message with status
      setResponseData((prev) => ({
        ...prev,
        message: `The status of your event application is ${inputValue}`,
        [e.target.name]: inputValue,
      }));
    } else {
      // Otherwise, update the input value normally
      setResponseData((prev) => ({
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

  const handlePatawagTitleChange = (e) => {
    const title = e.target.value;
    setPatawagData((prev) => ({
      ...prev,
      name: title,
    }));
  };

  const handleOnCustomComplainant = () => {
    setCustomComplainant(!customComplainant);
  };

  const handleOnCustomDefendant = () => {
    setCustomDefendant(!customDefendant);
  };

  const resetComplainantData = () => {
    setComplainantData({
      firstName: "",
      middleName: "",
      lastName: "",
      user_id: "",
      type: "Complainant",
    });
  };

  const resetDefendantData = () => {
    setDefendantData({
      firstName: "",
      middleName: "",
      lastName: "",
      user_id: "",
      type: "Defendant",
    });
  };

  useEffect(() => {
    // Update patawagData whenever ComplainantData or DefendantData changes
    setPatawagData((prev) => ({
      ...prev,
      to: [ComplainantData, DefendantData],
    }));
  }, [ComplainantData, DefendantData]);

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const [searchTermComplainant, setSearchTermComplainant] = useState("");
  const [searchTermDefendant, setSearchTermDefendant] = useState("");

  const filteredUsersComplainant = users.filter((user) =>
    `${user.firstName} ${user.middleName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTermComplainant.toLowerCase())
  );

  const filteredUsersDefendant = users.filter((user) =>
    `${user.firstName} ${user.middleName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTermDefendant.toLowerCase())
  );

  const handleOnSend = async (e) => {
    try {
      e.preventDefault();
      setSubmitClicked(true);
      setOnSend(true);
      setErrMsg(false);
      setError(null); // Reset error state

      if (ResponseData.message.trim() === "" && createFiles.length === 0) {
        setSubmitClicked(false);
        setErrMsg(true);
        setOnSend(false);
        return;
      }

      const targetUserIds = [
        ...ComplainantData.map((complainant) => complainant.user_id),
        ...DefendantData.map((defendant) => defendant.user_id),
      ];

      // console.log("targetUserIds: ", targetUserIds);

      const obj = {
        name: patawagData.name,
        to: { complainant: ComplainantData, defendant: DefendantData },
        brgy: detail.brgy,
        responses: [
          {
            sender: `${userData.firstName} ${userData.lastName} (${userData.type})`,
            type: "Staff",
            message: `${ResponseData.message}`,
            date: `${ResponseData.date}`,
          },
        ],
        req_id: detail.req_id,
        status: `${ResponseData.status}`,
      };

      var formData = new FormData();
      formData.append("patawag", JSON.stringify(obj));

      const res_folder = await axios.get(
        `${API_LINK}/folder/specific/?brgy=${brgy}`
      );

      if (res_folder.status === 200) {
        for (let i = 0; i < createFiles.length; i++) {
          formData.append("files", createFiles[i]);
        }

        const response = await axios.post(
          `${API_LINK}/blotter/?patawag_folder_id=${res_folder.data[0].blotters}`,
          formData
        );

        if (response.status === 200) {
          // setCreateFiles([]);
          // setResponseData({
          //   sender: "",
          //   type: "Staff",
          //   message: "",
          //   date: new Date().toISOString(),
          //   status: "",
          // });
          // setReply(false);
          // setStatusChanger(false);

          // setSubmitClicked(false);
          // // socket.emit("send-patawag", response.data);
          // setOnSend(false);
          // setUpdate(true);

          const notify = {
            category: "One",
            compose: {
              subject: `PATAWAG - ${request.service_name}`,
              message: `A barangay staff has started your blotter request.\n\n

              Please update this service request as you've seen this notification!\n\n
              Thank you!!,`,
              go_to: "Patawag",
            },
            target: {
              user_id: targetUserIds,
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

          // console.log("notify: ", notify);

          // console.log("notif result: ", result.data)

          if (result.status === 200) {
            socket.emit("send-patawag", response.data);
            setCreateFiles([]);
            setResponseData({
              sender: "",
              type: "Staff",
              message: "",
              date: new Date().toISOString(),
              status: "",
            });
            setReplyingStatus(null);
            setReply(false);
            setStatusChanger(false);

            setSubmitClicked(false);
            socket.emit("send-patawag", response.data);
            setOnSend(false);
            setUpdate(true);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      setSubmitClicked(false);
      setReplyingStatus("error");
      setError("An error occurred while replying to the service request.");
    }
  };

  // console.log("blotterDetails: ", blotterDetails);

  const handleSendReply = async (e) => {
    try {
      e.preventDefault();
      setOnSend(true);
      setErrMsg(false);

      if (ResponseData.message.trim() === "" && createFiles.length === 0) {
        setErrMsg(true);
        setOnSend(false);
        return;
      }

      const targetUserIds = [
        ...blotterDetails?.to?.complainant?.map(
          (complainant) => complainant.user_id
        ),
        ...blotterDetails?.to?.defendant?.map((defendant) => defendant.user_id),
      ];

      console.log("targetUserIds: ", targetUserIds);

      const obj = {
        sender: `${userData.firstName} ${userData.lastName} (${userData.type})`,
        type: "Staff",
        message: `${ResponseData.message}`,
        date: `${ResponseData.date}`,
        folder_id: blotterDetails.folder_id,
        status: `${ResponseData.status}`,
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
          `${API_LINK}/blotter/?patawag_id=${blotterDetails._id}&patawag_folder_id=${res_folder.data[0].blotters}`,
          formData
        );

        if (response.status === 200) {
          const notify = {
            category: "One",
            compose: {
              subject: `PATAWAG - NEW MESSAGE`,
              message: `A barangay staff has replied to your patawag conversation.\n\n

              Please view and respond as you've seen this notification!\n\n
              Thank you!`,
              go_to: "Patawag",
            },
            target: {
              user_id: targetUserIds,
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
            socket.emit("send-patawag", response.data);
            setOnSend(false);

            setCreateFiles([]);
            setResponseData({
              sender: "",
              type: "Staff",
              message: "",
              date: new Date().toISOString(),
              status: "",
            });
            setReply(false);
            setStatusChanger(false);
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

  const handleResetServiceId = () => {
    setDetail({});
    setSelectedFormIndex("");
  };

  const handleResetModal = () => {
    setStatusChanger(false);
    setCreateFiles([]);
    setResponseData([
      {
        sender: "",
        type: "Staff",
        message: "",
        date: new Date().toISOString(),
        status: "",
      },
    ]);
    setComplainantData([]);
    setDefendantData([]);
    setPatawagData({
      name: "",
      to: [ComplainantData, DefendantData],
      response: [ResponseData],
      brgy: "",
      req_id: "",
    });
    setSelectedComplainant("");
    setSelectedDefendant("");
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
                PATAWAG
              </h3>
            </div>

            <div
              // id="scrolltobottom"
              // ref={chatContainerRef}
              className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]"
            >
              <div className="flex flex-col w-full">
                <b className="border-solid border-0 w-full border-black/50 border-b-2 mb-4 uppercase font-medium text-lg md:text-lg mb-4">
                  Conversation History
                </b>
                <form>
                  {!blotterDetails ||
                  !blotterDetails.responses ||
                  blotterDetails.responses.length === 0 ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full mx-2">
                        <div className="relative w-full">
                          <div className="flex flex-col">
                            <div className="mb-4 w-full">
                              <label
                                className="block text-gray-700 text-sm font-bold"
                                htmlFor="title"
                              >
                                Patawag Title
                              </label>
                              {/* Complainant Search Bar */}
                              <input
                                type="text"
                                placeholder="Enter the name for the patawag..."
                                value={patawagData.name}
                                onChange={handlePatawagTitleChange}
                                className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                              />
                            </div>

                            {/* Complainant Section */}
                            <div className="mb-4 w-full">
                              <div className="flex flex-row space-x-2">
                                <label
                                  className="block text-gray-700 text-sm font-bold flex justify-center items-center"
                                  htmlFor="title"
                                >
                                  Complainant
                                </label>

                                {!customComplainant ? (
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOnCustomComplainant();
                                        // resetComplainantData();
                                      }}
                                      className="hs-tooltip rounded-md px-2 py-1 text-xs bg-teal-800 text-white hover:bg-teal-900 focus:shadow-outline focus:outline-none"
                                    >
                                      <BsPersonFillAdd size={16} />
                                      <span
                                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                        role="tooltip"
                                      >
                                        Add Custom Complainant
                                      </span>
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOnCustomComplainant();
                                        // resetComplainantData();
                                      }}
                                      className="hs-tooltip rounded-md px-2 py-1 text-xs bg-pink-800 text-white hover:bg-pink-900 focus:shadow-outline focus:outline-none"
                                    >
                                      <MdCancel size={16} />
                                      <span
                                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                        role="tooltip"
                                      >
                                        Cancel Custom Complainant
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div>
                                {!customComplainant ? (
                                  <div></div>
                                ) : (
                                  <div className="flex flex-col">
                                    <div className="flex flex-row mb-1 w-full space-x-2 mt-2">
                                      <div className="flex flex-col w-full">
                                        <label
                                          className="block text-gray-700 text-sm font-bold flex items-center"
                                          htmlFor="firstName"
                                        >
                                          First Name
                                        </label>
                                        <input
                                          type="text"
                                          name="firstName"
                                          placeholder="Enter First Name..."
                                          className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                          value={complainantInfo.firstName}
                                          onChange={(e) =>
                                            setComplainantInfo({
                                              ...complainantInfo,
                                              firstName: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full">
                                        <label
                                          className="block text-gray-700 text-sm font-bold flex items-center"
                                          htmlFor="middleName"
                                        >
                                          Middle Name
                                        </label>
                                        <input
                                          type="text"
                                          name="middleName"
                                          placeholder="Enter Middle Name..."
                                          className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                          value={complainantInfo.middleName}
                                          onChange={(e) =>
                                            setComplainantInfo({
                                              ...complainantInfo,
                                              middleName: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full">
                                        <label
                                          className="block text-gray-700 text-sm font-bold flex items-center"
                                          htmlFor="lastName"
                                        >
                                          Last Name
                                        </label>
                                        <input
                                          type="text"
                                          name="lastName"
                                          placeholder="Enter Last Name..."
                                          className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                          value={complainantInfo.lastName}
                                          onChange={(e) =>
                                            setComplainantInfo({
                                              ...complainantInfo,
                                              lastName: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="my-1">
                                      <button
                                        type="button"
                                        className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                                        onClick={handleAddComplainant}
                                      >
                                        ADD
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Complainant Search Bar */}
                                <input
                                  type="text"
                                  placeholder="Search complainant..."
                                  value={searchTermComplainant}
                                  onChange={(e) =>
                                    setSearchTermComplainant(e.target.value)
                                  }
                                  className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                />

                                {/* Complainant Select Dropdown */}
                                <select
                                  id="complainant"
                                  name="complainant"
                                  value={selectedComplainant}
                                  onChange={handleComplainantChange}
                                  className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                >
                                  <option>
                                    -- Select An Existing Resident --
                                  </option>
                                  {filteredUsersComplainant
                                    .filter(
                                      (user, index, self) =>
                                        index ===
                                        self.findIndex(
                                          (u) => u._id === user._id
                                        )
                                    )
                                    .map((user) => (
                                      <option key={user.id} value={user._id}>
                                        {`${user.firstName} ${
                                          user.middleName
                                            ? user.middleName + " "
                                            : ""
                                        } ${user.lastName}`}
                                      </option>
                                    ))}
                                </select>

                                {ComplainantData.map((complainant, index) => (
                                  <div
                                    key={index}
                                    className="inline-flex justify-center items-center space-x-2 text-[#414141] font-medium text-sm border border-gray-200 shadow-sm rounded-xl py-2 px-3 mt-2 mr-2"
                                    style={{
                                      background:
                                        "linear-gradient(to right, #99e2b4, #67b99a)",
                                    }}
                                  >
                                    <p className="text-center">
                                      {complainant.firstName}{" "}
                                      {complainant.middleName}{" "}
                                      {complainant.lastName}
                                    </p>

                                    <button
                                      className=" border-black bg-pink-800 md:bg-transparent mt-2 md:mt-0 rounded-lg"
                                      onClick={(e) =>
                                        removeComplainant(e, index)
                                      }
                                    >
                                      <TiDelete
                                        size={24}
                                        className="text-[#a35050] my-1 md:my-0 mx-auto md:mx-none hover:text-red-800 rounded-full"
                                      />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Defendant Section */}
                            <div className="w-full mb-4">
                              <div className="flex flex-row space-x-6">
                                <label
                                  className="block text-gray-700 text-sm font-bold flex justify-center items-center"
                                  htmlFor="title"
                                >
                                  Defendant
                                </label>

                                {!customDefendant ? (
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOnCustomDefendant();
                                        // resetDefendantData();
                                      }}
                                      className="hs-tooltip rounded-md px-2 py-1 text-xs bg-teal-800 text-white hover:bg-teal-900 focus:shadow-outline focus:outline-none"
                                    >
                                      <BsPersonFillAdd size={16} />
                                      <span
                                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                        role="tooltip"
                                      >
                                        Add Custom Defendant
                                      </span>
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOnCustomDefendant();
                                        // resetDefendantData();
                                      }}
                                      className="hs-tooltip rounded-md px-2 py-1 text-xs bg-pink-800 text-white hover:bg-pink-900 focus:shadow-outline focus:outline-none"
                                    >
                                      <MdCancel size={16} />
                                      <span
                                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                        role="tooltip"
                                      >
                                        Cancel Custom Defendant
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {!customDefendant ? (
                                <div></div>
                              ) : (
                                <div className="flex flex-col">
                                  <div className="flex flex-row mb-1 w-full space-x-2 mt-2">
                                    <div className="flex flex-col w-full">
                                      <label
                                        className="block text-gray-700 text-sm font-bold flex items-center"
                                        htmlFor="firstName"
                                      >
                                        First Name
                                      </label>
                                      <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter First Name..."
                                        className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                        value={defendantInfo.firstName}
                                        onChange={(e) =>
                                          setDefendantInfo({
                                            ...defendantInfo,
                                            firstName: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col w-full">
                                      <label
                                        className="block text-gray-700 text-sm font-bold flex items-center"
                                        htmlFor="middleName"
                                      >
                                        Middle Name
                                      </label>
                                      <input
                                        type="text"
                                        name="middleName"
                                        placeholder="Enter Middle Name..."
                                        className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                        value={defendantInfo.middleName}
                                        onChange={(e) =>
                                          setDefendantInfo({
                                            ...defendantInfo,
                                            middleName: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col w-full">
                                      <label
                                        className="block text-gray-700 text-sm font-bold flex items-center"
                                        htmlFor="lastName"
                                      >
                                        Last Name
                                      </label>
                                      <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter Last Name..."
                                        className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                        value={defendantInfo.lastName}
                                        onChange={(e) =>
                                          setDefendantInfo({
                                            ...defendantInfo,
                                            lastName: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="my-1">
                                    <button
                                      type="button"
                                      className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                                      onClick={handleAddDefendant}
                                    >
                                      ADD
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div>
                                {/* Defendant Search Bar */}
                                <input
                                  type="text"
                                  placeholder="Search defendant..."
                                  value={searchTermDefendant}
                                  onChange={(e) =>
                                    setSearchTermDefendant(e.target.value)
                                  }
                                  className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                />

                                {/* Defendant Select Dropdown */}
                                <select
                                  id="defendant"
                                  name="defendant"
                                  value={selectedDefendant}
                                  onChange={handleDefendantChange}
                                  className="shadow border w-full py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline mt-2"
                                >
                                  <option>
                                    -- Select An Existing Resident --
                                  </option>
                                  {filteredUsersDefendant
                                    .filter(
                                      (user, index, self) =>
                                        index ===
                                        self.findIndex(
                                          (u) => u._id === user._id
                                        )
                                    )
                                    .map((user) => (
                                      <option key={user.id} value={user._id}>
                                        {`${user.firstName} ${
                                          user.middleName
                                            ? user.middleName + " "
                                            : ""
                                        } ${user.lastName}`}
                                      </option>
                                    ))}
                                </select>

                                {DefendantData.map((defendant, index) => (
                                  <div
                                    key={index}
                                    className="inline-flex justify-center items-center space-x-2 text-[#414141] font-medium text-sm border border-gray-200 shadow-sm rounded-xl py-2 px-3 mt-2 mr-2"
                                    style={{
                                      background:
                                        "linear-gradient(to right, #99e2b4, #67b99a)",
                                    }}
                                  >
                                    <p>
                                      {defendant.firstName}{" "}
                                      {defendant.middleName}{" "}
                                      {defendant.lastName}
                                    </p>

                                    <button
                                      className=" border-black bg-pink-800 md:bg-transparent mt-2 md:mt-0 rounded-lg"
                                      onClick={(e) => removeDefendant(e, index)}
                                    >
                                      <TiDelete
                                        size={24}
                                        className="text-[#a35050] my-1 md:my-0 mx-auto md:mx-none hover:text-red-800 rounded-full"
                                      />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {errMsg ? (
                            <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex">
                              <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                                Please enter a message or insert a file!
                              </p>
                            </div>
                          ) : null}

                          <textarea
                            id="message"
                            name="message"
                            onChange={handleChange}
                            rows={7}
                            value={
                              ResponseData.message
                                ? ResponseData.message
                                : statusChanger
                                ? `The status of this barangay patawag is ${request.status}`
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
                                    <div className="flex flex-row space-x-3">
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
                                            /The status of this barangay patawag is [\w\s]+/;
                                          let updatedMessage =
                                            ResponseData.message;

                                          if (
                                            statusRegex.test(updatedMessage)
                                          ) {
                                            updatedMessage =
                                              updatedMessage.replace(
                                                statusRegex,
                                                `The status of this barangay patawag is ${newStatus}`
                                              );
                                          } else if (!updatedMessage.trim()) {
                                            updatedMessage = `The status of this barangay patawag is ${newStatus}`;
                                          }

                                          if (statusChanger) {
                                            setResponseData((prev) => ({
                                              ...prev,
                                              message: updatedMessage,
                                            }));
                                          }
                                          setResponseData((prev) => ({
                                            ...prev,
                                            status: newStatus,
                                          }));
                                        }}
                                        className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                        value={ResponseData.status}
                                        hidden={!statusChanger}
                                      >
                                        <option disabled>
                                          -- Select Status --
                                        </option>
                                        <option value="In Progress">
                                          IN PROGRESS
                                        </option>
                                        <option value="Completed">
                                          COMPLETED
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

                  {blotterDetails &&
                    blotterDetails.responses &&
                    blotterDetails.responses.map((responseItem, index) => (
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

                          {index === blotterDetails.responses.length - 1 ? (
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
                                      ResponseData.message
                                        ? ResponseData.message
                                        : statusChanger
                                        ? `The status of this barangay patawag is ${request.status}`
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
                                            <div className="flex flex-row space-x-3">
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
                                                    /The status of this barangay patawag is [\w\s]+/;
                                                  let updatedMessage =
                                                    ResponseData.message;

                                                  if (
                                                    statusRegex.test(
                                                      updatedMessage
                                                    )
                                                  ) {
                                                    updatedMessage =
                                                      updatedMessage.replace(
                                                        statusRegex,
                                                        `The status of this barangay patawag is ${newStatus}`
                                                      );
                                                  } else if (
                                                    !updatedMessage.trim()
                                                  ) {
                                                    updatedMessage = `The status of this barangay patawag is ${newStatus}`;
                                                  }

                                                  if (statusChanger) {
                                                    setResponseData((prev) => ({
                                                      ...prev,
                                                      message: updatedMessage,
                                                    }));
                                                  }
                                                  setResponseData((prev) => ({
                                                    ...prev,
                                                    status: newStatus,
                                                  }));
                                                }}
                                                className="shadow ml-4 border w-5/6 py-2 px-4 text-sm text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:shadow-outline"
                                                value={ResponseData.status}
                                                hidden={!statusChanger}
                                              >
                                                <option disabled>
                                                  -- Select Status --
                                                </option>
                                                <option value="In Progress">
                                                  IN PROGRESS
                                                </option>
                                                <option value="Completed">
                                                  COMPLETED
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
                                        <button
                                          type="submit"
                                          onClick={handleSendReply}
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
                onClick={handleResetServiceId && handleResetModal}
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
