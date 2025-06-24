import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useApiQuery } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import { userStore } from "../../store/userStore"; // adjust path as needed
import Cookies from "js-cookie"
import DarkModeToggle from './DarkModeToggle';

export default function AdminTopbar() {
    const navigate = useNavigate();

    // Access token and user from Zustand store
    const { user, logout } = userStore();

    const token = Cookies.get("token") 

    const handleSignOut = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    // If not logged in, redirect
    if (!token || !user?.employeeId) {
        toast.error("Please login again.");
        logout();
        navigate("/login");
        return null;
    }

    const empId = user.employeeId;

    const { data: profile } = useApiQuery(
        {
            endpoint: `/employees/show/${empId}`,
            queryKey: ["adminProfile", empId],
            onError: (error) => {
                toast.error("Failed to fetch profile.");
                console.error("Profile fetch error:", error);
            },
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    return (
        <div className="sticky top-0 z-50 h-16 bg-white dark:bg-gray-800 dark:text-white text-gray-800 shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl font-light">Catering Management System</h1>
            <div className="flex justify-end mb-4">
                <DarkModeToggle/>
                <Link to="adminProfile">
                    <Avatar rounded />
                </Link>

                <Dropdown inline>
                    <DropdownItem className="block text-sm font-medium text-left">
                        <span className="block text-sm text-gray-400 lowercase">
                            {profile?.email || "email@example.com"}
                        </span>
                        <span className="block text-sm text-gray-400 capitalize">
                            Role: {profile?.role || "admin"}
                        </span>
                    </DropdownItem>

                    <DropdownItem>
                        <button className="w-full" onClick={handleSignOut}>Logout</button>
                    </DropdownItem>
                </Dropdown>
            </div>
        </div>
    );
}
