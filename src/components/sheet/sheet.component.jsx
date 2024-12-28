import { X } from "lucide-react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../store/reducers/cartSlice";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sheet = ({ isSheetOpen, closeSheet }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSheetOpen]);

  const calculateCartTotal = (cartItems) => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const totalCartPrice = calculateCartTotal(cartItems);

  if (!isSheetOpen) return null;

  return ReactDom.createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${
          isSheetOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={closeSheet}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white 
          w-full sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[40%]
          transform transition-all duration-300 ease-out
          ${isSheetOpen ? "translate-x-0" : "translate-x-full"}
          shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 pb-5">
            <div className="flex justify-between items-center sticky top-0 bg-white pt-5 pb-3 md:mt-4 border-b">
              <h1 className="font-bold text-xl">
                My Cart{" "}
                <span className="text-text text-xs">
                  ( {cartItems.length} item{cartItems.length > 1 && "s"} )
                </span>
              </h1>
              <div className="flex gap-2">
                <MiniButton onClick={closeSheet}>Close</MiniButton>
                <MiniButton
                  onClick={() => dispatch(clearCart())}
                  disabled={cartItems.length === 0}
                >
                  Clear Cart
                </MiniButton>
              </div>
            </div>
            {cartItems.length === 0 && (
              <div className="flex items-center justify-center h-[calc(100%-100px)]">
                <p className="text-text font-medium">Your cart is empty</p>
              </div>
            )}
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="p-5 border-t border-primary flex items-center justify-between bg-white">
            <div>
              <p className="text-text text-sm font-medium">Subtotal Amount:</p>
              <p className="text-2xl font-semibold">${totalCartPrice}</p>
            </div>
            <Button
              buttonType={"primary"}
              onClick={() => {
                user ? navigate("/checkout?step=1") : navigate("/sign-in");
                closeSheet();
              }}
              disabled={cartItems.length === 0}
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Sheet;

const MiniButton = ({ children, ...otherProps }) => {
  return (
    <button
      className="border border-primary bg-transparent hover:bg-primary p-2 font-semibold text-sm transition-colors text-text disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-30"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const totalItemPrice = calculateItemTotal(item);

  return (
    <div className="border border-primary flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 p-2 sm:p-0 sm:pr-3">
      <div className="flex gap-4 items-start sm:items-center w-full sm:w-auto">
        <div className="flex">
          <div className="hidden sm:flex flex-col">
            <button
              className="flex-1 border-y border-primary bg-transparent hover:bg-primary px-3 font-semibold text-sm transition-colors text-text"
              onClick={() => dispatch(increaseItemQuantity({ ...item }))}
            >
              +
            </button>
            <button
              className="flex-1 border-y border-primary bg-transparent hover:bg-primary px-3 font-semibold text-sm transition-colors text-text disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              onClick={() => dispatch(decreaseItemQuantity({ ...item }))}
            >
              -
            </button>
          </div>
          <img src={item.imageUrl} alt="" className="h-24 w-24 object-cover" />
        </div>
        <div className="flex flex-col gap-3 flex-grow sm:flex-grow-0">
          <p className="font-semibold text-lg underline">{item.name}</p>
          <div className="grid grid-cols-3 gap-4 sm:gap-10">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-text flex-1">Quantity</p>
              <p className="text-sm font-semibold">{item.quantity}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-text flex-1">Size</p>
              <p className="text-sm font-semibold">24</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-text flex-1">Color</p>
              <div className="h-4 w-4 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
        <p className="text-lg font-semibold">${totalItemPrice}</p>
        <div className="flex sm:hidden gap-3">
          <button
            className="flex-1 border border-primary bg-transparent hover:bg-primary px-3 font-semibold text-sm transition-colors text-text"
            onClick={() => dispatch(increaseItemQuantity({ ...item }))}
          >
            +
          </button>
          <button
            className="flex-1 border border-primary bg-transparent hover:bg-primary px-3 font-semibold text-sm transition-colors text-text disabled:cursor-not-allowed"
            disabled={item.quantity <= 1}
            onClick={() => dispatch(decreaseItemQuantity({ ...item }))}
          >
            -
          </button>
        </div>
        <button
          className="border border-primary text-text p-2"
          onClick={() => dispatch(removeFromCart({ ...item }))}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
