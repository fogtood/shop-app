import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Account from "../account/account.component";
import { useGetOrdersQuery } from "../../services/api/endpoints/ordersApi";

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
  const user = useSelector((state) => state.auth.user);
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery(user.uid);

  if (isLoading) {
    return (
      <div className="bg-[#f2f2f2] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-text" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#f2f2f2] h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Orders</h1>
          <p className="text-sm pt-2 font-medium">
            An error occurred while fetching your orders
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders?.length === 0) {
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
  }

  return (
    <div className="bg-[#f2f2f2] h-screen p-4 overflow-y-auto scrollbar-hide">
      <h1 className="text-lg font-semibold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row md:justify-between"
          >
            <div className="flex flex-col justify-between">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-text">
                  Total Items: {order.items.length}
                </p>
                <p
                  className={`text-sm font-medium ${
                    order.paymentStatus === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {order.paymentStatus}
                </p>
                <p className="text-text text-sm">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700 font-semibold mt-auto">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <h4 className="font-semibold text-gray-700">Items:</h4>
              <ul className="list-disc list-inside text-text">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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
  const [activeTab, setActiveTab] = useState(() => 0);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="bg-[#f2f2f2] text-text px-5 xs:px-8">
        <div className="relative p-0 flex overflow-x-auto scrollbar-hide">
          {tabsData.map((tab, idx) => (
            <button
              key={tab.label}
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
      <div className="px-2 py-5 xs:p-5 bg-white min-h-[80vh]">
        {tabsData[activeTab] ? tabsData[activeTab].content : null}
      </div>
    </div>
  );
};

export default Tabs;
