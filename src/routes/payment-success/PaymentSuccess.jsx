import { useLocation, Navigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();

  if (!location.state?.fromPayment) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)]">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase.</p>
      <Link to="/" className="bg-black text-white px-4 py-2 rounded">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
