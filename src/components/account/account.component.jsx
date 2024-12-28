import { useSelector } from "react-redux";
import ProfileBannerAvatar from "../profile-image/profile-image.component";
import { dateFormatter } from "../../utils/date-formatter";

const Account = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <ProfileBannerAvatar />
      <div className="mt-20 mb-10 px-3 xs:px-6">
        <h1 className="font-bold text-2xl">{user.displayName}</h1>
        <div className="space-y-1 my-6">
          <p className="text-sm italic">Email</p>
          <p className="font-medium break-words">{user.email}</p>
        </div>
        <div className="space-y-1 my-6">
          <p className="text-sm italic">Address</p>
          <p className="font-medium break-words">
            {user.address || "Address not set"}
          </p>
        </div>
        <div className="space-y-1 my-6">
          <p className="text-sm italic">Mobile</p>
          <p className="font-medium break-words">
            {user.mobile || "Mobile not set"}
          </p>
        </div>
        <div className="space-y-1 my-6">
          <p className="text-sm italic">Date joined</p>
          <p className="font-medium break-words">
            {dateFormatter(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
