import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoute;
