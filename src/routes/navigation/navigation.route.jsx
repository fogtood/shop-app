import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";

const Navigation = () => {
  return (
    <div className="bg-main pt-6">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
