import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { DarkThemeToggle } from 'flowbite-react';
import Cookie from 'js-cookie';
const AdminTopbar = () => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        // Logic for signing out the user
        Cookie.remove('token');
        navigate('/login');
    }
    return (
        <div className="h-16 bg-white shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl  font-light">Catering Management System</h1>
           
            <div className="flex items-center gap-x-4">

                <i className="fa-solid fa-bell " ></i>
                
                
                <Dropdown label="Admin" inline>
                    <Link to="adminProfile">
                        <DropdownItem>View Profile</DropdownItem>
                    </Link>

                    <button onClick={handleSignOut}>
                        <DropdownItem>Logout</DropdownItem>
                    </button>
                </Dropdown>
                
                <DarkModeToggle />
                
            </div>
        </div>
        
    )
}

export default AdminTopbar
