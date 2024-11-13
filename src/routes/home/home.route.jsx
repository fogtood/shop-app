import useDocumentTitle from "../../hooks/document-title.hook";
import { categories } from "../../data/categories";
import CategoryItem from "../../components/category-item/category-item.component";

const Home = () => {
  useDocumentTitle("Cannabud | Home");

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10">
      <Directory categories={categories} />
    </div>
  );
};

export default Home;

const Directory = ({ categories }) => {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-5">
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
