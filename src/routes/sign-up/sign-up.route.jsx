import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import { SocialSignIn } from "../sign-in/sign-in.route";
import { ArrowRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  fetchUserDocumentFromAuth,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";
import { signUpSchema } from "../../lib/schemas/authenticationSchema";
import { firebaseErrorMessages } from "../../utils/errorMessages";

const SignUp = () => {
  useDocumentTitle("Sign Up | Cannabud");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSubmitting || socialLoading) {
      setError(null);
    }
  }, [isSubmitting, socialLoading]);

  // Handle form submission
  const onSubmit = async (data) => {
    const { displayName, email, password } = data;

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      await fetchUserDocumentFromAuth(user.uid);
      reset();
      setError(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to create user:", error);
      const errorMessage =
        firebaseErrorMessages[error.code] ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  const signInWithGoogleHandler = async () => {
    setSocialLoading(true);
    try {
      const { user } = await signInWithGoogle();
      await createUserDocumentFromAuth(user);
      await fetchUserDocumentFromAuth(user.uid);
      setError(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMessage =
        firebaseErrorMessages[error.code] ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto mt-10 bg-main space-y-5">
      {error && <ErrorMessage message={error} />}
      <div
        className={`border ${error ? "border-red-500" : "border-primary"} ${
          isSubmitting || socialLoading ? "inset-0 bg-gray-50 opacity-50" : ""
        }`}
      >
        <div className="px-6 py-5">
          <h2 className="font-semibold text-lg">Sign up to Cannabud</h2>
          <div className="grid grid-cols-2 gap-x-16 my-8">
            <div className="space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={"text"}
                  label={errors.displayName?.message || "*Full Name"}
                  placeholder="John Doe"
                  name="displayName"
                  disabled={isSubmitting || socialLoading}
                  error={!!errors.displayName}
                  {...register("displayName")}
                />
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
                <div className="flex flex-col items-end">
                  <Button
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
                    {isSubmitting || socialLoading ? "Signing Up" : "Sign Up"}
                  </Button>
                </div>
              </form>
            </div>
            <SocialSignIn
              isSubmitting={isSubmitting}
              socialLoading={socialLoading}
              signInWithGoogleHandler={signInWithGoogleHandler}
            />
          </div>
        </div>
        <div
          className={`bg-gray-100 py-3 flex items-center justify-center text-black font-medium text-sm gap-5 border-t ${
            error ? "border-red-500" : "border-primary"
          }`}
        >
          Already have an account?
          <Button
            buttonType={"secondary"}
            disabled={isSubmitting || socialLoading}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
