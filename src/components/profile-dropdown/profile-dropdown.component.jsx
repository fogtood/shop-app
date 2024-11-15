import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import userAvatar from ".././../assets/defaultAvatar.jpg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dropdownRef = useRef(null);
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
      dispatch(logout());
      navigate("/");
      toggleDropdown(e);
    } catch (error) {
      console.log(error);
      toast.error("Error signing out");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-8 profile-dropdown relative text-text">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={user?.avatar || userAvatar}
          alt="display-img"
          className="h-8 w-8 cursor-pointer rounded-full object-cover"
        />
        <IoIosArrowDown className="text-xl text-text" />
      </div>
      <div
        ref={dropdownRef}
        className={`w-48 absolute right-0 md:mt-3 top-full bg-white font-medium overflow-hidden ${
          dropdownVisible ? "block" : "hidden"
        }`}
      >
        <Link
          to="/account"
          className="flex items-center justify-between whitespace-nowrap px-4 py-3 text-sm hover:bg-gray-100"
          onClick={toggleDropdown}
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
    </div>
  );
};

export default ProfileDropdown;
