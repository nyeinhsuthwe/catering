// Menu.jsx
import React from 'react';
import CreateNewMenu from './CreateNewMenu';
import { useQueryClient } from '@tanstack/react-query';
import MenuListTable from './MenuListTable';
import { useNavigate } from 'react-router-dom';

import AddNewMenu from './AddNewMenu';
import MenuUpdate from './MenuUpdate';
const Menu = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();




  return (
    <div className="max-w-5xl mx-auto">

      <CreateNewMenu />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Menu Management
      </h2>
      <div>
        <MenuListTable />
        <AddNewMenu />
      </div>
      <MenuUpdate />

    </div>
  );
};

export default Menu;
