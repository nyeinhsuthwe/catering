import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'
import { userStore } from '../store/userStore';

const ProtectedRoute = ({children})  => {
  const{user} = userStore();
  const token = Cookies.get("token");
  console.log(user)
  if(!user.role){
    return <Navigate to = '/login'/>
  }

  if(!token) {
    return <Navigate to ="/login"/>
  }

  return children ? <>{children}</> : <Outlet/> ;
}

export default ProtectedRoute
