import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiUser } from "react-icons/hi";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarCollapse
} from "flowbite-react";

const AdminSidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(true); // toggle for collapsible group


  return (
    <div className="">
      <div className="h-full">
        {/* Navigation Link */}
        <Sidebar
          aria-label="Default sidebar example"
          className="z-[100] [&>div]:rounded-none "
        >
          <SidebarItems>
            <SidebarItemGroup>
              <NavLink
                to="/admin"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-gauge me-3"></i>
                    Dashboard
                  </SidebarItem>
                )}
              />



              <hr className="text-gray-300" />
              <NavLink

                to="reservation"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-regular fa-calendar-days me-3"></i>
                    Reservation
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />
              <NavLink
                to="menu"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-utensils me-3"></i>
                    Menu Lists
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />
              <NavLink
                to="employee"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-users me-3"></i>
                    Employee Lists
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />
              <NavLink
                to="report"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i className="fa-solid fa-clock me-3"></i>
                    Report
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />
              <NavLink
                to="adminAnnouncement"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-bullhorn me-3"></i>
                    Announcement
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />
              <NavLink
                to="invoiceInfo"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-file-invoice-dollar me-3"></i>
                    Invoice
                  </SidebarItem>
                )}
              />
              <hr className="text-gray-300" />

             
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
                    <NavLink to="adminProfile" children={({ isActive }) => (
                      <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                        <i className="fa-solid fa-edit me-3"></i>
                        View Profile
                      </SidebarItem>
                    )} />
                    <NavLink to="/admin/adminProfile/adminEditProfile" children={({ isActive }) => (
                      <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                        <i className="fa-solid fa-edit me-3"></i>
                        Edit Profile
                      </SidebarItem>
                    )} />

                    <NavLink to="/admin/adminProfile/adminResetPassword" children={({ isActive }) => (
                      <SidebarItem className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}>
                        <i className="fa-solid fa-unlock me-3"></i>
                        Change Password
                      </SidebarItem>
                    )} />

                    
                  </div>
                )}
              </div>
              <NavLink
                to="ratingPieChart"
                end
                children={({ isActive }) => (
                  <SidebarItem
                    className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
                  >
                    <i class="fa-solid fa-file-invoice-dollar me-3"></i>
                    Feedback
                  </SidebarItem>
                )}
              />
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </div>
  );
};

export default AdminSidebar;
