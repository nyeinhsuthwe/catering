import React, { use, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/ui/Nav";
import SideBar from "../Pages/Employee/SideBar";
import { announcementStore } from "../store/announcement";

// Dashboard layout for Employee
const DashboardLayout = () => {
  const {fetchAnnouncements} = announcementStore();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200  dark:bg-black">
      <Nav />
      <div className="flex ">
        <SideBar />
        <div className="w-full ml-[300px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
