import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { announcementStore } from "../../store/announcement";

const SideBar = () => {
  const { announcements, loading } = announcementStore();
  const [isProfileOpen, setIsProfileOpen] = useState(true); // toggle for collapsible group

  return (
    <div className="bg-gray-100 dark:bg-black fixed h-screen z-[10]">
      <Sidebar aria-label="Default sidebar example" className="z-[100] [&>div]:rounded-none">
        <SidebarItems>
          <SidebarItemGroup>

            <NavLink to="/employee" end children={({ isActive }) => (
              <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                <i className="fa-solid fa-clock me-3"></i>
                Dashboard
              </SidebarItem>
            )} />
            <hr className="text-gray-300" />

            {/* Collapsible Group: Profile */}
            <div className="ml-1">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full text-start text-gray-500 dark:text-gray-400 px-4 py-1  hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <i className="fa-solid fa-user me-3"></i>
                Profile
                <i className={`fa-solid float-right me-2 ${isProfileOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
              </button>

              {isProfileOpen && (
                <div className="pl-6">
                  <NavLink to="profile" children={({ isActive }) => (
                    <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                      <i className="fa-solid fa-edit me-3"></i>
                      Edit Profile
                    </SidebarItem>
                  )} />

                  <NavLink to="password" children={({ isActive }) => (
                    <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                      <i className="fa-solid fa-unlock me-3"></i>
                      Change Password
                    </SidebarItem>
                  )} />

                  <NavLink to="feedback" children={({ isActive }) => (
                    <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                      <i className="fa-solid fa-comment me-3"></i>
                      Feedback
                    </SidebarItem>
                  )} />
                </div>
              )}
            </div>

            <hr className="text-gray-300" />

            <NavLink to="record" children={({ isActive }) => (
              <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                <i className="fa-solid fa-clock-rotate-left me-3"></i>
                Recorded
              </SidebarItem>
            )} />
            <hr className="text-gray-300" />

            <NavLink to="announcement" children={({ isActive }) => (
              <div className="relative">
                <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                  <i className="fa-solid fa-bullhorn me-3"></i>
                  Announcement
                </SidebarItem>
                {!loading && announcements.length > 0 && (
                  <div className="bg-red-500 rounded-full flex items-center justify-center w-4 text-white h-4 absolute top-[12px] right-[40px] text-xs">
                    {announcements.length}
                  </div>
                )}
              </div>
            )} />
            <hr className="text-gray-300" />

            <NavLink to="voucher" children={({ isActive }) => (
              <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                <i className="fa-solid fa-ticket me-3"></i>
                Voucher
              </SidebarItem>
            )} />
            <hr className="text-gray-300" />

            <NavLink to="terms-conditions" children={({ isActive }) => (
              <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                <i className="fa-solid fa-circle-exclamation me-3"></i>
                Terms & Conditions
              </SidebarItem>
            )} />
            <hr className="text-gray-300" />

          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default SideBar;
