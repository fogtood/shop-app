const BUTTON_STYLES = {
  primary:
    "bg-black text-white font-medium p-3 text-xs hover:bg-black/80 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-black",
  secondary:
    "bg-gray-200 text-text font-medium p-[11px] text-xs border border-text hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-transparent",
  auth: "flex items-center gap-2 bg-black text-white font-medium p-3 hover:bg-black/80 disabled:bg-black/50 disabled:cursor-not-allowed transition",
  btnWithIcon:
    "flex items-center justify-start text-sm pl-5 gap-4 py-3 w-full font-medium",
};

const Button = ({
  children,
  buttonType,
  icon,
  bgColor,
  textColor,
  hoverColor,
  border = "",
  ...otherProps
}) => {
  return (
    <button
      className={`${BUTTON_STYLES[buttonType]} ${
        buttonType === "btnWithIcon" &&
        `${bgColor} ${textColor} ${border} transition-colors duration-500 ${hoverColor} disabled:cursor-not-allowed disabled:hover:bg-none`
      }`}
      {...otherProps}
    >
      {buttonType === "btnWithIcon" && icon}
      {children}
      {buttonType === "auth" && icon}
    </button>
  );
};

export default Button;
