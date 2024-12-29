import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import ItemCard, {
  ItemCardSkeleton,
} from "../../components/item-card/item-card.component";
import Button from "../../components/button/button.component";
import { useGetCategoriesQuery } from "../../services/api/endpoints/categoriesApi";

const Shop = () => {
  useDocumentTitle("Shop | Cannabud");
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();

  if (isLoading) return <ShopLoader />;

  if (error) {
    return (
      <div className="flex items-start justify-center py-52 bg-main">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="font-medium">
            {error}
            <button
              className="underline text-blue-500 cursor-pointer ml-2"
              onClick={() => refetch()}
            >
              retry
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="space-y-10 pt-4 pb-28">
        {Object.keys(categories).map((title, idx) => {
          const products = categories[title];
          return (
            <div key={idx} className="w-full px-6">
              <div className="flex items-center justify-between my-5">
                <p className="font-semibold text-2xl">{title.toUpperCase()}</p>
                <Button
                  buttonType={"secondary"}
                  onClick={() => navigate(`/shop/${title.toLowerCase()}`)}
                >
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id}>
                    <ItemCard item={product} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShopLoader = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="space-y-10 pt-4 pb-28">
        {[...Array(3)].map((_, categoryIndex) => (
          <div key={categoryIndex} className="w-full px-6">
            <div className="flex items-center justify-between my-5">
              <div className="h-8 bg-gray-200 rounded w-28 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, index) => (
                <ItemCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
