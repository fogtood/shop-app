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

const Sheet = ({ isSheetOpen, closeSheet }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateCartTotal = (cartItems) => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const totalCartPrice = calculateCartTotal(cartItems);

  if (!isSheetOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0" onClick={closeSheet} />
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white w-[45%] transform transition-transform duration-500 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-8">
            <div className="flex justify-between items-center sticky top-0">
              <h1 className="font-bold text-xl">
                My Cart{" "}
                <span className="text-text text-xs">
                  ( {cartItems.length} item{cartItems.length > 1 && "s"} )
                </span>
              </h1>
              <div>
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
              <div className="flex items-center justify-center h-full">
                <p className="text-text font-medium">Your cart is empty</p>
              </div>
            )}
            <div className="space-y-5 mt-5">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="p-5 border-t border-primary flex items-center justify-between">
            <div>
              <p className="text-text text-sm font-medium">Subtotal Amount:</p>
              <p className="text-2xl font-semibold">${totalCartPrice}</p>
            </div>
            <Button buttonType={"primary"}>CHECK OUT</Button>
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
      className="border border-primary bg-transparent hover:bg-primary p-2.5 font-semibold text-sm transition-colors text-text disabled:cursor-not-allowed"
      {...otherProps}
    >
      {children}
    </button>
  );
};

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const totalItemPrice = calculateItemTotal(item);

  return (
    <div className="border border-primary flex items-center justify-between w-full">
      <div className="flex gap-5 items-center">
        <div className="flex">
          <div className="flex flex-col">
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
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg underline">{item.name}</p>
          <div className="grid grid-cols-3 gap-10">
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
      <div className="flex items-center gap-5">
        <p className="text-lg font-semibold">${totalItemPrice}</p>
        <button
          className="border border-primary text-text p-2 mr-5"
          onClick={() => dispatch(removeFromCart({ ...item }))}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
