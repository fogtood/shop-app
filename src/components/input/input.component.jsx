const Input = ({ label, type, ...otherProps }) => {
  return (
    <label className="text-xs font-semibold text-text block">
      {label}
      <input
        type={type}
        className="border border-primary text-text placeholder:text-text py-2 px-3 bg-transparent block mt-2 outline-none w-full text-sm"
        {...otherProps}
      />
    </label>
  );
};

export default Input;
