import { ArrowRight } from "lucide-react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa6";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";

const SignIn = () => {
  useDocumentTitle("Sign In | Cannabud");
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto my-10 bg-main border border-primary">
      <div className="px-6 py-5">
        <h2 className="font-semibold text-lg">Sign up to Cannabud</h2>
        <div className="grid grid-cols-2 gap-x-16 my-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <Input
                type={"email"}
                label={"*Email"}
                placeholder="example@gmail.com"
              />
              <Input
                type={"password"}
                label={"*Password"}
                placeholder="Your Password"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="underline text-sm text-black cursor-pointer">
                forgot password?
              </p>
              <Button buttonType={"auth"} icon={<ArrowRight width={20} />}>
                Sign Up
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            <Button
              buttonType={"btnWithIcon"}
              bgColor={"bg-[#006CE6]"}
              textColor={"text-white"}
              hoverColor={"hover:bg-blue-700"}
              icon={<FaFacebook />}
            >
              Continue with Facebook
            </Button>

            <Button
              buttonType={"btnWithIcon"}
              bgColor={"bg-white"}
              textColor={"text-black"}
              hoverColor={"hover:bg-primary hover:border-none hover:py-[13px]"}
              border={"border border-primary"}
              icon={<FaGoogle />}
            >
              Continue with Google
            </Button>

            <Button
              buttonType={"btnWithIcon"}
              bgColor={"bg-black"}
              textColor={"text-white"}
              hoverColor={"hover:bg-black/80"}
              border={"border border-primary"}
              icon={<FaGithub />}
            >
              Continue with Github
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-3 flex items-center justify-center text-black font-medium text-sm gap-5">
        Don't have an account?
        <Button buttonType={"secondary"} onClick={() => navigate("/sign-up")}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
