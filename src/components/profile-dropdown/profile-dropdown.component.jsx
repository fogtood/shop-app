import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";
import { BiUserPlus } from "react-icons/bi";
import defaultAvatar from ".././../assets/defaultAvatar.jpg";
import avatar from "../../assets/avatar.png";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";
import { clearCart } from "../../store/reducers/cartSlice";

const ProfileDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dropdownRef = useRef(null);
  const avatarSrc = useMemo(
    () => (user ? user.avatar || defaultAvatar : avatar),
    [user]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(".profile-dropdown")
    ) {
      setDropdownVisible(false);
    }
  };

  const signOut = async (e) => {
    try {
      await signOutUser();
      dispatch(clearCart());
      dispatch(logout());
      navigate("/");
      toggleDropdown(e);
    } catch (error) {
      console.log(error);
      toast.error("Error signing out");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownVisible(false);
  };

  const guestDropdownContent = (
    <div
      ref={dropdownRef}
      className={`w-48 absolute right-0 md:mt-3 top-full bg-white font-medium overflow-hidden shadow-lg rounded-md transition-all duration-200 ease-in-out transform ${
        dropdownVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="px-4 py-3 text-sm text-gray-500 border-b bg-gray-50">
        Sign in to access your account
      </div>
      <button
        onClick={() => handleNavigation("/sign-in")}
        className="flex items-center justify-between w-full text-left px-4 py-3 text-sm whitespace-nowrap hover:bg-gray-100 transition-colors duration-200 group"
      >
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Sign In
        </span>
        <HiOutlineLogin className="text-xl text-gray-600 group-hover:scale-110 transition-transform duration-200" />
      </button>
      <button
        onClick={() => handleNavigation("/sign-up")}
        className="flex items-center justify-between w-full text-left px-4 py-3 text-sm border-t whitespace-nowrap hover:bg-gray-100 transition-colors duration-200 group"
      >
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Sign Up
        </span>
        <BiUserPlus className="text-xl text-gray-600 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );

  const userDropdownContent = (
    <div
      ref={dropdownRef}
      className={`w-48 absolute right-0 md:mt-3 top-full bg-white font-medium overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform ${
        dropdownVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <Link
        to="/account"
        className="flex items-center justify-between whitespace-nowrap px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 group"
        onClick={toggleDropdown}
      >
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          View Account
        </span>
        <FaUser className="text-xl group-hover:scale-110 transition-transform duration-200" />
      </Link>

      <button
        onClick={signOut}
        className="flex items-center justify-between w-full text-left px-4 py-3 text-sm border-t whitespace-nowrap hover:bg-gray-100 transition-colors duration-200 group"
      >
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Sign Out
        </span>
        <MdLogout className="text-xl text-red-400 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );

  return (
    <div className="flex items-center gap-8 profile-dropdown relative text-text">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={toggleDropdown}
      >
        <div className="relative overflow-hidden rounded-full transition-transform duration-200">
          <img
            src={avatarSrc}
            referrerPolicy="no-referrer"
            className="h-8 w-8 cursor-pointer object-cover transition-opacity duration-200 group-hover:opacity-90"
          />
        </div>
        <IoIosArrowDown
          className={`text-xl text-text transition-transform duration-200 hidden md:block ${
            dropdownVisible ? "rotate-180" : ""
          } group-hover:text-gray-700`}
        />
      </div>
      {user ? userDropdownContent : guestDropdownContent}
    </div>
  );
};

export default ProfileDropdown;
