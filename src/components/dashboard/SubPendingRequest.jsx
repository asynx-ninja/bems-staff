import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import ViewRequestModal from "./ViewRequestModal";

const SubPendingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({ response: [{ file: [] }] });
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/requests/?brgy=${brgy}&archived=false`
        );

        if (response.status === 200) setRequests(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  const handleView = (item) => {
    setRequest(item);
  };

  return (
    <div className="w-full lg:w-6/12 flex flex-col h-full ">
      <div className="flex flex-col max-h-screen">
        <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl mb-4 shrink-0">
          PENDING REQUESTS
        </b>
        <div className="relative scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-auto xxl:h-[calc(100vh_-_410px)] xxxl:h-[calc(100vh_-_410px)] w-full">
          <table className="table-auto w-full">
            <thead className="uppercase text-xs md:text-sm bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Name
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Service Type
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Requested Date
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              {requests.map((item, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {item.service_name}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {item.type}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {new Date(item.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    <button
                      type="button"
                      data-hs-overlay="#hs-view-request-modal"
                      onClick={() => handleView({ ...item })}
                      className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                    >
                      <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
                    </button>
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      View Request
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {Object.hasOwn(request, "service_id") ? (
        <ViewRequestModal request={request} id={id} brgy={brgy} />
      ) : null}
    </div>
  );
};

export default SubPendingRequest;
