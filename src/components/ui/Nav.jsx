import React from "react";
import { Link } from 'react-router-dom';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const Nav = () => {
  return (
    <div className="sticky top-0 z-50">
      <Navbar fluid rounded className="bg-gray-100">
        <NavbarBrand href="https://flowbite-react.com">
        {/* <i class="fa-solid fa-pizza-slice text-xl mr-3 fa-2x text-orange-500"></i> */}
          <span className="self-center whitespace-nowrap text-xl text-gray-600 font-bold dark:text-white">
            Catering Management System
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
        <Link to='/login'><Button className="">Login</Button></Link>
        <NavbarToggle />
      </div>
        {/* <NavbarCollapse>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
        </NavbarCollapse> */}
      </Navbar>
    </div>
  );
};

export default Nav;
