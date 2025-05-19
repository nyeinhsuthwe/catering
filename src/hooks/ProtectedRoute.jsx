import React from 'react'
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute= ({allowedRoles.children})) => {

    const token=Cookies.get{("accessToken")};
    
    if (!token) {
        return  <Navigate to="/login"/>;
    }
    return children ? <> {children} </> : <Outlet/>;
}

export default ProtectedRoute
