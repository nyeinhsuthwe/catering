import React from 'react';


const AdminProfile = () => {
  // Dummy admin data – replace with real API later
  const admin = {
    name: 'Hillary',
    photo: 'src/assets/flowerGirl.jpg', // Replace with your image URL or upload logic
    email: 'admin@catering.com',
    phone: '0911223344',
    dob: '1990-01-01',
    role: 'Administrator',
  };

return (
    <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-sky-700 mb-6">Admin Profile</h2>

        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
            <img
                src={admin.photo}
                alt="Admin"
                className="w-24 h-24 rounded-full object-cover shadow border-2 border-gray-300"
            />
            <div>
                <h3 className="text-xl font-semibold">{admin.name}</h3>
                <p className="text-gray-500">{admin.role}</p>
            </div>
        </div>

        {/* Info Table */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-500">Phone Number:</span>
                    <p className="font-medium">{admin.phone}</p>
                </div>
                <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium">{admin.email}</p>
                </div>
                <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <p className="font-medium">{admin.dob}</p>
                </div>
                <div>
                    <span className="text-gray-500">User Role:</span>
                    <p className="font-medium">{admin.role}</p>
                </div>

                <div className="sm:col-span-2 mt-4">
                    <a href="resetPassword"> 
                    <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
                        Reset Password
                    </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
);
};

export default AdminProfile;
