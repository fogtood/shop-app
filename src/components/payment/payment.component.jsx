import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import Input from "../input/input.component";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-xl font-bold mt-12 mb-8 text-center">Payment</h1>
      <div>
        <PaymentOption />
        <div className="flex items-center justify-between mt-8">
          <button
            className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
            onClick={() => navigate("/checkout?step=2")}
          >
            <FaArrowLeft /> Go Back
          </button>
          <Button
            type="submit"
            buttonType={"auth"}
            icon={<FaArrowRight />}
            onClick={() => navigate("/")}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

const PaymentOption = () => {
  const [selectedMethod, setSelectedMethod] = useState("paypal");

  return (
    <>
      {/* Credit Card Option */}
      <div
        className={`p-4 border rounded-md mb-4 cursor-pointer ${
          selectedMethod === "credit-card"
            ? "border-black bg-gray-100"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedMethod("credit-card")}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Credit Card</h3>
            <p className="text-xs text-text">
              Pay with Visa, Master Card and other debit or credit cards
            </p>
          </div>
          <img
            src="https://via.placeholder.com/50"
            alt="credit card"
            className="w-10 h-6"
          />
        </div>

        {selectedMethod === "credit-card" && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label={"Full Name (name on card)"}
                  type={"text"}
                  placeholder={"Jane Doe"}
                  required
                />
              </div>
              <div>
                <Input
                  label={"Card Number"}
                  type={"number"}
                  placeholder="Enter your card number"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={"Expiry Date"}
                type={"date"}
                placeholder={"mm/dd/yyyy"}
                required
              />
              <Input
                label={"CVC"}
                type={"number"}
                placeholder={"***"}
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* PayPal Option */}
      <div
        className={`p-4 border rounded-md cursor-pointer ${
          selectedMethod === "paypal"
            ? "border-black bg-gray-100"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedMethod("paypal")}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">PayPal</h3>
            <p className="text-xs text-text">
              Pay easily, fast and secure with PayPal.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/50"
            alt="paypal"
            className="w-10 h-6"
          />
        </div>
      </div>
    </>
  );
};
