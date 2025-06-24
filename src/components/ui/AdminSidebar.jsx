import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaUtensils, FaUsers, FaChartBar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

const AdminSidebar = () => {


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
                className={"flex w-auto"}
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
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </div>
  );
};

export default AdminSidebar;
