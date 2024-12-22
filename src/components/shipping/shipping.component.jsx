import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../input/input.component";
import { ShippingOptionInput } from "../input/input.component";
import Button from "../button/button.component";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { calculateCartTotal } from "../../utils/calculateCartTotal";
import {
  setShippingDetails,
  setInternationalShipping,
} from "../../store/reducers/checkoutSlice";

const schema = z.object({
  displayName: z
    .string()
    .nonempty({ message: "Full Name is required" })
    .min(3, { message: "Name is too short" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  address: z.string().nonempty({ message: "Address is required" }),
  mobile: z
    .string()
    .nonempty({ message: "Mobile is required" })
    .regex(/^(\+234|0)[789]\d{9}$/, {
      message: "Invalid Nigerian mobile number",
    }),
});

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingDetails, isInternationalShipping } = useSelector(
    (state) => state.checkout
  );

  const [formFieldValues, setFormFieldValues] = useState({
    displayName: shippingDetails.displayName || user.displayName || "",
    email: shippingDetails.email || user.email || "",
    address: shippingDetails.address || user.address || "",
    mobile: shippingDetails.mobile || user.mobile || "",
  });

  const internationalShippingPrice = isInternationalShipping ? 50 : 0;
  const cartTotal = calculateCartTotal(cartItems);
  const totalPrice = (cartTotal + internationalShippingPrice).toFixed(2);

  useEffect(() => {
    setFormFieldValues((prevValues) => ({
      ...prevValues,
      totalPrice,
    }));
  }, [totalPrice]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  // Handles input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormFieldValues({
      ...formFieldValues,
      [name]: value,
    });
  };

  // Handles form submission and navigates to the checkout step 3
  const onSubmit = () => {
    dispatch(setShippingDetails(formFieldValues));
    navigate("/checkout?step=3");
  };

  // Handles shipping option change
  const handleShippingOptionChange = (e) => {
    const isInternational = e.target.checked;
    dispatch(setInternationalShipping(isInternational));
  };

  return (
    <div>
      <h1 className="text-xl font-bold mt-12 mb-8 text-center">
        Shipping Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label={
              errors.displayName ? errors.displayName.message : "Full Name"
            }
            type={"text"}
            placeholder={"Enter Your Full Name"}
            value={formFieldValues.displayName}
            error={!!errors.displayName}
            {...register("displayName")}
            onChange={handleInputChange}
          />
          <Input
            label={errors.email ? errors.email.message : "Email Address"}
            type={"email"}
            placeholder={"test@gmail.com"}
            value={formFieldValues.email}
            error={!!errors.email}
            {...register("email")}
            onChange={handleInputChange}
          />
          <Input
            label={errors.address ? errors.address.message : "Shipping Address"}
            type={"text"}
            placeholder={"2378 Colonial Drive, Somerville, Texas"}
            value={formFieldValues.address}
            error={!!errors.address}
            {...register("address")}
            onChange={handleInputChange}
          />
          <Input
            label={errors.mobile ? errors.mobile.message : "Mobile Number"}
            type={"text"}
            placeholder={"+2349128631289"}
            value={formFieldValues.mobile}
            error={!!errors.mobile}
            {...register("mobile")}
            onChange={handleInputChange}
          />
        </div>
        <ShippingOptionInput
          isInternationalShipping={isInternationalShipping}
          handleShippingOptionChange={handleShippingOptionChange}
        />
        <div className="text-right mt-5">
          <div className="flex items-center justify-end gap-4">
            <p className="text-text text-sm font-medium">
              International Shipping:
            </p>
            <p className="text-lg font-medium">
              ${internationalShippingPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-end gap-4">
            <p className="text-text text-sm font-medium">Subtotal:</p>
            <p className="text-lg font-medium">${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-end mt-4 gap-4">
            <p className="text-sm text-text">Total: </p>
            <p className="text-2xl font-bold">${formFieldValues.totalPrice}</p>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              className="flex items-center gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
              type="button"
              onClick={() => navigate("/checkout?step=1")}
            >
              <FaArrowLeft /> Go Back
            </button>
            <Button type="submit" buttonType={"auth"} icon={<FaArrowRight />}>
              Proceed
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
