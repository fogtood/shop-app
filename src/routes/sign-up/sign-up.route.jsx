import { ArrowRight } from "lucide-react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa6";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { ClipLoader } from "react-spinners";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
};

const SignUp = () => {
  useDocumentTitle("Sign Up | Cannabud");
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);

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

    const { displayName, email, password } = formFields;
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      // onSucess
      setLoading(false);
      resetFormFields();
      navigate("/sign-in");
    } catch (error) {
      console.error("Failed to create user:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-main border border-primary">
      <div className="px-6 py-5">
        <h2 className="font-semibold text-lg">Sign up to Cannabud</h2>
        <div className="grid grid-cols-2 gap-x-16 my-8">
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <Input
                type={"text"}
                label={"*Full Name"}
                placeholder="John Doe"
                value={formFields.displayName}
                name="displayName"
                onChange={handleInputChange}
                required
              />
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
              <div className="flex flex-col items-end">
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
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          {/* OR DIVIDER */}
          {/* <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary"></div>
        <div className="absolute left-0 right-0 top-1/2 -mt-[6px] text-center">
          <div className="font-semibold text-xs py-2 bg-main">OR</div>
        </div> */}
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
        Already have an account?
        <Button buttonType={"secondary"} onClick={() => navigate("/sign-in")}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
