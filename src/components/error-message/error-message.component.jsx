const ErrorMessage = ({ message }) => {
  return (
    <div
      className="bg-red-50 border border-red-500 text-red-600 px-4 py-3 text-center relative"
      role="alert"
    >
      <span className="block sm:inline font-medium text-sm">{message}</span>
    </div>
  );
};

export default ErrorMessage;
