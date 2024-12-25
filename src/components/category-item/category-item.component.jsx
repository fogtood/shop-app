import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category, categories, idx }) => {
  const navigate = useNavigate();

  const isLastTwo =
    idx === categories.length - 2 || idx === categories.length - 1;
  const isLast = idx === categories.length - 1;

  return (
    <div
      className={`${
        isLastTwo ? "lg:col-span-3 lg:row-span-2 lg:h-[380px]" : "lg:col-span-2"
      } ${
        isLast ? "sm:col-span-2" : "sm:col-span-1"
      } col-span-1 row-span-2 h-[240px] w-full flex items-center justify-center cursor-pointer overflow-hidden relative`}
      onClick={() => navigate(category.route)}
    >
      {/* Background image div */}
      <div
        className="absolute inset-0 transition-transform duration-[6000ms] ease-[cubic-bezier(0.25,0.45,0.45,0.95)] hover:scale-110"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
          objectFit: "cover",
          objectPosition: "center",
          height: "100%",
        }}
      />
      <div className="bg-white opacity-90 text-black text-center border border-black p-4">
        <p className="font-medium text-2xl">{category.title.toUpperCase()}</p>
        <p className="text-sm">SHOP NOW</p>
      </div>
    </div>
  );
};

export default CategoryItem;
