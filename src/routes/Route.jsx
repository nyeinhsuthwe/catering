import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import DashRoute from "./DashRoute"

const router = createBrowserRouter([
    ...Auth,
    ...DashRoute
])

export default router;