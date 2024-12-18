import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userAvatar from "../../assets/defaultAvatar.jpg";
import Button from "../button/button.component";
import { AiOutlineEdit } from "react-icons/ai";
import defaultBanner from "../../assets/defaultBanner.jpg";

const ProfileBannerAvatar = ({ edit }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative">
      <div className="h-44 w-full">
        <img
          src={defaultBanner}
          alt="user-banner"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute -bottom-1/4 px-6 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="relative rounded-full">
            <img
              src={user.avatar || userAvatar}
              alt="user-avatar"
              className="rounded-full h-[94px] w-[94px] border-4 border-white"
            />
            {edit && (
              <label className="absolute bottom-2 right-0 p-2 rounded-full shadow-md cursor-pointer bg-black text-white font-medium hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black">
                <AiOutlineEdit className="text-lg" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            )}
          </div>
          {edit ? (
            <label className="p-2 rounded-full shadow-md cursor-pointer bg-black text-white font-medium hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black">
              <AiOutlineEdit className="text-lg" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          ) : (
            <Button
              buttonType={"primary"}
              onClick={() => navigate("/account/edit")}
            >
              Edit Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBannerAvatar;