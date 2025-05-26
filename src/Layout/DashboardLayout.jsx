import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/ui/Nav";
import SideBar from "../Pages/Employee/SideBar";

// Dashboard layout for Employee
const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
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
