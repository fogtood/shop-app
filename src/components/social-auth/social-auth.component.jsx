import Button from "../button/button.component";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa6";

const SocialSignIn = ({ isSubmitting, socialLoading, handleSocialAuth }) => {
  return (
    <div className="space-y-5">
      <Button
        buttonType={"btnWithIcon"}
        icon={<FaFacebook />}
        bgColor={"bg-[#006CE6]"}
        textColor={"text-white"}
        hoverColor={"hover:bg-blue-700"}
        disabled={isSubmitting || socialLoading}
        onClick={() => handleSocialAuth("facebook")}
      >
        Continue with Facebook
      </Button>

      <Button
        buttonType={"btnWithIcon"}
        icon={<FaGoogle />}
        bgColor={"bg-white"}
        textColor={"text-black"}
        hoverColor={"hover:bg-primary hover:border-none hover:py-[13px]"}
        border={"border border-primary"}
        disabled={isSubmitting || socialLoading}
        onClick={() => handleSocialAuth("google")}
      >
        Continue with Google
      </Button>

      <Button
        buttonType={"btnWithIcon"}
        icon={<FaGithub />}
        bgColor={"bg-black"}
        textColor={"text-white"}
        hoverColor={"hover:bg-black/80"}
        border={"border border-primary"}
        disabled={isSubmitting || socialLoading}
        onClick={() => handleSocialAuth("github")}
      >
        Continue with Github
      </Button>
    </div>
  );
};

export default SocialSignIn;
