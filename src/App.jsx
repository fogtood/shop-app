import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Shop from "./routes/shop/shop.route";
import SignUp from "./routes/sign-up/sign-up.route";
import SignIn from "./routes/sign-in/sign-in.route";
import {
  onAuthStateChangedListener,
  fetchUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/reducers/authSlice";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./utils/private-routes/private-route.util";
import { ClipLoader } from "react-spinners";
import Account from "./routes/account/account.route";
import AuthRedirectRoute from "./utils/private-routes/auth-redirect.route";
import Category from "./routes/category/category.route";
import CheckOut from "./routes/checkout/checkout.route";
import Featured from "./routes/featured/featured.route";
import Recommended from "./routes/recommended/recommended.route";
import EditProfile from "./routes/edit-profile/edit-profile.route";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userDoc = await fetchUserDocumentFromAuth(user.uid);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: userDoc?.displayName,
          avatar: userDoc?.avatar,
          createdAt: userDoc?.createdAt
            ? userDoc.createdAt.toDate().toISOString()
            : null,
          emailVerified: userDoc?.emailVerified,
        };
        dispatch(login({ ...userData }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-main">
        <div className="flex items-center justify-center gap-5">
          <ClipLoader size={100} speedMultiplier={0.6} />
          <div>
            <h1 className="text-3xl font-bold">Cannabud Stores</h1>
            <p className="font-medium">Enjoy shopping!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Category />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/recommended" element={<Recommended />} />

          {/* Redirect signed-in users away from sign-in and sign-up pages */}
          <Route element={<AuthRedirectRoute />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
            <Route path="/account/edit" element={<EditProfile />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
