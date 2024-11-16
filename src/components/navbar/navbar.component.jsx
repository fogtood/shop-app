import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import ProfileDropdown from "../profile-dropdown/profile-dropdown.component";

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
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
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

  return (
    <nav className="py-4 sticky top-0 z-50" ref={navbar}>
      <div className="px-[4rem] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={"src/assets/brand.png"} alt="" />
          </Link>
          <div className="flex items-center gap-8">
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
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center">
            <Searchbox />
            <div className="relative p-2 hover:bg-gray-100 cursor-pointer">
              <ShoppingCart />
              {cart.length > 0 && (
                <div className="absolute bg-red-500 h-5 w-5 rounded-full -top-0 -right-0 text-white flex flex-col items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
            </div>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <p className="font-medium test-sm text-text">
                {user.displayName}
              </p>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                buttonType={"primary"}
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
              <Button
                buttonType={"secondary"}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Searchbox = () => {
  return (
    <div className="flex items-center border border-gray-300 bg-white">
      <Search className="mx-2" width={16} />
      <input
        type="text"
        placeholder="Search products..."
        className="bg-white flex-grow py-2 outline-none px-2 w-64 text-sm font-medium text-text placeholder:text-text"
      />
    </div>
  );
};
