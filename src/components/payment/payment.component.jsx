import { useEffect } from "react";
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
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.checkout);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(getPaymentSchema(paymentMethod)),
    mode: "all",
  });

  // Update schema dynamically when paymentMethod changes
  useEffect(() => {
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    switch (paymentMethod) {
      case "paypal":
        toast.warn("PayPal payment is not yet supported");
        break;
      case "credit-card":
        console.log(data);
        dispatch(resetCheckout());
        dispatch(clearCart());
        navigate("/");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <PaymentOption register={register} errors={errors} />
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
            onClick={() => navigate("/checkout?step=2")}
          >
            <FaArrowLeft /> Go Back
          </button>
          <Button type="submit" buttonType={"auth"} icon={<FaArrowRight />}>
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

const PaymentOption = ({ register, errors }) => {
  const { paymentMethod } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const handleExpiryDateChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = rawValue;

    if (rawValue.length > 2) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}`;
    }

    e.target.value = formattedValue; // Update the input value
  };

  return (
    <>
      {/* Credit Card Option */}
      <div
        className={`p-4 border rounded-md mb-4 cursor-pointer ${
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
                  label={
                    errors.fullName
                      ? errors.fullName.message
                      : "Full Name (name on card)"
                  }
                  type={"text"}
                  placeholder={"Jane Doe"}
                  error={!!errors.fullName}
                  {...register("fullName")}
                />
              </div>
              <div>
                <Input
                  label={
                    errors.cardNumber
                      ? errors.cardNumber.message
                      : "Card Number"
                  }
                  type={"number"}
                  placeholder="Enter your card number"
                  error={!!errors.cardNumber}
                  {...register("cardNumber")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={
                  errors.expiryDate ? errors.expiryDate.message : "Expiry Date"
                }
                type={"text"}
                placeholder={"MM/YY"}
                error={!!errors.expiryDate}
                {...register("expiryDate")}
                onChange={handleExpiryDateChange}
              />
              <Input
                label={errors.cvv ? errors.cvv.message : "CVV"}
                type={"number"}
                placeholder={"***"}
                error={!!errors.cvv}
                {...register("cvv")}
              />
            </div>
          </div>
        )}
      </div>

      {/* PayPal Option */}
      <div
        className={`p-4 border rounded-md cursor-pointer ${
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
