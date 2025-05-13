import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const router = createBrowserRouter([
    ...Auth,
    ...Dashboard,
])

export default router;