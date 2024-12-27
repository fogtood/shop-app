import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import { X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, closeSidebar, navbarLinks, user }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 transition-transform duration-300 ease-in-out bg-white shadow-lg flex flex-col h-screen`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">Menu</h2>
        <button onClick={closeSidebar}>
          <X />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-4">
            {navbarLinks.map(({ name, url }, idx) => (
              <NavLink
                key={idx}
                to={url}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-bold" : "text-text"
                  } text-sm font-medium hover:bg-gray-100 p-2 rounded-sm`
                }
                onClick={closeSidebar}
              >
                {name}
              </NavLink>
            ))}
            {!user && (
              <div className="flex flex-col gap-4">
                <Button
                  buttonType={"primary"}
                  disabled={location.pathname === "/sign-up"}
                  onClick={() => {
                    navigate("/sign-up");
                    closeSidebar();
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  buttonType={"secondary"}
                  disabled={location.pathname === "/sign-in"}
                  onClick={() => {
                    navigate("/sign-in");
                    closeSidebar();
                  }}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
