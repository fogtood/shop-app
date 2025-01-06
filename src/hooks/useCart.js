import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  increaseItemQuantity as increaseItemQuantityAction,
  decreaseItemQuantity as decreaseItemQuantityAction,
} from "../store/reducers/cartSlice";

const useCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [storedCartItems, setStoredCartItems] = useLocalStorage(
    "cartItems",
    []
  );

  useEffect(() => {
    setStoredCartItems(cartItems);
  }, [cartItems, setStoredCartItems]);

  const addToCart = (item) => dispatch(addToCartAction(item));
  const removeFromCart = (item) => dispatch(removeFromCartAction(item));
  const clearCart = () => dispatch(clearCartAction());
  const increaseItemQuantity = (item) =>
    dispatch(increaseItemQuantityAction(item));
  const decreaseItemQuantity = (item) =>
    dispatch(decreaseItemQuantityAction(item));

  return {
    cartItems: storedCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  };
};

export default useCart;
