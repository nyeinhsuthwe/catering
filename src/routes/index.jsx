import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Authlayout from "../Layout/Authlayout";

const router =createBrowserRouter([
{
    path : '/',
    element : <Authlayout/>,
    children: [
        {
            index: true,
            element: <Home />
        }
    ]
}
])

export default router;