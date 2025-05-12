import React from "react";
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
    <div className="">
      <Navbar fluid rounded className="bg-gray-100">
        <NavbarBrand href="https://flowbite-react.com">
        <i className="fa-solid fa-utensils text-xl mr-3 fa-2x text-orange-500"></i>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Catering Management System
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
        <Button>Login</Button>
        <NavbarToggle />
      </div>
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
