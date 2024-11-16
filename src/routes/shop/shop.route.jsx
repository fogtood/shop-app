import SHOP_DATA from "../../data/shop-data";
import ItemCard from "../../components/item-card/item-card.component";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";

const Shop = () => {
  useDocumentTitle("Shop | Cannabud");
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="space-y-10 pt-4 pb-28">
        {SHOP_DATA.map((categories) => (
          <div key={categories.title} className="w-full">
            <div className="flex items-center justify-between my-5">
              <p className="font-semibold text-2xl">
                {categories.title.toUpperCase()}
              </p>
              <Button
                buttonType={"secondary"}
                onClick={() =>
                  navigate(`/shop/${categories.title.toLowerCase()}`)
                }
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {categories.items.slice(0, 4).map((item) => (
                <div key={item.id}>
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
