import AuthForm from "../../components/auth-form/auth-form.component";
import useDocumentTitle from "../../hooks/document-title.hook";
import { signInSchema } from "../../lib/schemas/authenticationSchema";
import {
  createUserDocumentFromAuth,
  fetchUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useDocumentTitle("Sign In | Cannabud");

  const handleSubmit = async (data) => {
    const { email, password } = data;
    const { user } = await signInAuthUserWithEmailAndPassword(email, password);
    await fetchUserDocumentFromAuth(user.uid);
  };

  const handleSocialAuth = async () => {
    const { user } = await signInWithGoogle();
    await createUserDocumentFromAuth(user);
    await fetchUserDocumentFromAuth(user.uid);
  };

  return (
    <AuthForm
      mode="signin"
      title="Sign in to Cannabud"
      schema={signInSchema}
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default SignIn;
