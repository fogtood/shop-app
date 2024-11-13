import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Shop from "./routes/shop/shop.route";
import SignUp from "./routes/sign-up/sign-up.route";
import SignIn from "./routes/sign-in/sign-in.route";
import {
  onAuthStateChangedListener,
  fetchUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/reducers/authSlice";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
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
        dispatch(login({ ...userData }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
