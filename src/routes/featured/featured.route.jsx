import useDocumentTitle from "../../hooks/document-title.hook";

const Featured = () => {
  useDocumentTitle("Featured Products | Cannabud");

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-10 px-6">Featured</div>
  );
};

export default Featured;
