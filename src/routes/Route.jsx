import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/Authlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";



const router = createBrowserRouter ([
{
    path : '/',
    element : <AuthLayout/>,
    children : [
        {
            index : true,
            element : <Home/>
        },
        {
            path : '/login',
            element : <Login/>
        },
        {
            path : '/register',
            element : <Register/>
        }
    ]
}
])

export default router;