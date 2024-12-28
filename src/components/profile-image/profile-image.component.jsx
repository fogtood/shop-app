import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import Button from "../button/button.component";
import { AiOutlineEdit } from "react-icons/ai";
import defaultBanner from "../../assets/defaultBanner.jpg";

const ProfileBannerAvatar = ({ edit, banner, avatar, handleImageChange }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative">
      <div className="h-44 w-full">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${
              banner?.imagePreview || user?.banner || defaultBanner
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="absolute -bottom-10 xs:-bottom-12 px-3 xs:px-6 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="relative rounded-full">
            <img
              src={avatar?.imagePreview || user.avatar || defaultAvatar}
              alt="user-avatar"
              referrerPolicy="no-referrer"
              className="rounded-full h-20 w-20 xs:h-[94px] xs:w-[94px] border-4 border-white object-cover"
            />
            {edit && (
              <label className="absolute bottom-2 right-0 p-2 rounded-full shadow-md cursor-pointer bg-black text-white font-medium hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black">
                <AiOutlineEdit className="text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "avatar")}
                />
              </label>
            )}
          </div>
          {edit ? (
            <label className="p-2 rounded-full shadow-md cursor-pointer bg-black text-white font-medium hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black">
              <AiOutlineEdit className="text-lg" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "banner")}
              />
            </label>
          ) : (
            <>
              <button
                className="block xs:hidden p-2 rounded-full shadow-md cursor-pointer bg-black text-white font-medium hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black"
                onClick={() => navigate("/account/edit")}
              >
                <AiOutlineEdit className="text-lg" />
              </button>
              <div className="hidden xs:block">
                <Button
                  buttonType={"primary"}
                  onClick={() => navigate("/account/edit")}
                >
                  Edit Account
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBannerAvatar;
