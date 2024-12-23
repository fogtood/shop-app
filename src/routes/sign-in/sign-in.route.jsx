import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../lib/schemas/authenticationSchema";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";
import { firebaseErrorMessages } from "../../utils/errorMessages";

const SignIn = () => {
  useDocumentTitle("Sign In | Cannabud");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  const [error, setError] = useState(null);
  const [socialLoading, setSocialLoading] = useState(false);

  useEffect(() => {
    if (isSubmitting || socialLoading) {
      setError(null);
    }
  }, [isSubmitting, socialLoading]);

  // Handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      reset();
      setError(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error messages
      const errorMessage =
        firebaseErrorMessages[error.code] ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  // Sign in with Google
  const signInWithGoogleHandler = async () => {
    setSocialLoading(true);
    try {
      const { user } = await signInWithGoogle();
      await createUserDocumentFromAuth(user);
      setError(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error messages
      const errorMessage =
        firebaseErrorMessages[error.code] ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-main space-y-5">
      {error && <ErrorMessage message={error} />}
      <div
        className={`border ${error ? "border-red-500" : "border-primary"} ${
          isSubmitting || socialLoading ? "inset-0 bg-gray-50 opacity-50" : ""
        }`}
      >
        <div className="px-6 py-5">
          <h2 className="font-semibold text-lg">Sign in to Cannabud</h2>
          <div className="grid grid-cols-2 gap-x-16 my-8">
            <div className="space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={"email"}
                  label={errors.email?.message || "*Email"}
                  placeholder="example@gmail.com"
                  name="email"
                  disabled={isSubmitting || socialLoading}
                  error={!!errors.email}
                  {...register("email")}
                />
                <Input
                  type={"password"}
                  label={errors.password?.message || "*Password"}
                  placeholder="Your Password"
                  name="password"
                  disabled={isSubmitting || socialLoading}
                  error={!!errors.password}
                  {...register("password")}
                />
                <div className="flex items-center justify-between">
                  <p
                    className="underline text-sm text-black cursor-pointer"
                    onClick={() =>
                      isSubmitting || socialLoading
                        ? null
                        : navigate("/reset-password")
                    }
                  >
                    Forgot Password?
                  </p>
                  <Button
                    type="submit"
                    buttonType={"auth"}
                    icon={
                      isSubmitting || socialLoading ? (
                        <ClipLoader size={20} color="white" />
                      ) : (
                        <ArrowRight width={20} />
                      )
                    }
                    disabled={isSubmitting || socialLoading}
                  >
                    {isSubmitting || socialLoading ? "Signing In" : "Sign In"}
                  </Button>
                </div>
              </form>
            </div>
            <SocialSignIn
              socialLoading={socialLoading}
              signInWithGoogleHandler={signInWithGoogleHandler}
            />
          </div>
        </div>
        <div
          className={classNames(
            "bg-gray-100 py-3 flex items-center justify-center text-black font-medium text-sm gap-5 border-t",
            {
              "border-red-500": error,
              "border-primary": !error,
            }
          )}
        >
          <p>Don't have an account?</p>
          <Button
            buttonType={"secondary"}
            disabled={isSubmitting || socialLoading}
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

const SocialSignIn = ({
  isSubmitting,
  socialLoading,
  signInWithGoogleHandler,
}) => {
  return (
    <div className="space-y-5">
      <Button
        buttonType={"btnWithIcon"}
        icon={<FaFacebook />}
        bgColor={"bg-[#006CE6]"}
        textColor={"text-white"}
        hoverColor={"hover:bg-blue-700"}
        disabled={isSubmitting || socialLoading}
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
        onClick={signInWithGoogleHandler}
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
      >
        Continue with Github
      </Button>
    </div>
  );
};
