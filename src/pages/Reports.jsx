import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import Chart from "react-apexcharts";

const Reports = () => {
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [archivedServices, setArchivedServices] = useState([]);
  const [archivedRequests, setArchivedRequests] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [isWeeklySelected, setIsWeeklySelected] = useState(false);
  const [isMonthlySelected, setIsMonthlySelected] = useState(false);
  const [isAnnualSelected, setIsAnnualSelected] = useState(false);
  const [dateType, setDateType] = useState("specific");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services and requests
        const servicesResponse = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=false`
        );
        const requestsResponse = await axios.get(
          `${API_LINK}/requests/?brgy=${brgy}&archived=false`
        );

        if (servicesResponse.status === 200) setServices(servicesResponse.data.result);
        else setServices([]);

        if (requestsResponse.status === 200) setRequests(requestsResponse.data.result);

        // Fetch archived requests
        const archivedRequestsResponse = await axios.get(
          `${API_LINK}/requests/?brgy=${brgy}&archived=true`
        );
        if (archivedRequestsResponse.status === 200)
          setArchivedRequests(archivedRequestsResponse.data.result);

        // Fetch archived services
        const archivedServicesResponse = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=true`
        );
        if (archivedServicesResponse.status === 200)
          setArchivedServices(archivedServicesResponse.data.result);

        // Fetch users
        const usersResponse = await axios.get(
          `${API_LINK}/users/?brgy=${brgy}&type=Resident`
        );
        if (usersResponse.status === 200) {
          setUsers(usersResponse.data.result);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [brgy]);

  const startOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday is the first day of the week
    return new Date(currentDate.setDate(diff));
  };

  // Function to get the end of the week
  const endOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() + (6 - day); // Adjust when Sunday is the first day of the week
    return new Date(currentDate.setDate(diff));
  };

  const startOfMonth = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  // Function to get the end of the month
  const endOfMonth = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  };

  const startOfYear = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), 0, 1);
  };

  // Function to get the end of the year
  const endOfYear = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), 11, 31);
  };

  const handleTodayToggle = () => {
    setIsTodaySelected(!isTodaySelected);
  };

  const handleWeeklyToggle = () => {
    setIsWeeklySelected(!isWeeklySelected);
  };

  const handleMonthlyToggle = () => {
    setIsMonthlySelected(!isMonthlySelected);
  };

  const handleAnnualToggle = () => {
    setIsAnnualSelected(!isAnnualSelected);
  };

  const allRequests = [...requests, ...archivedRequests];
  const getFilteredRequests = () => {
    if (isTodaySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
      );
    } else if (isWeeklySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      );
    } else if (isMonthlySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      );
    } else if (isAnnualSelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      );
    } else {
      return requests.filter(
        (request) => request.status === "Transaction Completed"
      );
    }
  };

  const filteredRequests = getFilteredRequests();

  const totalFees = filteredRequests.reduce(
    (total, request) => total + request.fee,
    0
  );

  const estimatedRevenue = requests.reduce(
    (total, request) =>
      request.status !== "Cancelled" ? total + request.fee : total,
    0
  );

  const filteredTotalServices = isTodaySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt).toDateString() ===
          new Date().toDateString()
      ).length
    : isWeeklySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      ).length
    : isMonthlySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      ).length
    : isAnnualSelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      ).length
    : requests.length;

  const filteredCompletedServices = isTodaySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
      ).length
    : isWeeklySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      ).length
    : isMonthlySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      ).length
    : isAnnualSelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      ).length
    : requests.filter((request) => request.status === "Transaction Completed")
        .length;

  const filteredEstimatedRevenue = isTodaySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isWeeklySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfWeek(new Date()) &&
            new Date(request.createdAt) <= endOfWeek(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isMonthlySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfMonth(new Date()) &&
            new Date(request.createdAt) <= endOfMonth(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isAnnualSelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfYear(new Date()) &&
            new Date(request.createdAt) <= endOfYear(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : requests.reduce(
        (total, request) =>
          request.status !== "Cancelled" ? total + request.fee : total,
        0
      );

  // Calculate total availed for each service
  const allServices = [...services, ...archivedServices];
  const totalAvailed = allServices.map((service) => {
    const count = requests.filter(
      (request) => request.service_name === service.name
    ).length;
    return {
      service_name: service.name,
      count,
    };
  });

  const chartDataOverallAvailed = {
    series: [
      {
        name: "Total Availed",
        data: totalAvailed.map((item) => item.count),
      },
    ],
    options: {
      theme: {
        mode: "dark",
      },
      colors: ["#ff0000"],
      chart: {
        background: "transparent",
      },
      xaxis: {
        categories: totalAvailed.map((item) => item.service_name),
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
    },
  };

  const getStatusCounts = () => {
    const registeredCount = users.filter(
      (user) => user.isApproved === "Registered"
    ).length;
    const pendingCount = users.filter(
      (user) => user.isApproved === "Pending"
    ).length;
    const deniedCount = users.filter(
      (user) => user.isApproved === "Denied"
    ).length;

    return [registeredCount, pendingCount, deniedCount];
  };

  const [registeredCount, pendingCount, deniedCount] = getStatusCounts();

  const chartDataResidentStatus = {
    series: [registeredCount, pendingCount, deniedCount],
    options: {
      theme: {
        mode: "dark",
      },
      colors: ["#4caf50", "#ff9800", "#f44336"], // Colors for Registered, Pending, Denied
      chart: {
        background: "transparent",
      },
      labels: ["Registered", "Pending", "Denied"],
    },
  };

  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const monthlyRevenueData = Array.from({ length: 6 }, (_, index) => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - index,
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - index + 1,
      0
    );

    const revenue = requests
      .filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfMonth &&
          new Date(request.createdAt) <= endOfMonth
      )
      .reduce((total, request) => total + request.fee, 0);

    return revenue;
  }).reverse();

  const chartDataRevenue = {
    series: [
      {
        name: "Revenue",
        data: monthlyRevenueData,
      },
    ],
    options: {
      theme: {
        mode: "dark",
      },
      colors: ["#ff0000"],
      chart: {
        background: "transparent",
      },
      xaxis: {
        categories: Array.from({ length: 6 }, (_, index) =>
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - index,
            1
          ).toLocaleString("en-us", {
            month: "short",
          })
        ).reverse(),
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
    },
  };

  const handleDateTypeChange = (e) => {
    setDateType(e.target.value);
  };

  return (
    <div className="mx-4 mt-4 ">
      <div className="flex flex-col scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll lg:overflow-x-hidden h-[calc(100vh_-_95px)]">
        <div className="flex justify-end mb-3">
          <div
            id="toggle-count"
            className="flex p-0.5 bg-gray-700 rounded-lg w-full lg:w-auto items-center"
          >
            <label
              htmlFor="toggle-count-today"
              className="relative inline-block py-2 px-3 w-full lg:w-auto flex items-center justify-center"
            >
              <span
                className={`inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer ${
                  isTodaySelected ? "dark:text-white" : "dark:text-gray-200"
                }`}
                onClick={handleTodayToggle}
              >
                Today
              </span>
              <input
                id="toggle-count-today"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
                checked={isTodaySelected}
                onChange={() => {}}
              />
            </label>
            <label
              htmlFor="toggle-count-weekly"
              className="relative inline-block py-2 px-3 w-full lg:w-auto flex items-center justify-center"
            >
              <span
                className={`inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer ${
                  isWeeklySelected ? "dark:text-white" : "dark:text-gray-200"
                }`}
                onClick={handleWeeklyToggle}
              >
                Weekly
              </span>
              <input
                id="toggle-count-weekly"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
                checked={isWeeklySelected}
                onChange={() => {}}
              />
            </label>
            <label
              htmlFor="toggle-count-monthly"
              className="relative inline-block py-2 px-3 w-full lg:w-auto flex items-center justify-center"
            >
              <span
                className={`inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer ${
                  isMonthlySelected ? "dark:text-white" : "dark:text-gray-200"
                }`}
                onClick={handleMonthlyToggle}
              >
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
              htmlFor="toggle-count-annual"
              className="relative inline-block py-2 px-3 w-full lg:w-auto flex items-center justify-center"
            >
              <span
                className={`inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer ${
                  isAnnualSelected ? "dark:text-white" : "dark:text-gray-200"
                }`}
                onClick={handleAnnualToggle}
              >
                Annual
              </span>
              <input
                id="toggle-count-annual"
                name="toggle-count"
                type="radio"
                className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:items-center border border-gray-200 rounded-xl bg-slate-800">
          <div className="flex flex-col p-4">
            <h4 className="text-white mb-1 text-sm lg:text-md">
              TOTAL SERVICES TAKEN
            </h4>
            <div className="flex gap-x-1">
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 19, "max": 29}'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                {filteredTotalServices}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <h4 className="text-white mb-1 text-sm lg:text-md">
                COMPLETED SERVICES
              </h4>
            </div>
            <div className="flex gap-x-1">
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 89, "max": 99}'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                {filteredCompletedServices}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <h4 className="text-white mb-1 text-sm lg:text-md">
                ESTIMATED OVERALL REVENUE
              </h4>
            </div>
            <div className="flex gap-x-1">
              <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
                PHP
              </span>
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 89, "max": 99}'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                {filteredEstimatedRevenue}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <h4 className="text-white mb-1 text-sm lg:text-md">
              CURRENT REVENUE FROM SERVICES
            </h4>
            <div className="flex gap-x-1">
              <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
                PHP
              </span>
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 129, "max": 149}'
                className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
              >
                {totalFees}
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              REQUESTED SERVICES
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="bar"
                className="flex w-full rounded-xl"
                series={chartDataOverallAvailed.series}
                options={chartDataOverallAvailed.options}
              />
            </div>
          </div>

          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              REVENUE FOR THE PAST 6 MONTHS
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="line"
                className="flex w-full rounded-xl"
                series={chartDataRevenue.series}
                options={chartDataRevenue.options}
              />
            </div>
          </div>
        </div>

        {/* CHARTS 2 */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              RESIDENT STATUS CHART
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="pie"
                width={600}
                height={600}
                className="flex w-full rounded-xl justify-center"
                series={chartDataResidentStatus.series}
                options={chartDataResidentStatus.options}
              />
            </div>
          </div>

          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              SERVICE REQUESTED PERCENTAGE
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="pie"
                width={600}
                height={600}
                className="flex w-full rounded-xl justify-center"
                series={chartDataResidentStatus.series}
                options={chartDataResidentStatus.options}
              />
            </div>
          </div>
        </div>

        {/* CHARTS 3 */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              MOBILE APP RATING
            </h1>
            <div className="flex rounded-xl">
            <Chart
                type="line"
                className="flex w-full rounded-xl "
                series={[
                  {
                    name: "Company1",
                    data: [100, 200, 232, 132, 422, 132],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  colors: ["#ff0000"], // Corrected color code
                  chart: {
                    background: "transparent",
                  },
                  // Add other chart options as needed
                }}
              />
            </div>
          </div>

          <div className="bg-slate-800 w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-white">
              MOBILE APP USAGE
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="line"
                className="flex w-full rounded-xl "
                series={[
                  {
                    name: "Company1",
                    data: [100, 200, 232, 132, 422, 132],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  colors: ["#ff0000"], // Corrected color code
                  chart: {
                    background: "transparent",
                  },
                  // Add other chart options as needed
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
