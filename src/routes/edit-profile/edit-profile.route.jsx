import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileBannerAvatar from "../../components/profile-image/profile-image.component";
import Input from "../../components/input/input.component";
import { IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Button from "../../components/button/button.component";
import {
  fetchUserDocumentFromAuth,
  updateUserProfile,
} from "../../utils/firebase/firebase.utils";
import { login } from "../../store/reducers/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const defaultImage = {
  image: null,
  imagePreview: null,
};

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [banner, setBanner] = useState(defaultImage);
  const [avatar, setAvatar] = useState(defaultImage);
  const [formFields, setFormFields] = useState({
    displayName: user.displayName || "",
    address: user.address || "",
    mobile: user.mobile || "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];

    if (file && type === "banner") {
      setBanner({
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else if (file && type === "avatar") {
      setAvatar({
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else return;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { displayName, address, mobile } = formFields;

    if (
      displayName === user.displayName &&
      address === user.address &&
      mobile === user.mobile &&
      !banner.image &&
      !avatar.image
    ) {
      toast.error("No changes made");
      setLoading(false);
      return;
    }

    try {
      await updateUserProfile(user.uid, banner.image, avatar.image, formFields);

      const updatedUserDoc = await fetchUserDocumentFromAuth(user.uid);
      if (updatedUserDoc) {
        const updatedUserData = {
          uid: user.uid,
          email: updatedUserDoc.email,
          displayName: updatedUserDoc.displayName,
          avatar: updatedUserDoc.avatar,
          mobile: updatedUserDoc?.mobile,
          address: updatedUserDoc?.address,
          createdAt: updatedUserDoc.createdAt
            ? updatedUserDoc.createdAt.toDate().toISOString()
            : null,
          emailVerified: updatedUserDoc.emailVerified,
        };

        dispatch(login({ ...updatedUserData }));
      }

      setLoading(false);
      toast.success("Profile updated successfully");
      navigate("/account");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setLoading(false);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="bg-main min-h-screen pt-8 py-24 px-6 max-w-[600px] mx-auto">
      <h1 className="text-xl font-bold text-center">Edit Acount Details</h1>
      <div className="mt-4">
        <ProfileBannerAvatar
          edit
          banner={banner}
          avatar={avatar}
          handleImageChange={handleImageChange}
        />
        <form className="mt-20 xs:mx-6" onSubmit={handleFormSubmit}>
          <div className="space-y-6">
            <Input
              label={"Full Name"}
              placeholder={"Enter Your Full Name"}
              name={"displayName"}
              value={formFields.displayName}
              onChange={handleInputChange}
              required
            />
            <Input
              label={"Email Address"}
              name={"email"}
              placeholder={"test@gmail.com"}
              value={user.email}
              disabled
            />
            <Input
              label={"Address (Will be used for checkout)"}
              placeholder={"2378 Colonial Drive, Somerville, Texas"}
              name={"address"}
              value={formFields.address}
              onChange={handleInputChange}
            />
            <Input
              label={"Mobile Number (Will be used for checkout)"}
              placeholder={"+2349128631289"}
              name={"mobile"}
              value={formFields.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col xs:flex-row gap-4 xs:gap-0 xs:items-center xs:justify-between mt-8">
            <button
              className="flex items-center justify-center xs:justify-start gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
              onClick={() => navigate("/account")}
              disabled={loading}
            >
              <IoArrowBack /> Back to Profile
            </button>
            <Button
              type="submit"
              buttonType={"auth"}
              icon={
                loading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <FaCheck />
                )
              }
              disabled={loading}
            >
              Updat{loading ? "ing" : "e"} Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
