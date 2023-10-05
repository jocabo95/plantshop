import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Navbar from "../components/layout/navbar/Navbar";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword";
import DashboardContainer from "../components/pages/dashboards/DashboardContainer";
import AdminProtected from "./AdminProtected";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        {routes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* register  */}
      <Route path="/register" element={<Register />} />

      {/* forgot password  */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* dashboard - protected for admin */}
      <Route element={<AdminProtected />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default AppRouter;
