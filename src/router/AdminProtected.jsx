import { useContext } from "react"
import { AuthContext } from "../components/context/AuthContext"
import { Outlet } from "react-router-dom";

const AdminProtected = () => {

    const {loggedUser} = useContext(AuthContext)

  return <>{loggedUser.rol === import.meta.env.VITE_ADMIN && <Outlet />}</>;
}

export default AdminProtected