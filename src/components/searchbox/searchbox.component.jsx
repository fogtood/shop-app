import { Search } from "lucide-react";

const Searchbox = () => {
  return (
    <div className="flex items-center border border-gray-300 bg-white w-full lg:w-64 max-w-lg">
      <Search className="mx-2 flex-shrink-0" width={16} />
      <input
        type="text"
        placeholder="Search products..."
        className="bg-white flex-grow py-2 outline-none px-2 text-sm font-medium text-text placeholder:text-text w-full"
      />
    </div>
  );
};

export default Searchbox;
