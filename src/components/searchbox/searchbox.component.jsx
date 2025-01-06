import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Search } from "lucide-react";
import { debounce } from "lodash";

const Searchbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = debounce((query) => {
    if (query.trim()) {
      setIsLoading(true);
      navigate(`/search/${query}`);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, 300);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="flex items-center border border-gray-300 bg-white w-full lg:w-64 max-w-lg">
      {isLoading ? (
        <Loader className="mx-2 flex-shrink-0 animate-spin" width={16} />
      ) : (
        <Search className="mx-2 flex-shrink-0" width={16} />
      )}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleInputChange}
        className="bg-white flex-grow py-2 outline-none px-2 text-sm font-medium text-text placeholder:text-text w-full"
      />
    </div>
  );
};

export default Searchbox;
