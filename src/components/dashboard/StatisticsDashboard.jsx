import React from "react";
import { BsMegaphone } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import { Link } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { FaServicestack } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";

const StatisticsDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [archivedAnnouncements, setArchivedAnnouncements] = useState([]);
  const [users, setUsers] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [archivedServices, setArchivedServices] = useState([]);
  const [officials, setOfficials] = useState([]);
  const [archivedOfficials, setArchivedOfficials] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementsResponse = await axios.get(
          `${API_LINK}/announcement/?brgy=${brgy}&archived=false`
        );
        setAnnouncements(
          announcementsResponse.status === 200 ? announcementsResponse.data : []
        );

        const usersResponse = await axios.get(`${API_LINK}/users/${brgy}`);
        setUsers(usersResponse.status === 200 ? usersResponse.data : []);

        const archivedUsersResponse = await axios.get(
          `${API_LINK}/users/showArchived/${brgy}`
        );
        setArchivedUsers(
          archivedUsersResponse.status === 200 ? archivedUsersResponse.data : []
        );

        const servicesResponse = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=false`
        );
        setServices(
          servicesResponse.status === 200 ? servicesResponse.data : []
        );

        const officialsResponse = await axios.get(
          `${API_LINK}/brgyofficial/?brgy=${brgy}&archived=false`
        );
        setOfficials(
          officialsResponse.status === 200 ? officialsResponse.data : []
        );

        const archivedServicesResponse = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=true`
        );
        setArchivedServices(
          archivedServicesResponse.status === 200
            ? archivedServicesResponse.data
            : []
        );

        const archivedAnnouncementsResponse = await axios.get(
          `${API_LINK}/announcement/?brgy=${brgy}&archived=true`
        );
        setArchivedAnnouncements(
          archivedAnnouncementsResponse.status === 200
            ? archivedAnnouncementsResponse.data
            : []
        );
        const archivedOfficialsResponse = await axios.get(
          `${API_LINK}/brgyofficial/?brgy=${brgy}&archived=true`
        );
        setArchivedOfficials(
          archivedOfficialsResponse.status === 200
            ? archivedOfficialsResponse.data
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [brgy]);

  const gradients = [
    { gradient1: "from-[#2E3192]", gradient2: "to-[#2CAFFF]" },
    { gradient1: "from-[#FE9090]", gradient2: "to-[#FF61D2]" },
    { gradient1: "from-[#56ab2f]", gradient2: "to-[#a8e063]" },
    { gradient1: "from-[#662D8C]", gradient2: "to-[#ED1E79]" },
    { gradient1: "from-[#614385]", gradient2: "to-[#516395]" },
    { gradient1: "from-[#02AABD]", gradient2: "to-[#00CDAC]" },
    { gradient1: "from-[#FF512F]", gradient2: "to-[#DD2476]" },
    { gradient1: "from-[#868F96]", gradient2: "to-[#596164]" },
    { gradient1: "from-[#C33764]", gradient2: "to-[#1D2671]" },
  ];

  const titles = [
    {
      title: "Announcement",
      active: announcements.length,
      archived: archivedAnnouncements.length,
      activeLink: `/announcements/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archivedannoucements/?id=${id}&brgy=${brgy}&archived=true`,
      icon: <BsMegaphone size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Inquiries",
      active: "n/a",
      archived: "n/a",
      activeLink: `/inquiries/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archivedinquiries/?id=${id}&brgy=${brgy}`,
      icon: <FaRegNoteSticky size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Residents",
      active: users.length,
      archived: archivedUsers.length,
      activeLink: `/residents/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archivedresidents/?id=${id}&brgy=${brgy}`,
      icon: <BsPeopleFill size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Services",
      active: services.length,
      archived: archivedServices.length,
      activeLink: `/services/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archivedservices/?id=${id}&brgy=${brgy}&archived=true`,
      icon: <FaServicestack size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Service Requests",
      active: "n/a",
      archived: "n/a",
      activeLink: `/requests/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archivedrequests/?id=${id}&brgy=${brgy}`,
      icon: <GoGitPullRequest size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Barangay Officials",
      active: officials.length,
      archived: archivedOfficials.length,
      activeLink: `/officials/?id=${id}&brgy=${brgy}`,
      archivedLink: `/archived_officials/?id=${id}&brgy=${brgy}`,
      icon: <FaPeopleGroup size={15} className="sm:block md:hidden" />,
    },
    {
      title: "Profits",
      active: services.length,
      archived: archivedServices.length,
      activeLink: ``,
      archivedLink: ``,
      icon: (
        <AiOutlineFundProjectionScreen
          size={15}
          className="sm:block md:hidden"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl">
        Dashboard
      </b>
      <div className="w-full grid sm:grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-3 py-4">
        {gradients.map((item, idx) => {
          const titleItem = titles[idx];

          const shouldDisplayGradient = titleItem && titleItem.title.length > 0;

          return shouldDisplayGradient ? (
            <div className="flex flex-col">
              <div
                className={`hs-dropdown relative bg-gradient-to-r ${item.gradient1} ${item.gradient2} text-white flex flex-col justify-between items-center p-3 text-sm md:text-base lg:text-lg rounded-lg`}
              >
                <button
                  id="hs-unstyled-collapse"
                  data-hs-collapse={`#hs-statistics-dashboard-${idx}`}
                  className="hs-collapse-toggle justify-between flex items-center w-full  gap-x-3 py-2 px-2.5  text-sm rounded-md"
                >
                  <div className="flex items-center gap-x-3 p-1.5 w-full inline-flex items-center text-base  font-heavy rounded-lg">
                    {titleItem ? titleItem.icon : ""}
                    <span className="flex uppercase block justify-end item-end">
                      {titleItem ? titleItem.title : ""}
                    </span>
                  </div>
                  <div className="flex">
                    <svg
                      className="hs-collapse-open:rotate-180  w-2.5 h-2.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  id={`hs-statistics-dashboard-${idx}`}
                  className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-unstyled-collapse"
                >
                  <Link to={titleItem ? titleItem.activeLink : ""}>
                    <a className={`flex items-center p-3 gap-x-3.5 rounded-lg font-heavy text-sm text-white hover:bg-gradient-to-r ${item.gradient1} hover:border hover:border-gray-300`}>
                      Active:
                      <strong className="ml-auto">
                        {titleItem ? titleItem.active : ""}
                      </strong>
                    </a>
                  </Link>
                  <Link to={titleItem ? titleItem.archivedLink : ""}>
                    <a className={`flex items-center p-3 gap-x-3.5 rounded-lg font-heavy text-sm text-white hover:bg-gradient-to-r ${item.gradient1} hover:border hover:border-gray-300`}>
                      Archived:
                      <strong className="ml-auto">
                        {titleItem ? titleItem.archived : ""}
                      </strong>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default StatisticsDashboard;
