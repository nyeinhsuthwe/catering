import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layout/AuthLayout";

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
