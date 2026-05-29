import { Navigate } from "react-router-dom";

interface Props{
    children:React.ReactNode,
    allowedRoles:string[],
}

function RoleProtectedRoute({children,allowedRoles}:Props){
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString?JSON.parse(userString):null;

    if(!token || !user){
        <Navigate to='/' replace/>
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to='/movies' replace/>
    }

    return <>{children}</>
}

export default RoleProtectedRoute;