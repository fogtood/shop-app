import { useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/document-title.hook";

const Category = () => {
  const { category } = useParams();
  useDocumentTitle(`Shop | ${category} | Cannabud`);

  return (
    <div className="min-h-screen max-w-5xl mx-auto">
      {category.toUpperCase()}
    </div>
  );
};

export default Category;
