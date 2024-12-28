import { useState } from "react";
import Account from "../account/account.component";

const WishList = () => {
  return (
    <div className="bg-[#f2f2f2] h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-lg font-semibold">My Wish List</h1>
        <p className="text-sm text-text pt-2 font-medium">
          You don't have any wish list
        </p>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="bg-[#f2f2f2] h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-lg font-semibold">Orders</h1>
        <p className="text-sm text-text pt-2 font-medium">
          You don't have any orders
        </p>
      </div>
    </div>
  );
};

const tabsData = [
  {
    label: "Account",
    content: <Account />,
  },
  {
    label: "My Wish List",
    content: <WishList />,
  },
  {
    label: "My Orders",
    content: <Orders />,
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="bg-[#f2f2f2] text-text px-5 xs:px-8">
        <div className="relative p-0 flex overflow-x-auto scrollbar-hide">
          {tabsData.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`py-4 px-2 xs:p-4 text-center font-medium text-sm relative whitespace-nowrap ${
                activeTab === idx
                  ? "bg-white text-[#4a4a4a] font-semibold"
                  : "bg-[#f2f2f2] text-text border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 py-5 xs:p-5 bg-white">
        {tabsData[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
