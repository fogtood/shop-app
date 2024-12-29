import { useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";

const Category = () => {
  const { category } = useParams();
  useDocumentTitle(`Shop | ${category} | Cannabud`);

  return (
    <div className="min-h-screen max-w-5xl mx-auto">
      <div className="pt-4 px-6">
        <h1 className="font-bold text-xl">{category.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default Category;
