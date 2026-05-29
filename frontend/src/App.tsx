import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";




function App(){
  return (
    <>
        <ProtectedRoute>
          <Navbar></Navbar>
          <Outlet></Outlet>
        </ProtectedRoute>
    </>
  )
}
export default App;