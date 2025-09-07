import React from "react";

interface DashboardCardProps {
  availableNumber: number;
  type: string;
  svg: JSX.Element;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  availableNumber,
  type,
  svg,
  onClick,
}) => {
  return (
    <div
      className="border-[0.5px] border-solid border-[#FCFCFC33] flex flex-row justify-between items-center gap-4 lg:gap-16 px-4 lg:px-8 py-6 lg:py-10 rounded-lg cursor-pointer hover:bg-[#FCFCFC05] transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex flex-col gap-3 lg:gap-6">
        <h2 className="font-besley text-3xl lg:text-[48px] font-semibold text-primary">
          {availableNumber}
        </h2>
        <h2 className="font-archivo text-sm lg:text-lg text-primary font-normal">
          Total {type}
        </h2>
      </div>
      <div className="flex justify-center items-center p-3 lg:p-5 bg-[#FCFCFC1A] rounded-3xl w-12 h-12 lg:w-16 lg:h-16">
        {svg}
      </div>
    </div>
  );
};

export default DashboardCard;
