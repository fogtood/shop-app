import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Shop from "./routes/shop/shop.route";
import SignUp from "./routes/sign-up/sign-up.route";
import SignIn from "./routes/sign-in/sign-in.route";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
