import AuthLayout from "../Layout/Authlayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const Auth = [
    {
        path: '/login',
        element: <AuthLayout />,
        children: [ 
            {
                index: true,
                element: <Login />
            },
            {
                path: 'register', 
                element: <Register />
            }
        ]
    }
];

export default Auth;
