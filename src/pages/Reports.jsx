import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import Chart from "react-apexcharts";
import moment from "moment";

const Reports = () => {
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [archivedServices, setArchivedServices] = useState([]);
  const [archivedRequests, setArchivedRequests] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [isSpecificSelected, setIsSpecificSelected] = useState(false);
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [isWeeklySelected, setIsWeeklySelected] = useState(false);
  const [isMonthlySelected, setIsMonthlySelected] = useState(false);
  const [isAnnualSelected, setIsAnnualSelected] = useState(false);
  const [dateType, setDateType] = useState("specific");
  const [startDate, setStartDate] = useState("");
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [selected, setSelected] = useState("date");

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

        if (servicesResponse.status === 200)
          setServices(servicesResponse.data.result);
        else setServices([]);

        if (requestsResponse.status === 200)
          setRequests(requestsResponse.data.result);

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
        const activeUsersResponse = await axios.get(
          `${API_LINK}/users/?brgy=${brgy}&type=Resident`
        );
        if (activeUsersResponse.status === 200) {
          setUsers(activeUsersResponse.data.result);
        } else {
          setUsers([]);
        }

        // Fetch archived users
        const archivedUsersResponse = await axios.get(
          `${API_LINK}/users/showArchived/?brgy=${brgy}&type=Resident`
        );
        if (archivedUsersResponse.status === 200) {
          setArchivedUsers(archivedUsersResponse.data.result);
        } else {
          setArchivedUsers([]);
        }

        const announcementsResponse = await axios.get(
          `${API_LINK}/announcement/?brgy=${brgy}&archived=false`
        );
        if (announcementsResponse.status === 200) {
          setAnnouncements(announcementsResponse.data.result);
        } else {
          setAnnouncements([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
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
    setIsTodaySelected(false);
    setIsSpecificSelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsTodaySelected(!isTodaySelected);
  };

  const handleSpecificToggle = () => {
    setIsSpecificSelected(true);
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsSpecificSelected(!isSpecificSelected);
  };

  const handleWeeklyToggle = () => {
    setIsSpecificSelected(false);
    setIsTodaySelected(false);
    setIsWeeklySelected(true);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsWeeklySelected(!isWeeklySelected);
  };

  const handleMonthlyToggle = () => {
    setIsSpecificSelected(false);
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(true);
    setIsAnnualSelected(false);
    setIsMonthlySelected(!isMonthlySelected);
  };

  const handleAnnualToggle = () => {
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(true);
    setIsAnnualSelected(!isAnnualSelected);
  };

  //Start for Profit
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

   // End for Profit

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
      colors: ["#4b7c80"],
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
      colors: ["#4caf50", "#ff9800", "#ac4646"], // Colors for Registered, Pending, Denied
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
      colors: ["#4b7c80"],
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

  const getStatusPercentages = () => {
    const statusCounts = {};

    // Initialize counts
    [
      "Transaction Completed",
      "Rejected",
      "Pending",
      "Paid",
      "Processing",
      "Cancelled",
    ].forEach((status) => {
      statusCounts[status] = 0;
    });

    // Count occurrences of each status
    requests.forEach((request) => {
      statusCounts[request.status]++;
    });

    // Calculate percentages
    const totalCount = requests.length;
    const percentages = Object.fromEntries(
      Object.entries(statusCounts).map(([status, count]) => [
        status,
        (count / totalCount) * 100,
      ])
    );

    return percentages;
  };

  const statusPercentages = getStatusPercentages();

  const chartDataStatusPercentage = {
    series: Object.values(statusPercentages),
    options: {
      colors: [
        "#4caf50",
        "#ff9800",
        "#ac4646",
        "#2196f3",
        "#ffeb3b",
        "#9e9e9e",
      ], // Add more colors if needed
      chart: {
        background: "transparent",
      },
      labels: [
        "Transaction Completed",
        "Rejected",
        "Pending",
        "Paid",
        "Processing",
        "Cancelled",
      ],
    },
  };

  const getPopulationGrowthData = () => {
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    const activePopulationData = Array.from({ length: 6 }, (_, index) => {
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

      const activePopulationCount = users.filter(
        (user) => new Date(user.createdAt) <= endOfMonth
      ).length;

      return activePopulationCount;
    }).reverse();

    const archivedPopulationData = Array.from({ length: 6 }, (_, index) => {
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

      const archivedPopulationCount = archivedUsers.filter(
        (user) => new Date(user.createdAt) <= endOfMonth
      ).length;

      return archivedPopulationCount;
    }).reverse();

    const totalResidentsData = Array.from({ length: 6 }, (_, index) => {
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

      const totalResidentsCount =
        users.filter((user) => new Date(user.createdAt) <= endOfMonth).length +
        archivedUsers.filter((user) => new Date(user.createdAt) <= endOfMonth)
          .length;

      return totalResidentsCount;
    }).reverse();

    return {
      series: [
        {
          name: "Active Residents",
          data: activePopulationData,
        },
        {
          name: "Archived Residents",
          data: archivedPopulationData,
        },
        {
          name: "Total Residents",
          data: totalResidentsData,
        },
      ],
      options: {
        colors: ["#4b7c80", "#ff0000", "#0000ff"], // Adjust colors as needed
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
  };

  const chartDataPopulationGrowth = getPopulationGrowthData();

  const getCompletedRequestsLastSixMonths = () => {
    const startDate = sixMonthsAgo.toISOString();
    const endDate = currentDate.toISOString();
    return requests.filter(
      (request) =>
        request.status === "Transaction Completed" &&
        new Date(request.updatedAt) >= new Date(startDate) &&
        new Date(request.updatedAt) <= new Date(endDate)
    );
  };

  const completedRequestsLastSixMonths = getCompletedRequestsLastSixMonths();
  const completionRateData = Array.from({ length: 6 }, (_, index) => {
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

    const completedCount = completedRequestsLastSixMonths.filter(
      (request) =>
        new Date(request.updatedAt) >= startOfMonth &&
        new Date(request.updatedAt) <= endOfMonth
    ).length;

    return completedCount;
  }).reverse();

  const chartDataCompletionRate = {
    series: [
      {
        name: "Completed Requests",
        data: completionRateData,
      },
    ],
    options: {
      colors: ["#4b7c80"],
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

  // Function to get the total attendees for each announcement
  const totalAttendees = announcements.map((announcement) => ({
    announcement_title: announcement.title,
    attendees: announcement.attendees.length,
  }));

  // Sort the total attendees array in descending order
  totalAttendees.sort((a, b) => b.attendees - a.attendees);

  // Chart data for trend of attendance in events
  const chartDataAttendanceTrend = {
    series: [
      {
        name: "Total Attendees",
        data: totalAttendees.map((item) => item.attendees),
      },
    ],
    options: {
      colors: ["#4b7c80"],
      chart: {
        background: "transparent",
      },
      xaxis: {
        categories: totalAttendees.map((item) => item.announcement_title),
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
    },
  };

  // Function to get the total number of events created each month
  const eventsCreatedEachMonth = Array.from({ length: 6 }, (_, index) => {
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

    const eventsCount = requests.filter(
      (announcement) =>
        new Date(announcement.createdAt) >= startOfMonth &&
        new Date(announcement.createdAt) <= endOfMonth
    ).length;

    return eventsCount;
  }).reverse();

  // Chart data for number of events organized each month
  const chartDataEventsOrganized = {
    series: [
      {
        name: "Number of Events",
        data: eventsCreatedEachMonth,
      },
    ],
    options: {
      colors: ["#4b7c80"],
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

  const filters = (choice, selectedDate) => {
    switch (choice) {
      case "date":
        return requests.filter((item) => {
          console.log(typeof new Date(item.createdAt), selectedDate);
          console.log(requests);
          return (
            new Date(item.createdAt).getFullYear() === selectedDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === selectedDate.getMonth() &&
            new Date(item.createdAt).getDate() === selectedDate.getDate()
          );
        });
      case "week":
        const startDate = selectedDate;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        console.log("start and end", startDate, endDate);

        return requests.filter(
          (item) =>
            new Date(item.createdAt).getFullYear() === startDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === startDate.getMonth() &&
            new Date(item.createdAt).getDate() >= startDate.getDate() &&
            new Date(item.createdAt).getDate() <= endDate.getDate()
        );
      case "month":
        return requests.filter(
          (item) =>
            new Date(item.createdAt).getFullYear() === selectedDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === selectedDate.getMonth()
        );
      case "year":
        return requests.filter(
          (item) => new Date(item.createdAt).getFullYear() === selectedDate.getFullYear()
        );
    }
  };

  const onSelect = (e) => {
    console.log("select", e.target.value);

    setSelected(e.target.value);

    console.log("specified select", filters(e.target.value, specifiedDate));
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setSpecifiedDate(date);
  };

  const onChangeWeek = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
  };

  const onChangeMonth = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
  };

  const onChangeYear = (e) => {
    if (e.target.value === "") {
      setRequests(requests); // Replace with your initial data
    } else {
      const date = new Date(e.target.value, 0, 1);
      setSpecifiedDate(date);
    }
  }

  return (
    <div className="mx-4 mt-4 ">
      <div className="flex flex-col scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb lg:overflow-y-scroll lg:overflow-x-hidden lg:h-[calc(100vh_-_95px)]">
        <div className="flex lg:justify-end mb-3 w-full lg:w-auto ">
          <div className="flex flex-col w-full lg:w-auto">
            <div
              id="toggle-count"
              className="flex p-0.5 bg-gray-700 rounded-lg w-full lg:w-auto items-center overflow-y-scroll lg:overflow-y-hidden"
            >
              <label
                htmlFor="toggle-count-specific"
                className="relative inline-block py-1.5 md:py-2 px-3 w-full bg-gray-700 lg:w-auto items-center justify-center"
              >
                <span
                  className={`inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer ${
                    isSpecificSelected
                      ? "dark:text-white"
                      : "dark:text-gray-200"
                  }`}
                  onClick={handleSpecificToggle}
                >
                  Specific
                </span>
                <input
                  id="toggle-count-today"
                  name="toggle-count"
                  type="radio"
                  className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 before:bg-slate-700 before:shadow-sm checked:before:bg-slate-800 checked:before:shadow-sm checked:bg-none focus:ring-transparent"
                  checked={isSpecificSelected}
                  onChange={onChangeDate}
                />
              </label>
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
                />
              </label>
              <label
                htmlFor="toggle-count-weekly"
                className="relative inline-block py-2 px-1 lg:px-3 w-full lg:w-auto flex items-center justify-center"
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
                  onChange={onChangeWeek}
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
                  onChange={onChangeMonth}
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
                  onChange={onChangeYear}
                  min={1990}
                  max={new Date().getFullYear() + 10}
                />
              </label>
            </div>

            {/* DATE INPUTS */}
            <div className="w-full">
              {isSpecificSelected && (
                <div className="flex flex-col">
                  <select
                    className="bg-[#f8f8f8] text-gray-600 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                    onChange={onSelect}
                    defaultValue={selected}
                  >
                    <option value="date">Specific Date</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                  {selected === "date" && (
                    <input
                      className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                      type="date"
                      id="date"
                      name="date"
                      onChange={onChangeDate}
                    />
                  )}
                  {selected === "week" && (
                    <input
                      className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                      type="week"
                      id="week"
                      name="week"
                      onChange={onChangeWeek}
                    />
                  )}
                  {selected === "month" && (
                    <input
                      className=" text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                      type="month"
                      id="month"
                      name="month"
                      onChange={onChangeMonth}
                    />
                  )}
                  {selected === "year" && (
                    <input
                      className=" text-black py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-grey-800 w-full"
                      type="number"
                      id="year"
                      name="year"
                      placeholder="YEAR"
                      onChange={onChangeYear}
                      min={1990}
                      max={new Date().getFullYear() + 10}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:items-center border border-gray-200 bg-[#2c606d] shadow-sm rounded-xl">
          <div className="flex flex-col p-4">
            <h4 className="text-white mb-1 text-xs lg:text-md">
              TOTAL SERVICES TAKEN
            </h4>
            <div className="flex gap-x-1">
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 19, "max": 29}'
                className="text-white font-semibold text-xl lg:text-3xl "
              >
                {filteredTotalServices}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <h4 className="text-white mb-1 text-xs lg:text-md">
                COMPLETED SERVICES
              </h4>
            </div>
            <div className="flex gap-x-1">
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 89, "max": 99}'
                className="text-gray-800 font-semibold text-xl lg:text-3xl dark:text-gray-200"
              >
                {filteredCompletedServices}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <h4 className="text-white mb-1 text-xs lg:text-md">
                ESTIMATED OVERALL REVENUE
              </h4>
            </div>
            <div className="flex gap-x-1">
              <span className="text-md lg:text-xl font-normal text-gray-800 dark:text-gray-200">
                PHP
              </span>
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 89, "max": 99}'
                className="text-gray-800 font-semibold text-xl lg:text-3xl dark:text-gray-200"
              >
                {filteredEstimatedRevenue}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <h4 className="text-white mb-1 text-xs lg:text-md">
              CURRENT REVENUE FROM SERVICES
            </h4>
            <div className="flex gap-x-1">
              <span className="text-md lg:text-xl font-normal text-gray-800 dark:text-gray-200">
                PHP
              </span>
              <p
                data-hs-toggle-count='{"target": "#toggle-count", "min": 129, "max": 149}'
                className="text-gray-800 font-semibold text-xl lg:text-3xl dark:text-gray-200"
              >
                {totalFees}
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
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

          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
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
          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              RESIDENT STATUS CHART
            </h1>
            <div className="flex rounded-xl justify-center items-center">
              <Chart
                type="pie"
                className="flex rounded-xl justify-center w-[400px] lg:w-[300px] xl:w-[400px] xxl:w-[500px] my-10"
                series={chartDataResidentStatus.series}
                options={chartDataResidentStatus.options}
              />
            </div>
          </div>

          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              POPULATION GROWTH (FOR THE PAST 6 MONTHS)
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="line"
                className="flex w-full rounded-xl"
                series={chartDataPopulationGrowth.series}
                options={chartDataPopulationGrowth.options}
              />
            </div>
          </div>
        </div>

        {/* CHARTS 3 */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full">
          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              SERVICE REQUEST PERCENTAGE
            </h1>
            <div className="flex justify-center items-center rounded-xl">
              <Chart
                type="pie"
                className="flex rounded-xl justify-center w-[500px] lg:w-[300px] xl:w-[400px] xxl:w-[600px] my-10"
                series={chartDataStatusPercentage.series}
                options={chartDataStatusPercentage.options}
              />
            </div>
          </div>

          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              SERVICE REQUEST COMPLETION RATE (FOR THE PAST 6 MONTHS)
            </h1>
            <div className="flex rounded-xl">
              <Chart
                type="line"
                className="flex w-full rounded-xl flex-col "
                series={chartDataCompletionRate.series}
                options={chartDataCompletionRate.options}
              />
            </div>
          </div>
        </div>

        {/* CHARTS 4 */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full ">
          <div className="flex flex-col bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              OVERALL TRENDING EVENTS
            </h1>
            <div className="flex justify-center items-center rounded-xl">
              <Chart
                type="bar"
                className="flex w-full justify-center rounded-xl xl:w-[500px] xxl:w-full mt-5"
                series={chartDataAttendanceTrend.series}
                options={chartDataAttendanceTrend.options}
              />
            </div>
          </div>

          <div className="flex flex-col bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5">
            <h1 className="mt-5 ml-5 font-medium text-black">
              OVERALL NUMBER OF CREATED EVENTS (FOR THE PAST 6 MONTHS)
            </h1>
            <div className="flex justify-center items-center rounded-xl">
              <Chart
                type="line"
                className="flex w-full justify-center rounded-xl xl:w-[500px] xxl:w-full mt-5"
                series={chartDataEventsOrganized.series}
                options={chartDataEventsOrganized.options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
