import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";

const Reports = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [announcement, setAnnouncement] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Reports | Barangay E-Services Management";
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/announcement/?brgy=${brgy}&archived=false`
      );
      if (response.status === 200) setAnnouncements(response.data);
      else setAnnouncements([]);
    };

    fetch();
  }, []);

  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col ">
        <div className="flex justify-end mb-3">
          <div
            id="toggle-count"
            className="p-0.5 inline-block bg-gray-100 rounded-lg dark:bg-gray-700"
          >
             <label
              for="toggle-count-today"
              className="relative inline-block py-2 px-3"
            >
              <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
                Today
              </span>
              <input
                id="toggle-count-today"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
              />
            </label>
            <label
              for="toggle-count-weekly"
              className="relative inline-block py-2 px-3"
            >
              <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
                Weekly
              </span>
              <input
                id="toggle-count-weekly"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
              />
            </label>
            <label
              for="toggle-count-monthly"
              className="relative inline-block py-2 px-3"
            >
              <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
                Monthly
              </span>
              <input
                id="toggle-count-monthly"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
              />
            </label>
            <label
              for="toggle-count-annual"
              className="relative inline-block py-2 px-3"
            >
              <span className="inline-block relative z-10 text-sm font-medium text-white cursor-pointer">
                Annual
              </span>
              <input
                id="toggle-count-annual"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
                checked
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 lg:items-center border border-gray-200 rounded-xl bg-slate-800">
          <div className="flex flex-col p-4">
            <h4 className="text-gray-800 mb-1 dark:text-gray-200">Startup</h4>
            <div className="flex gap-x-1">
              <span className="text-xl font-normal text-gray-200">
                $
              </span>
              <p
                data-hs-toggle-count='{
          "target": "#toggle-count",
          "min": 19,
          "max": 29
        }'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                19
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <h4 className="text-gray-800 mb-1 dark:text-gray-200">Team</h4>
            </div>
            <div className="flex gap-x-1">
              <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
                $
              </span>
              <p
                data-hs-toggle-count='{
          "target": "#toggle-count",
          "min": 89,
          "max": 99
        }'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                89
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <h4 className="text-gray-800 mb-1 dark:text-gray-200">Enterprise</h4>
            <div className="flex gap-x-1">
              <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
                $
              </span>
              <p
                data-hs-toggle-count='{
          "target": "#toggle-count",
          "min": 129,
          "max": 149
        }'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                129
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
