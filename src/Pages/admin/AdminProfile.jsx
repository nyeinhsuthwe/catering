import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApiQuery } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import { userStore } from '../../store/userStore';
import { Avatar} from "flowbite-react";


const AdminProfile = () => {
    const location = useLocation();

    const { token, user } = userStore();
    const empId = user.employeeId;

    if (!user || !user.employeeId) {
        return (
            <div className="p-6 max-w-4xl mx-auto text-red-600">
                You are not logged in. Please log in to view your profile.
            </div>
        );
    }

    const {
        data: profile,
        refetch,
        isLoading,
    } = useApiQuery(
        {
            endpoint: `/employees/show/${empId}`,
            queryKey: ["adminProfile", empId],
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    // Refetch on edit complete
    useEffect(() => {
        if (location.state?.updated) {
            refetch();
        }
    }, [location.state, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (!profile) return <div>No profile data available.</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-700  dark:text-white mb-6">Your Profile</h2>
            <div className="flex items-center space-x-6 mb-6">
                
                <Avatar rounded
                    className="w-24 h-24 rounded-full object-cover shadow border-2 border-gray-300"
                />
                <div>
                    <h3 className="text-xl font-semibold not-[]: text-gray-700  dark:text-white">{profile.name}</h3>
                    <p className="text-gray-700  dark:text-white">{profile.role}</p>
                </div>
            </div>

            <div className=" p-6 rounded-lg shadow-sm text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
                <div className="flex items-center justify-between mb-6">
                    <h1>Personal Information</h1>
                    <Link
                        to="/admin/adminProfile/adminEditProfile"
                        state={{ profile }}
                    >
                        <button className=" text-white px-4 py-2 rounded shadow-sm bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400">
                            Edit
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Identification No:</span>
                        <p className="font-medium">{profile.emp_id}</p>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Name:</span>
                        <p className="font-medium">{profile.name}</p>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">Email:</span>
                        <p className="font-medium">{profile.email}</p>
                    </div>
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">User Role:</span>
                        <p className="font-medium">{profile.role}</p>
                    </div>

                    <div className="sm:col-span-2 mt-4">
                        <Link to="/admin/adminProfile/adminResetPassword">
                            <button className=" text-white px-4 py-2 rounded bg-yellow-400 dark:bg-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-500">
                                Reset Password
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
