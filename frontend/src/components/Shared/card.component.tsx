import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: Props) => {
  return (
    <div
      className={`${className} flex flex-col bg-white text-base p-9 rounded-xl shadow-lg`}
    >
      {children}
    </div>
  );
};

export { Card };
