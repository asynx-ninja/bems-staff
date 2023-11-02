import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "../config/Error404";
import Dashboard from "../pages/Dashboard";
import Announcements from "../pages/Announcements";
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
import ForgotPassword from "../pages/login/ForgotPassword";
import SecurityPin from "../pages/login/SecurityPin";
import ChangePassword from "../pages/login/ChangePassword";
import ArchivedAnnouncements from "../pages/ArchivedAnnouncements"
import ArchivedInquiries from "../pages/ArchivedInquiries"
import ArchivedResidents from "../pages/ArchiveResidents"
import ArchivedOfficial from "../pages/ArchivedOfficial";
import ArchivedService from "../pages/ArchivedServices";

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
    path: "/pin",
    element: <SecurityPin />,
  },
  {
    path: "/change",
    element: <ChangePassword />
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/announcements",
    element: (
      <>
        <Navbar />
        <Announcements />
      </>
    ),
  },
  {
    path: "/archivedannoucements",
    element: (
      <>
        <Navbar />
        <ArchivedAnnouncements />
      </>
    ),
  },
  {
    path: "/archivedinquiries",
    element: (
      <>
        <Navbar />
        <ArchivedInquiries />
      </>
    ),
  },
  {
    path: "/inquiries",
    element: (
      <>
        <Navbar />
        <Inquiries />
      </>
    ),
  },
  {
    path: "/residents",
    element: (
      <>
        <Navbar />
        <Residents />
      </>
    ),
  },
  {
    path: "/archivedresidents",
    element: (
      <>
        <Navbar />
        <ArchivedResidents />
      </>
    ),
  },
  {
    path: "/services",
    element: (
      <>
        <Navbar />
        <Services />
      </>
    ),
  },
  {
    path: "/archivedservices",
    element: (
      <>
        <Navbar />
        <ArchivedService />
      </>
    ),
  },
  {
    path: "/requests",
    element: (
      <>
        <Navbar />
        <Requests />
      </>
    ),
  },
  {
    path: "/officials",
    element: (
      <>
        <Navbar />
        <Officials />
      </>
    ),
  },
  {
    path: "/archived_officials",
    element: (
      <>
        <Navbar />
        <ArchivedOfficial />
      </>
    ),
  },
  {
    path: "/info",
    element: (
      <>
        <Navbar />
        <Information />
      </>
    ),
  },
  {
    path: "/settings",
    element: (
      <>
        <Navbar />
        <Settings />
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