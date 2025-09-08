import React from "react";

interface CustomButtonProps {
  text: string;
  svg?: JSX.Element;
  width?: string;
  padding?: string;
  textStyle?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<CustomButtonProps> = ({
  text,
  svg,
  width,
  padding,
  textStyle,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-3 sm:px-4 py-2 text-sm",
    md: "px-6 sm:px-8 py-3 text-sm sm:text-[16px]",
    lg: "px-8 sm:px-10 py-4 text-base sm:text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "button-gradient text-primary hover:shadow-lg hover:scale-105",
    outline:
      "border border-primary text-primary bg-transparent hover:bg-primary hover:text-background",
    ghost: "text-primary hover:bg-primary hover:bg-opacity-10",
  };

  // Use custom styles if provided, otherwise use defaults
  const finalWidth =
    width || (size === "sm" ? "w-auto" : "w-full sm:w-[242px]");
  const finalPadding = padding || sizeClasses[size];
  const finalTextStyle =
    textStyle || `font-normal font-archivo ${sizeClasses[size]}`;
  const finalVariant = variantClasses[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center ${finalPadding} ${finalWidth} ${finalTextStyle} gap-2 ${finalVariant} rounded-lg transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
      {svg && <span>{svg}</span>}
    </button>
  );
};

export default Button;
