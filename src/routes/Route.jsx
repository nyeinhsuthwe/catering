import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import DashRoute from "./DashRoute";

// import Router from "./Router";


const router = createBrowserRouter([
    ...Auth,
    ...DashRoute
    
    //  ...Router,
])

export default router;