import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileBannerAvatar from "../../components/profile-image/profile-image.component";
import Input from "../../components/input/input.component";
import { IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Button from "../../components/button/button.component";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="bg-main min-h-screen pt-8 py-24 w-[600px] mx-auto">
      <h1 className="text-xl font-bold text-center">Edit Acount Details</h1>
      <div className="mt-4">
        <ProfileBannerAvatar edit />
        <form className="mt-20 mx-6">
          <div className="space-y-6">
            <Input
              label={"Full Name"}
              placeholder={"Enter Your Full Name"}
              value={user.displayName}
            />
            <Input
              label={"Email Address"}
              placeholder={"test@gmail.com"}
              value={user.email}
              disabled
            />
            <Input
              label={"Address (Will be used for checkout)"}
              placeholder={"2378 Colonial Drive, Somerville, Texas"}
              value={user?.address}
            />
            <Input
              label={"Mobile Number (Will be used for checkout)"}
              placeholder={"+2349128631289"}
              value={user?.mobile}
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300"
              onClick={() => navigate("/account")}
            >
              <IoArrowBack /> Back to Profile
            </button>
            <Button type="submit" buttonType={"auth"} icon={<FaCheck />}>
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
