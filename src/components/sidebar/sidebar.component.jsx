import { X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, closeSidebar, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-white shadow-lg flex flex-col h-screen`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">Menu</h2>
        <button onClick={closeSidebar}>
          <X />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
