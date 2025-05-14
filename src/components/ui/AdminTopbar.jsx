import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
const AdminTopbar = () => {
    return (
        <div className="h-16 bg-white shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl  font-light">Catering Management System</h1>
         <div>
         <Dropdown label="Admin" inline>
             <a href="/profile">
            <DropdownItem>View Profile</DropdownItem>
            </a>
            
             <a href="/login">
            <DropdownItem>Sign out</DropdownItem>
            </a>
        </Dropdown>
                </div>
        </div>
    )
}

export default AdminTopbar
