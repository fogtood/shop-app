import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirectRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRedirectRoute;
