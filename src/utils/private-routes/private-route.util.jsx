import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (loading) return null;

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  // Check for the checkout route
  if (location.pathname === "/checkout" && cartItems.length < 1) {
    return <Navigate to="/shop" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
