import { useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";
import { useGetCategoryQuery } from "../../services/api/endpoints/categoriesApi";
import ItemCard, {
  ItemCardSkeleton,
} from "../../components/item-card/item-card.component";

const Category = () => {
  const { category } = useParams();
  useDocumentTitle(`Shop | ${category} | Cannabud`);

  const {
    data: categoryData,
    isLoading,
    error,
    refetch,
  } = useGetCategoryQuery(category);

  if (isLoading) return <CategorySkeleton />;

  if (error) return <Error error={error} refetch={refetch} />;

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10 px-6">
      <h1 className="font-bold text-2xl mb-5">
        {categoryData.title.toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categoryData.items.map((item) => (
          <div key={item.id}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CategorySkeleton = () => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10 px-6">
      <div className="h-10 bg-gray-200 rounded w-24 mb-5 animate-pulse" />
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Category;

export const Error = ({ error, refetch }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-220px)] bg-main px-6">
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
};
