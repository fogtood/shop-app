import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/item-card/item-card.component";
import { Loader } from "lucide-react";
import SHOP_DATA from "../../data/shop-data";

const Search = () => {
  const { query } = useParams();
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const allItems = SHOP_DATA.flatMap((category) => category.items);
      const results = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount or query change
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader className="animate-spin text-text" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-center text-text font-semibold text-lg pb-4">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <p className="text-text text-center">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
