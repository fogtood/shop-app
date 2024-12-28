import React from "react";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import Order from "../../components/order/order.component";
import Shipping from "../../components/shipping/shipping.component";
import Payment from "../../components/payment/payment.component";

const CheckOut = () => {
  useDocumentTitle("Checkout | Cannabud");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = Number(queryParams.get("step")) || 1;

  const description = ["order", "shipping", "payment"];

  return (
    <div className="min-h-screen max-w-[740px] mx-auto py-10 px-6">
      <Stepper step={step} description={description} />

      {/* Immediately Invoked function */}
      {(() => {
        switch (step) {
          case 1:
            return <Order />;
          case 2:
            return <Shipping />;
          case 3:
            return <Payment />;
          default:
            return <Order />;
        }
      })()}
    </div>
  );
};

export default CheckOut;

const Stepper = ({ step, description }) => {
  return (
    <div className="flex items-center justify-between relative z-10 max-w-lg mx-auto">
      {Array.from({ length: 3 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
                step === idx + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-text"
              }`}
            >
              {idx + 1}
            </div>
            {idx < 2 && (
              <div className="absolute top-1/3 left-1/2 w-full h-1 bg-gray-200 transform -translate-x-1/2 -translate-y-1/2 z-[-1]" />
            )}
            <span
              className={`text-sm mt-1 font-medium ${
                step === idx + 1 ? "text-black" : "text-text"
              }`}
            >
              {description[idx]}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
