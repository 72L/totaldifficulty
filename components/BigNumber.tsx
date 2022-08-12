import { ReactNode } from "react";

interface BigNumberProps {
  children: ReactNode;
  className: string;
}

const BigNumber = ({ children, className }: BigNumberProps) => {
  return (
    <div
      className={`text-3xl md:text-6xl lg:text-8xl font-numbers ${className}`}
    >
      {children}
    </div>
  );
};

export default BigNumber;
