import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../button/button.component";
import Input from "../input/input.component";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  setPaymentMethod,
  resetCheckout,
} from "../../store/reducers/checkoutSlice";
import { clearCart } from "../../store/reducers/cartSlice";
import { getPaymentSchema } from "../../lib/schemas/paymentSchemas";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { calculateCartTotal } from "../../utils/calculateCartTotal";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { paymentMethod, isInternationalShipping } = useSelector(
    (state) => state.checkout
  );
  const { cartItems } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const { setValue } = useForm({
    resolver: zodResolver(getPaymentSchema(paymentMethod)),
    mode: "all",
  });

  useEffect(() => {
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, setValue]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);

    const totalCartValue = isInternationalShipping
      ? calculateCartTotal(cartItems) + 50
      : calculateCartTotal(cartItems);
    // Convert to cents for Stripe (e.g., $0.54 becomes 54 cents)
    const amount = Math.round(totalCartValue * 100);

    if (amount < 50) {
      toast.error("The total amount must be at least $0.50");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        toast.error(error.message);
        // navigate("/payment-failure", { state: { fromPayment: true } });
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment succeeded!");
        dispatch(resetCheckout());
        dispatch(clearCart());
        // navigate("/payment-success", { state: { fromPayment: true } });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during payment:", error.message);
      toast.error("Something went wrong. Please try again.");
      // navigate("/payment-failure", { state: { fromPayment: true } });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (paymentMethod) {
      case "paypal":
        toast.warn("PayPal payment is not yet supported");
        break;
      case "credit-card":
        await handleCardPayment();
        break;
      case "":
        toast.error("Please select a payment method");
        break;
      default:
        toast.error("Invalid payment method selected");
        break;
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mt-12 mb-8 text-center">Payment</h1>
      <form onSubmit={handleSubmit}>
        <PaymentOption isProcessing={isProcessing} />
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
            onClick={() => navigate("/checkout?step=2")}
            disabled={isProcessing}
          >
            <FaArrowLeft /> Go Back
          </button>
          <Button
            type="submit"
            buttonType={"auth"}
            icon={
              isProcessing ? (
                <ClipLoader size={20} color="white" />
              ) : (
                <FaArrowRight />
              )
            }
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing" : "Pay Now"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

const PaymentOption = ({ isProcessing }) => {
  const { paymentMethod } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  return (
    <>
      {/* Credit Card Option */}
      <div
        className={`p-4 border rounded-md mb-4 ${
          isProcessing ? "pointer-events-none" : "cursor-pointer"
        } ${
          paymentMethod === "credit-card"
            ? "border-black bg-gray-100"
            : "border-gray-300"
        }`}
        onClick={() => dispatch(setPaymentMethod("credit-card"))}
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

        {paymentMethod === "credit-card" && (
          <div className="mt-4 space-y-4">
            <div className="grid xs:grid-cols-2 gap-4">
              <div>
                <Input
                  label={"Cardholder Name"}
                  type={"text"}
                  placeholder={"Jane Doe"}
                  required
                  minLength="4"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text">
                  Card Number
                </label>
                <div className="mt-2">
                  <CardNumberElement className="w-full px-3 py-2 border border-primary" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text">
                  Expiry Date
                </label>
                <div className="mt-2">
                  <CardExpiryElement className="w-full px-3 py-2 border border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text">
                  CVC
                </label>
                <div className="mt-2">
                  <CardCvcElement className="w-full px-3 py-2 border border-primary" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* PayPal Option */}
      <div
        className={`p-4 border rounded-md ${
          isProcessing ? "pointer-events-none" : "cursor-pointer"
        } ${
          paymentMethod === "paypal"
            ? "border-black bg-gray-100"
            : "border-gray-300"
        }`}
        onClick={() => dispatch(setPaymentMethod("paypal"))}
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
