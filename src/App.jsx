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
import { login, logout, setError } from "./store/reducers/authSlice";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./utils/private-routes/private-route.util";
import Account from "./routes/account/account.route";
import AuthRedirectRoute from "./utils/private-routes/auth-redirect.route";
import Category from "./routes/category/category.route";
import CheckOut from "./routes/checkout/checkout.route";
import Featured from "./routes/featured/featured.route";
import Recommended from "./routes/recommended/recommended.route";
import EditProfile from "./routes/edit-profile/edit-profile.route";
import Search from "./routes/search/search.route";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import logo from "./assets/logo.png";
// import PaymentSuccess from "./routes/payment-success/PaymentSuccess";
// import PaymentFailure from "./routes/payment-failure/PaymentFailure";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(
  "pk_test_51QcnOQKGkFum67gMsvm8Bugjh5QeGoLBWFzepjpFCogqMMGq4Kz16zZlzU3vk6J3MVGJ1D05b7kzQJlvfBMQsfUO00iISjr5My"
);

const App = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        let userDoc = null;
        let attempts = 0;

        while (!userDoc && attempts < 5) {
          try {
            userDoc = await fetchUserDocumentFromAuth(user.uid);
            attempts += 1;
            if (!userDoc)
              await new Promise((resolve) => setTimeout(resolve, 500)); // Retry after 500ms
          } catch (error) {
            console.error("Error fetching user document:", error); // Log the error for debugging
            dispatch(
              setError("Failed to load user data. Please try again later.")
            );
            break;
          }
        }

        if (userDoc) {
          const userData = {
            uid: user.uid,
            email: userDoc.email,
            displayName: userDoc.displayName,
            avatar: userDoc.avatar,
            mobile: userDoc.mobile || "",
            address: userDoc.address || "",
            createdAt: userDoc.createdAt
              ? userDoc.createdAt.toDate().toISOString()
              : null,
            emailVerified: userDoc.emailVerified,
          };

          dispatch(login({ ...userData }));
        } else {
          dispatch(setError("Failed to load data."));
        }
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-main">
        <img
          src={logo}
          alt="logo"
          className="animate-bounce h-28 w-28 object-cover"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-main">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="font-medium">
            {error}{" "}
            <span
              className="underline text-blue-500 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              retry
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:category" element={<Category />} />
            <Route path="featured" element={<Featured />} />
            <Route path="recommended" element={<Recommended />} />
            <Route path="search/:query" element={<Search />} />

            {/* Redirect signed-in users away from sign-in and sign-up pages */}
            <Route element={<AuthRedirectRoute />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/account" element={<Account />} />
              <Route path="/account/edit" element={<EditProfile />} />
              <Route path="/checkout/*" element={<CheckOut />} />
              {/* <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} /> */}
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Elements>
    </>
  );
};

export default App;
