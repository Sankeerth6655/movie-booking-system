import { Navigate } from "react-router-dom";

interface Props{
    children:React.ReactNode,
}

function AuthProtectedRoute({children}:Props){

    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    if(token && user){
        return <Navigate to='/movies'/>
    }

    return <>{children}</>
}

export default AuthProtectedRoute;