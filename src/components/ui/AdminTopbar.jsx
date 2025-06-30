import { Avatar, Dropdown, DropdownItem , DropdownDivider} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useApiQuery } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import { userStore } from "../../store/userStore"; // adjust path as needed
import Cookies from "js-cookie"
import DarkModeToggle from './DarkModeToggle';
import {HiLogout} from "react-icons/hi";

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
                
                <Link to="adminProfile">
                    <Avatar rounded />
                </Link>
                <div className="ml-2 mt-3">
                    <h4 className="block text-sm font-medium  text-gray-700  dark:text-white">{profile?.name}</h4>
                </div>

                <Dropdown inline>
                    <DropdownItem className="block text-sm font-medium text-left">
                        <span className="block text-sm text-gray-700 dark:text-white lowercase">
                            {profile?.email || "email@example.com"}
                        </span>
                        <span className="block text-sm text-gray-700 dark:text-white capitalize">
                            Role: {profile?.role || "admin"}
                        </span>
                     
                    </DropdownItem>
                    <DropdownDivider />
                    <Link to="adminProfile">
                    <DropdownItem className="text-gray-700 dark:text-white">Profile</DropdownItem>
                    </Link>
                    <DropdownDivider />
                    <DropdownItem icon={HiLogout}>
                        <button className="w-full text-gray-700 dark:text-white" onClick={handleSignOut}>Logout</button>
                    </DropdownItem>
                </Dropdown>
                <DarkModeToggle/>
            </div>
        </div>
    );
}
