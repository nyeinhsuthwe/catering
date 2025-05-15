import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import EmployeeDashboard from "./EmployeeDashboard";

const router = createBrowserRouter([
    ...Auth,
    ...EmployeeDashboard
])

export default router;