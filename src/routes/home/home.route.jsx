import useDocumentTitle from "../../hooks/document-title.hook";
import { categories } from "../../data/categories";
import CategoryItem from "../../components/category-item/category-item.component";
import Searchbox from "../../components/searchbox/searchbox.component";

const Home = () => {
  useDocumentTitle("Cannabud | Home");

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10 px-4">
      <div className="mb-10 flex items-center justify-center lg:hidden">
        <Searchbox />
      </div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;

const Directory = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
      {categories.map((category, idx) => (
        <CategoryItem
          key={category.id}
          category={category}
          idx={idx}
          categories={categories}
        />
      ))}
    </div>
  );
};
