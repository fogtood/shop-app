import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../input/input.component";
import Button from "../button/button.component";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { calculateCartTotal } from "../../utils/calculateCartTotal";

const Shipping = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [toggled, setToggled] = useState(false);
  const interShippingPrice = toggled ? 50 : 0;

  const cartTotal = calculateCartTotal(cartItems);
  const total = (cartTotal + interShippingPrice).toFixed(2);

  return (
    <div>
      <h1 className="text-xl font-bold mt-12 mb-8 text-center">
        Shipping Details
      </h1>
      <div>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label={"Full Name"}
            type={"text"}
            placeholder={"Enter Your Full Name"}
            name={"displayName"}
            required
          />
          <Input
            label={"Email Address"}
            type={"email"}
            name={"email"}
            placeholder={"test@gmail.com"}
            required
          />
          <Input
            label={"Shipping Address"}
            type={"text"}
            name={"address"}
            placeholder={"2378 Colonial Drive, Somerville, Texas"}
            required
          />
          <Input
            label={"Mobile Number"}
            type={"text"}
            placeholder={"+2349128631289"}
            name={"mobile"}
            required
          />
        </div>
        <label className="text-xs font-semibold text-text block my-6">
          Shipping Option
          <div className="w-full flex items-center justify-between border border-primary bg-gray-100 py-6 px-4 mt-2 cursor-pointer">
            <div className="flex flex-1 items-center gap-3">
              <input
                type="checkbox"
                name="interShipping"
                checked={toggled}
                className="form-checkbox w-6 h-6 text-black border-2 rounded-full border-text !outline-none !focus:outline-none !ring-0"
                onChange={() => setToggled(!toggled)}
              />
              <p className="text-black">
                International Shipping
                <span className="text-text ml-1">7-14 days</span>
              </p>
            </div>
            <p className="font-medium text-black text-lg">$50.00</p>
          </div>
        </label>
      </div>
      <div className="text-right mt-5">
        <div className="flex items-center justify-end gap-4">
          <p className="text-text text-sm font-medium">
            International Shipping:
          </p>
          <p className="text-lg font-medium">
            ${interShippingPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <p className="text-text text-sm font-medium">Subtotal:</p>
          <p className="text-lg font-medium">${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-end mt-4 gap-4">
          <p className="text-sm text-text">Total: </p>
          <p className="text-2xl font-bold">${total}</p>
        </div>
        <div className="flex items-center justify-between mt-8">
          <button
            className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
            onClick={() => navigate("/checkout?step=1")}
          >
            <FaArrowLeft /> Go Back
          </button>
          <Button
            type="submit"
            buttonType={"auth"}
            icon={<FaArrowRight />}
            onClick={() => navigate("/checkout?step=3")}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
