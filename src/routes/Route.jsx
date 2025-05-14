import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";

import Router from "./Router";


const router = createBrowserRouter([
    ...Auth,
    
    ...Router,
])
   
   

export default router;