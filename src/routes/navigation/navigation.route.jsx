import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";

const Navigation = () => {
  return (
    <div className="bg-main pt-6 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Navigation;
