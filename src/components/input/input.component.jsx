import React from "react";

const Input = React.forwardRef(
  ({ label, type, placeholder, error, ...props }, ref) => {
    return (
      <label
        className={`text-xs font-semibold ${
          error ? "text-red-500" : "text-text"
        } block`}
      >
        {label}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`border py-2 px-3 bg-transparent block mt-2 outline-none w-full text-sm ${
            error ? "border-red-500" : "border-primary"
          }`}
          {...props}
        />
      </label>
    );
  }
);

// Display name for debugging purposes
Input.displayName = "Input";

export default Input;

export const ShippingOptionInput = ({
  isInternationalShipping,
  handleShippingOptionChange,
}) => {
  return (
    <label className="text-xs font-semibold text-text block my-6">
      Shipping Option
      <div className="w-full flex items-center justify-between border border-primary bg-gray-100 py-6 px-4 mt-2 cursor-pointer">
        <div className="flex flex-1 items-center gap-3">
          <input
            type="checkbox"
            name="interShipping"
            checked={isInternationalShipping}
            className="form-checkbox w-6 h-6 text-black border-2 rounded-full border-text !outline-none !focus:outline-none !ring-0"
            onChange={handleShippingOptionChange}
          />
          <p className="text-black">
            International Shipping
            <span className="text-text ml-1">7-14 days</span>
          </p>
        </div>
        <p className="font-medium text-black text-lg">$50.00</p>
      </div>
    </label>
  );
};
