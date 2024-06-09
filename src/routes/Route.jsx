import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "../config/Error404";
import Dashboard from "../pages/Dashboard";
//import AnimationLayout from "../components/global/AnimationLayout";
import Navbar from "../components/global/Navbar";
import Inquiries from "../pages/Inquiries";
import Residents from "../pages/Residents";
import Services from "../pages/Services";
import Requests from "../pages/Requests";
import Officials from "../pages/Officials";
import Information from "../pages/Information";
import Settings from "../pages/Settings";
import Login from "../pages/login/Login";
import Tooltip from "../pages/login/Tooltip";
import ForgotPassword from "../pages/login/ForgotPassword";
import SecurityPin from "../pages/login/SecurityPin";
import ChangePassword from "../pages/login/ChangePassword";
import ArchivedInquiries from "../pages/ArchivedInquiries";
import ArchivedResidents from "../pages/ArchiveResidents";
import ArchivedService from "../pages/ArchivedServices";
import ArchivedRequests from "../pages/ArchivedRequests";
import ArchivedOfficials from "../pages/ArchivedOfficials";
import StaffManagement from "../pages/StaffsManagement";
import ArchivedStaffsManagement from "../pages/ArchivedStaffsManagement";
import PrintForm from "../components/requests/form/PrintForm";
import Reports from "../pages/Reports";
import EventsManagement from "../pages/EventsManagement";
import EventsRegistrations from "../pages/EventsRegistrations";
import ArchivedEvents from "../pages/ArchivedEvents";
import ArchivedRegistrations from "../pages/ArchivedRegistrations";
import ViewNotifications from "../pages/ViewNotifications";
import Blotters from "../pages/Blotters";
import ArchivedBlotters from "../pages/ArchivedBlotters";
import AddResidents from "../components/residents/AddResident/AddResidents"
import EditResidents from "../components/residents/EditResident/ediResident";
import ActivityLogs from "../pages/ActivityLogs";

const pages = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/tooltip",
    element: <Tooltip />,
  },
  {
    path: "/pin/:email",
    element: <SecurityPin />,
  },
  {
    path: "/change/:email",
    element: <ChangePassword />,
  },
  {
    path: "/dashboard",
    element: <Navbar comp={<Dashboard />} />,
  },
  {
    path: "/view_notifications",
    element: <Navbar comp={<ViewNotifications/>} />,
  },
  {
    path: "/events_management",
    element: <Navbar comp={<EventsManagement />} />,
  },
  {
    path: "/events_registrations",
    element: <Navbar comp={<EventsRegistrations />} />,
  },
  {
    path: "/archived_events",
    element: <Navbar comp={<ArchivedEvents />} />,
  },
  {
    path: "/archived_registrations",
    element: <Navbar comp={<ArchivedRegistrations />} />,
  },
  {
    path: "/archivedinquiries",
    element: <Navbar comp={<ArchivedInquiries />} />,
  },
  {
    path: "/inquiries",
    element: <Navbar comp={<Inquiries />} />,
  },
  {
    path: "/blotters",
    element: <Navbar comp={<Blotters />} />,
  },
  {
    path: "/archivedblotters",
    element: <Navbar comp={<ArchivedBlotters />} />,
  },
  {
    path: "/residents",
    element: <Navbar comp={<Residents />} />,
  },
  {
    path: "/addresidents",
    element: <Navbar comp={<AddResidents />} />,
  },
  {
    path: "/editresidents",
    element: <Navbar comp={<EditResidents />} />,
  },
  {
    path: "/archivedresidents",
    element: <Navbar comp={<ArchivedResidents />} />,
  },
  {
    path: "/services",
    element: <Navbar comp={<Services />} />,
  },
  {
    path: "/archivedservices",
    element: <Navbar comp={<ArchivedService />} />,
  },
  {
    path: "/requests",
    element: <Navbar comp={<Requests />} />,
  },
  {
    path: "/archivedrequests",
    element: <Navbar comp={<ArchivedRequests />} />,
  },
  {
    path: "/officials",
    element: <Navbar comp={<Officials />} />,
  },
  {
    path: "/activity_logs",
    element: <Navbar comp={<ActivityLogs />} />,
  },
  {
    path: "/archived_officials",
    element: <Navbar comp={<ArchivedOfficials />} />,
  },
  {
    path: "/staff_management",
    element: <Navbar comp={<StaffManagement />} />,
  },
  {
    path: "/archived_staff_management",
    element: <Navbar comp={<ArchivedStaffsManagement />} />,
  },
  {
    path: "/info",
    element: <Navbar comp={<Information />} />,
  },
  {
    path: "/reports",
    element: <Navbar comp={<Reports />} />,
  },
  {
    path: "/settings",
    element: <Navbar comp={<Settings />} />,
  },
  {
    path: "/document",
    element: (
      <>
        <PrintForm />
      </>
    ),
  },
];

const Route = createBrowserRouter([
  {
    element: <Outlet />, //replace AnimationLayout
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
