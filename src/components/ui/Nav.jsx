<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";

import Cookie from "js-cookie";
import { userStore } from "../../store/userStore";
import DarkModeToggle from './DarkModeToggle';


const Nav = () => {
  const token = userStore((state) => state.token); 
  const logout = userStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("token");
    logout(); 
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 ">
      <Navbar fluid  className="bg-gray-100 [&>div]:rounded-none">
        <NavbarBrand href="#">
          <span className="self-center whitespace-nowrap text-xl text-gray-600 font-bold dark:text-white">
            Catering Management System
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button onClick={token ? handleLogout : handleLogin} className='me-3'>
            {token ? "Logout" : "Login"}
          </Button>
          <DarkModeToggle/>
          <NavbarToggle />
        </div>
      </Navbar>
    </div>
  );
};

export default Nav;
=======
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
>>>>>>> admin
