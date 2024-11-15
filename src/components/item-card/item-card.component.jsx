const ItemCard = ({ item }) => {
  return (
    <div className="group relative bg-white cursor-pointer overflow-hidden h-80">
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
        <p className="text-xl font-semibold">${item.price}</p>
      </div>

      {/* Button */}
      <button className="absolute bottom-[-50px] transform transition-all duration-300 bg-black text-white font-medium py-2 w-full group-hover:bottom-0">
        Add to cart
      </button>
    </div>
  );
};

export default ItemCard;
