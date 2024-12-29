import ItemCard from "../../components/item-card/item-card.component";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useGetCategoriesQuery } from "../../services/api/endpoints/categoriesApi";

const Shop = () => {
  useDocumentTitle("Shop | Cannabud");
  const navigate = useNavigate();

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="space-y-10 pt-4 pb-28">
        {Object.keys(categories).map((title) => {
          const products = categories[title];
          return (
            <div key={products.id} className="w-full px-6">
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

export default Shop;
