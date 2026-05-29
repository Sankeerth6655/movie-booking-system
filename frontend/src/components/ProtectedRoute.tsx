import { Navigate } from "react-router-dom";

interface Props {children:React.ReactNode};

function ProtectedRoute({children}:Props){
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString?JSON.parse(userString):null;

    if(!token || !user){
        return <Navigate to='/'/>;
    }

    return <>{children}</>;
}
export default ProtectedRoute;