import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../button/button.component";
import ProfileDropdown from "../profile-dropdown/profile-dropdown.component";
import Sheet from "../sheet/sheet.component";
import Sidebar from "../sidebar/sidebar.component";
import Searchbox from "../searchbox/searchbox.component";
import brand from "../../assets/logo.png";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { ShoppingCart, Menu } from "lucide-react";

const navbarLinks = [
  {
    to: "/",
    text: "Home",
    icon: <AiOutlineHome className="text-xl" />,
  },
  {
    to: "/shop",
    text: "Shop",
    icon: <AiOutlineShoppingCart className="text-xl" />,
  },
  {
    to: "/featured",
    text: "Featured",
    icon: <MdOutlineFeaturedPlayList className="text-xl" />,
  },
  {
    to: "/recommended",
    text: "Recommended",
    icon: <BsStars className="text-xl" />,
  },
];

const Navbar = () => {
  const navbar = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Format display name
  const formatDisplayName = (name) => {
    if (!name) return "";
    if (name.split(" ").length > 1) return name.split(" ")[0];
    return name.length > 16 ? name.slice(0, 16) + "..." : name;
  };

  return (
    <>
      <nav className="py-2 sticky top-0 z-50" ref={navbar}>
        <div className="px-4 xl:px-[4rem] flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="p-2 hover:bg-gray-100 cursor-pointer md:hidden"
              onClick={toggleSidebar}
            >
              <Menu />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src={brand} alt="" className="h-12" />
              {/* <h1 className="text-xl md:text-2xl font-bold">Quick Cart</h1> */}
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navbarLinks.map(({ text, to }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black font-bold" : "text-text"
                  } text-sm font-medium hover:bg-gray-100 p-2 rounded-sm`
                }
              >
                {text}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
            <Searchbox />
            <button
              className="relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
              onClick={toggleSheet}
              disabled={
                location.pathname === "/checkout" ||
                location.pathname === "/sign-in" ||
                location.pathname === "/sign-up"
              }
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="hidden md:block lg:hidden relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
              onClick={toggleSheet}
              disabled={
                location.pathname === "/checkout" ||
                location.pathname === "/sign-in" ||
                location.pathname === "/sign-up"
              }
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
            </button>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {user && (
                    <p className="font-medium text-sm text-text hidden lg:block">
                      {formatDisplayName(user.displayName)}
                    </p>
                  )}
                  <ProfileDropdown />
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="relative p-2 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
              onClick={toggleSheet}
              disabled={
                location.pathname === "/checkout" ||
                location.pathname === "/sign-in" ||
                location.pathname === "/sign-up"
              }
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </nav>
      <Sheet isSheetOpen={isSheetOpen} closeSheet={closeSheet} />
      <Sidebar
        navbarLinks={navbarLinks}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        user={user}
      />
    </>
  );
};

export default Navbar;
