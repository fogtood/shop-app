import AuthForm from "../../components/auth-form/auth-form.component";
import useDocumentTitle from "../../hooks/document-title.hook";
import { signUpSchema } from "../../lib/schemas/authenticationSchema";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  fetchUserDocumentFromAuth,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";

const SignUp = () => {
  useDocumentTitle("Sign Up | Cannabud");

  const handleSubmit = async (data) => {
    const { displayName, email, password } = data;
    const { user } = await createAuthUserWithEmailAndPassword(email, password);
    await createUserDocumentFromAuth(user, { displayName });
    await fetchUserDocumentFromAuth(user.uid);
  };

  const handleSocialAuth = async () => {
    const { user } = await signInWithGoogle();
    await createUserDocumentFromAuth(user);
    await fetchUserDocumentFromAuth(user.uid);
  };

  return (
    <AuthForm
      mode="signup"
      title="Sign up to Cannabud"
      schema={signUpSchema}
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default SignUp;
