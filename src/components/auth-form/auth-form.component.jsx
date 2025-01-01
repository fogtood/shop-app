import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserDocumentFromAuth,
  fetchUserDocumentFromAuth,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";
import { firebaseErrorMessages } from "../../utils/errorMessages";
import { ArrowRight } from "lucide-react";
import { ClipLoader } from "react-spinners";

import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import SocialSignIn from "../../components/social-auth/social-auth.component";
import OrDivider from "../../components/or-divider/or-divider.component";

const AuthForm = ({
  mode = "signin", // or "signup"
  title,
  schema,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [socialLoading, setSocialLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (isSubmitting || socialLoading) {
      setError(null);
    }
  }, [isSubmitting, socialLoading]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
      setError(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        firebaseErrorMessages[error.code] ||
          error.message ||
          "An error occurred. Please try again."
      );
    }
  };

  const handleSocialAuth = async (provider) => {
    setSocialLoading(true);
    try {
      let result;
      if (provider === "google") {
        result = await signInWithGoogle();
      } else if (provider === "facebook") {
        result = await signInWithFacebook();
      } else if (provider === "github") {
        result = await signInWithGithub();
      }

      await createUserDocumentFromAuth(result.user);
      await fetchUserDocumentFromAuth(result.user.uid);
      setError(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        firebaseErrorMessages[error.code] ||
          error.message ||
          "An error occurred. Please try again."
      );
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
          <h2 className="font-semibold text-lg">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-16 my-8">
            <div className="order-3 sm:order-1 space-y-4">
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                {mode === "signup" && (
                  <Input
                    type="text"
                    label={errors.displayName?.message || "*Full Name"}
                    placeholder="John Doe"
                    disabled={isSubmitting || socialLoading}
                    error={!!errors.displayName}
                    {...register("displayName")}
                  />
                )}
                <Input
                  type="email"
                  label={errors.email?.message || "*Email"}
                  placeholder="example@gmail.com"
                  disabled={isSubmitting || socialLoading}
                  error={!!errors.email}
                  {...register("email")}
                />
                <Input
                  type="password"
                  label={errors.password?.message || "*Password"}
                  placeholder="Your Password"
                  disabled={isSubmitting || socialLoading}
                  error={!!errors.password}
                  {...register("password")}
                />
                <div
                  className={`flex items-center ${
                    mode === "signup" ? "justify-end" : "justify-between"
                  }`}
                >
                  {mode === "signin" && (
                    <button
                      type="button"
                      className="underline text-sm text-black cursor-pointer"
                      onClick={() =>
                        !isSubmitting &&
                        !socialLoading &&
                        navigate("/reset-password")
                      }
                    >
                      Forgot Password?
                    </button>
                  )}
                  <Button
                    buttonType="auth"
                    icon={
                      isSubmitting || socialLoading ? (
                        <ClipLoader size={20} color="white" />
                      ) : (
                        <ArrowRight width={20} />
                      )
                    }
                    disabled={isSubmitting || socialLoading}
                  >
                    {isSubmitting || socialLoading
                      ? mode === "signin"
                        ? "Signing In"
                        : "Signing Up"
                      : mode === "signin"
                      ? "Sign In"
                      : "Sign Up"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="order-2 sm:order-2 sm:hidden">
              <OrDivider />
            </div>

            <div className="order-1 sm:order-3">
              <SocialSignIn
                isSubmitting={isSubmitting}
                socialLoading={socialLoading}
                handleSocialAuth={handleSocialAuth}
              />
            </div>
          </div>
        </div>
        <div
          className={`bg-gray-100 py-3 flex items-center justify-center text-black font-medium text-sm gap-5 border-t ${
            error ? "border-red-500" : "border-primary"
          }`}
        >
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Button
            buttonType="secondary"
            disabled={isSubmitting || socialLoading}
            onClick={() =>
              navigate(mode === "signin" ? "/sign-up" : "/sign-in")
            }
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
