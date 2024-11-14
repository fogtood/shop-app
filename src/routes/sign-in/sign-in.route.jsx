import { ArrowRight } from "lucide-react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa6";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useState } from "react";
import {
  fetchUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  useDocumentTitle("Sign In | Cannabud");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formFields;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setLoading(false);
      resetFormFields();
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          break;
        case "auth/user-disabled":
          toast.error("This account has been disabled.");
          break;
        case "auth/invalid-credential":
          toast.error(
            "Invalid credentials. Please enter valid email and password."
          );
          break;
        case "auth/network-request-failed":
          toast.error(
            "Network error. Check your internet connection and try again."
          );
          break;
        default:
          toast.error("An error occurred. Please try again.");
          break;
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-main border border-primary">
      <div className="px-6 py-5">
        <h2 className="font-semibold text-lg">Sign in to Cannabud</h2>
        <div className="grid grid-cols-2 gap-x-16 my-8">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <Input
                type={"email"}
                label={"*Email"}
                placeholder="example@gmail.com"
                value={formFields.email}
                name="email"
                onChange={handleInputChange}
                required
              />
              <Input
                type={"password"}
                label={"*Password"}
                placeholder="Your Password"
                value={formFields.password}
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="underline text-sm text-black cursor-pointer">
                forgot password?
              </p>
              <Button
                buttonType={"auth"}
                icon={
                  loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    <ArrowRight width={20} />
                  )
                }
                disabled={loading}
              >
                Sign In
              </Button>
            </div>
          </form>

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
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
