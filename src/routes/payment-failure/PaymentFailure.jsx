import { useLocation, Navigate, Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
  const location = useLocation();

  if (!location.state?.fromPayment) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)]">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="text-lg mb-8">Something went wrong. Please try again.</p>
      <Link to="/checkout" className="bg-black text-white px-4 py-2 rounded">
        Go Back to Checkout
      </Link>
    </div>
  );
};

export default PaymentFailure;
