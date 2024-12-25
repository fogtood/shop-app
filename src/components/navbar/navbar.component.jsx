import { Search, ShoppingCart, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import { useSelector, useDispatch } from "react-redux";
import ProfileDropdown from "../profile-dropdown/profile-dropdown.component";
import Sheet from "../sheet/sheet.component";
import Sidebar from "../sidebar/sidebar.component";
import brand from "../../assets/brand.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { IoMdMore } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { logout } from "../../store/reducers/authSlice";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";

const navbarLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Shop",
    url: "/shop",
  },
  {
    name: "Featured",
    url: "/featured",
  },
  {
    name: "Recommended",
    url: "/recommended",
  },
];

const Navbar = () => {
  const navbar = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const scrollHandler = () => {
    if (navbar.current) {
      if (window.scrollY >= 70) {
        navbar.current.classList.add("bg-white");
      } else {
        navbar.current.classList.remove("bg-white");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);
  const closeSheet = () => setIsSheetOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const signOut = async () => {
    try {
      await signOutUser();
      dispatch(logout());
      navigate("/");
      toggleUserMenu();
      closeSidebar();
    } catch (error) {
      console.log(error);
      toast.error("Error signing out");
    }
  };

  return (
    <>
      <nav className="py-4 sticky top-0 z-50" ref={navbar}>
        <div className="px-4 xl:px-[4rem] flex items-center justify-between">
          <Link to="/">
            <img src={brand} alt="" className="h-8 lg:h-10 md:h-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navbarLinks.map(({ name, url }, idx) => (
              <NavLink
                key={idx}
                to={url}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-bold" : "text-text"
                  } text-sm font-medium hover:bg-gray-100 p-2 rounded-sm`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
            <Searchbox />
            <button
              className="relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
              onClick={toggleSheet}
              disabled={location.pathname === "/checkout"}
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
            </button>
          </div>
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <p className="font-medium text-sm text-text hidden md:block">
                  {user?.displayName?.split(" ")?.length > 1
                    ? user?.displayName?.split(" ")[0]
                    : user?.displayName?.length > 16
                    ? user?.displayName?.slice(0, 16) + "..."
                    : user?.displayName}
                </p>
                <ProfileDropdown />
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <button
                  className="relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                  onClick={toggleSheet}
                  disabled={location.pathname === "/checkout"}
                >
                  <ShoppingCart />
                  {cart.length > 0 && (
                    <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                      {cart.length}
                    </div>
                  )}
                </button>
                <button
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={toggleSidebar}
                >
                  <Menu />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                <Button
                  buttonType={"primary"}
                  disabled={location.pathname === "/sign-up"}
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </Button>
                <Button
                  buttonType={"secondary"}
                  disabled={location.pathname === "/sign-in"}
                  onClick={() => navigate("/sign-in")}
                >
                  Sign In
                </Button>
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <button
                  className="relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                  onClick={toggleSheet}
                  disabled={location.pathname === "/checkout"}
                >
                  <ShoppingCart />
                  {cart.length > 0 && (
                    <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                      {cart.length}
                    </div>
                  )}
                </button>
                <button
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={toggleSidebar}
                >
                  <Menu />
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
      <Sheet isSheetOpen={isSheetOpen} closeSheet={closeSheet} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar}>
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
          <div className="userC mt-auto mb-4">
            {isUserMenuOpen && (
              <div className="mb-2 p-2 bg-white shadow-lg rounded-md">
                <Link
                  to="/account"
                  className="flex items-center justify-between whitespace-nowrap px-4 py-3 text-sm hover:bg-gray-100"
                  onClick={() => {
                    toggleUserMenu();
                    closeSidebar();
                  }}
                >
                  View Account
                  <FaUser className="text-xl" />
                </Link>

                <button
                  onClick={signOut}
                  className="flex items-center justify-between w-full text-left px-4 py-3 text-sm border-t whitespace-nowrap hover:bg-gray-100"
                >
                  Sign Out
                  <MdLogout className="text-xl text-red-400" />
                </button>
              </div>
            )}
            {user && (
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar || defaultAvatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p>{user.displayName}</p>
                    <p className="text-text text-sm">{user.email}</p>
                  </div>
                </div>
                <button type="button" onClick={toggleUserMenu}>
                  <IoMdMore className="text-2xl text-text" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;

export const Searchbox = () => {
  return (
    <div className="flex items-center border border-gray-300 bg-white w-full lg:w-64 max-w-lg">
      <Search className="mx-2 flex-shrink-0" width={16} />
      <input
        type="text"
        placeholder="Search products..."
        className="bg-white flex-grow py-2 outline-none px-2 text-sm font-medium text-text placeholder:text-text w-full"
      />
    </div>
  );
};
