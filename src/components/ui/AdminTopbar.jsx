import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { DarkThemeToggle } from 'flowbite-react';
const AdminTopbar = () => {
    return (
        <div className="h-16 bg-white shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl  font-light">Catering Management System</h1>
           
            <div className="flex items-center gap-x-4">

                <i className="fa-solid fa-bell " ></i>
                
                
                <Dropdown label="Admin" inline>
                    <Link to="/profile">
                        <DropdownItem>View Profile</DropdownItem>
                    </Link>

                    <Link to="/login">
                        <DropdownItem>Sign out</DropdownItem>
                    </Link>
                </Dropdown>
                
                <DarkModeToggle />
                
            </div>
        </div>
        
    )
}

export default AdminTopbar
