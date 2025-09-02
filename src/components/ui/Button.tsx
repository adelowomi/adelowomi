import React from "react";

interface CustomButtonProps {
  text: string;
  svg?: JSX.Element;
  width?: string;
  padding?: string;
  textStyle?: string;
  onClick?: () => void;
}

const Button: React.FC<CustomButtonProps> = ({
  text,
  svg,
  width = "w-[242px]",
  padding = "px-8 py-3",
  textStyle = "text-[16px] font-normal font-archivo text-primary",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center ${padding} ${width} ${textStyle} gap-2 button-gradient rounded-lg hover:shadow-lg transition-all duration-300`}
    >
      {text}
      {svg && <span>{svg}</span>}
    </button>
  );
};

export default Button;
