import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Button from "../button/button.component";
import { CartItemCard } from "../sheet/sheet.component";
import { BsShop } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { calculateCartTotal } from "../../utils/calculateCartTotal";

const Order = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center mt-12 mb-8">
        <h1 className="text-xl font-bold">Order Summary</h1>
        <p className="text-sm mt-2">Review items in your cart.</p>
      </div>
      <div>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-right mt-5">
          <p className="text-text text-sm">Subtotal: </p>
          <p className="text-2xl font-bold mt-2">
            ${calculateCartTotal(cartItems).toFixed(2)}
          </p>
          <div className="flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between mt-8">
            <button
              className="flex items-center justify-center xs:justify-start gap-2 bg-gray-200 p-3 border border-primary text-text font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:cursor-not-allowed"
              onClick={() => navigate("/shop")}
            >
              <BsShop /> Continue Shopping
            </button>
            <Button
              type="submit"
              buttonType={"auth"}
              onClick={() => navigate("/checkout?step=2")}
              icon={<FaArrowRight />}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
