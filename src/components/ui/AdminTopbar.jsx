import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useApiQuery } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ make sure you installed this: npm i jwt-decode

export default function AdminTopbar() {
    const navigate = useNavigate();

    // Logout function
    const handleSignOut = () => {
        Cookie.remove("token");
        navigate("/login");
    };

  
    const token = Cookie.get("token");
    let empId = "admin_05"; 

    // if (token) {
    //     try {
    //         const decoded = jwtDecode(token);
    //         empId = decoded?.emp_id || "admin_05"; // make sure your token has `emp_id`
    //     } catch (error) {
    //         toast.error("Invalid token. Please login again.");
    //         Cookie.remove("token");
    //         navigate("/login");
    //     }
    // }

    // Fetch profile data using emp_id
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
        <div className="sticky top-0 z-50 h-16 bg-white shadow-md px-6 flex items-center justify-between">
            <h1 className="text-2xl font-light">Catering Management System</h1>

            <div className="flex justify-end mb-4">
                <Link to="adminProfile" state={{ profile }}>
                    <Avatar rounded />
                </Link>

                <Dropdown inline>
                    <DropdownItem className="block text-sm font-medium text-left">
                        {/* <span className="block text-sm text-gray-400 capitalize">
                            {profile?.name || "Admin"}
                        </span> */}
                        <span className="block text-sm text-gray-400 lowercase">
                            {profile?.email || "email@example.com"}
                        </span>
                        <span className="block text-sm text-gray-400 capitalize">
                            Role: {profile?.role || "admin"}
                        </span>
                    </DropdownItem>

                    <DropdownItem>
                        <button onClick={handleSignOut}>Logout</button>
                    </DropdownItem>
                </Dropdown>
            </div>
        </div>
    );
}
