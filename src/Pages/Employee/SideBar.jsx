import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { announcementStore } from "../../store/announcement";

const SideBar = () => {
  const { announcements, loading } = announcementStore();

  return (
    <div className="bg-gray-100  dark:bg-black fixed h-screen z-[100]">
      <Sidebar
        aria-label="Default sidebar example"
        className=" z-[100] [&>div]:rounded-none"
      >
        <SidebarItems>
          <SidebarItemGroup>
            <Link to="profile">
              <SidebarItem>
                <i className="fa-solid fa-user me-3 text-gray-500"></i>
                Profile
              </SidebarItem>
            </Link>
            <hr className="text-gray-300" />
            <NavLink
              to="/employee"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : "text-gray-500"
              }
            >
              <SidebarItem>
                <i className="fa-solid fa-clock me-3 text-gray-500"></i>
                Dashboard
              </SidebarItem>
            </NavLink>
            <hr className="text-gray-300" />
            <Link to="feedback">
              <SidebarItem>
                <i className="fa-solid fa-comment me-3 text-gray-500"></i>
                Feedback
              </SidebarItem>
            </Link>
            <hr className="text-gray-300" />
            <Link to="record">
              <SidebarItem>
                <i className="fa-solid fa-clock-rotate-left me-3 text-gray-500"></i>
                Recorded
              </SidebarItem>
            </Link>
            <hr className="text-gray-300" />
            <Link to="announcement" className="relative">
              <SidebarItem>
                <i className="fa-solid fa-bullhorn me-3 text-gray-500"></i>
                Announcement
              </SidebarItem>

              {!loading && announcements.length > 0 && (
                <div className="bg-red-500 rounded-full flex items-center justify-center w-4 text-white h-4 absolute top-[12px] right-[40px] text-xs">
                  {announcements.length}
                </div>
              )}
            </Link>
            <hr className="text-gray-300" />
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default SideBar;
