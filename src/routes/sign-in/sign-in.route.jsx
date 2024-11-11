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
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDoc = await fetchUserDocumentFromAuth(user.uid);

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userDoc.displayName,
        emailVerified: user.emailVerified,
        createdAt: userDoc.createdAt
          ? userDoc.createdAt.toDate().toISOString()
          : null,
      };
      dispatch(login({ userData }));
      setLoading(false);
      resetFormFields();
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
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