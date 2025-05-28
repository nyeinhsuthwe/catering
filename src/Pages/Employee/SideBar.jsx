import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

const SideBar = () => {
  return (
   <div className="bg-gray-100  dark:bg-black fixed h-screen z-[100]">
     <Sidebar aria-label="Default sidebar example" className=" z-[100] [&>div]:rounded-none">
      <SidebarItems >
        <SidebarItemGroup>
          <Link to="/profile">
            <SidebarItem>
              <i className="fa-solid fa-user me-3 text-gray-500"></i>
              Profile
            </SidebarItem>
          </Link>
          <hr className="text-gray-300"/>
          <Link to="/">
            <SidebarItem>
              <i className="fa-solid fa-clock me-3 text-gray-500"></i>
              Dashboard
            </SidebarItem>
          </Link>
          <hr className="text-gray-300"/>
          <Link to="/feedback">
          <SidebarItem>
            <i className="fa-solid fa-comment me-3 text-gray-500"></i>
            Feedback
          </SidebarItem>
          </Link>
          <hr className="text-gray-300"/>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
   </div>
  );
};

export default SideBar;
