import { REGISTRATION_ROUTE, TABLE_ROUTE } from "../utils/consts";
import { LOGIN_ROUTE } from "../utils/consts";
import {UserTable} from "../pages/Table"
import { Auth } from "../pages/Auth";

export const authRoutes = [ 
    {
        path: TABLE_ROUTE,
        element: <UserTable/>
    },
    {
        path: '/*',
        element: <UserTable/>
    }
];

export const publicRoutes = [ 
    {
        path: LOGIN_ROUTE,
        element: <Auth/>,
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth/>,
    },
    {
        path: '/*',
        element: <Auth/>
    }
    
];