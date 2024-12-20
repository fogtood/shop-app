import { useMemo } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/reducers/cartSlice";
import { toast } from "react-toastify";

const ItemCard = ({ item }) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const addedToCart = useMemo(
    () => cart.some((cartItem) => cartItem.id === item.id),
    [cart, item.id]
  );

  const addItemToCart = (item) => {
    dispatch(addToCart({ ...item }));
    toast.success("item added to cart", {
      position: "top-center",
    });
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart({ ...item }));
    toast.warn("item removed from cart", {
      position: "top-center",
    });
  };

  return (
    <div className="group relative bg-[#f2f2f2] cursor-pointer overflow-hidden h-80">
      {addedToCart && (
        <IoMdCheckmark className="absolute top-3 right-3 text-green-500 text-xl" />
      )}
      {/* Image Section */}
      <div className="h-[60%] transition-all duration-300 group-hover:h-[50%]">
        <img
          src={item.imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Middle Section */}
      <div className="h-[40%] group-hover:h-[30%] flex flex-col items-center justify-center font-medium transition-transform duration-300 gap-y-3">
        <p className="text-text">{item.name}</p>
        <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>
      </div>

      {/* Button */}
      <button
        className={`absolute bottom-[-50px] transform transition-all duration-300 ${
          addedToCart ? "bg-primary text-black" : "bg-black text-white"
        } font-medium py-2 w-full group-hover:bottom-0`}
        onClick={() =>
          addedToCart ? removeItemFromCart(item) : addItemToCart(item)
        }
      >
        {addedToCart ? "Remove from cart" : "Add to cart"}
      </button>
    </div>
  );
};

export default ItemCard;
