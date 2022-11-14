import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-white text-base p-9 rounded-xl shadow-lg">
      {children}
    </div>
  );
};

export { Card };
