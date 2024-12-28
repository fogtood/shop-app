import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, closeSidebar, navbarLinks }) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeSidebar}
        />
      )}

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
              {navbarLinks.map(({ text, to, icon }, idx) => (
                <NavLink
                  key={idx}
                  to={to}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-black font-bold bg-gray-100"
                        : "text-text"
                    } flex items-center gap-4 text-sm font-medium hover:bg-gray-100 p-2 rounded-md`
                  }
                  onClick={closeSidebar}
                >
                  {icon}
                  <span>{text}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
