import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from 'react-router-dom';
const AdminTopbar = () => {
    return (
        <div className="h-16 bg-white shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl  font-light">Catering Management System</h1>
           
            <div className="flex items-center gap-x-4">

                <i class="fa-solid fa-bell text-xl text-gray-700 cursor-pointer" ></i>


                <Dropdown label="Admin" inline>
                    <Link to="/profile">
                        <DropdownItem>View Profile</DropdownItem>
                    </Link>

                    <Link to="/login">
                        <DropdownItem>Sign out</DropdownItem>
                    </Link>
                </Dropdown>
            </div>
        </div>
        
    )
}

export default AdminTopbar
