import React, { ReactNode } from "react";

interface UserGridProps {
  title?: ReactNode;
  tiles: ReactNode[];
  column_count?: number;
}

const CardGrid = ({ title, tiles, column_count }: UserGridProps) => {
  return (
    <div className="flex w-full flex-col gap-y-5">
      {title}
      {column_count ? (
        <div className={`grid grid-cols-${column_count} gap-10`}>{tiles}</div>
      ) : (
        <div className="flex w-full flex-wrap gap-10">{tiles}</div>
      )}
    </div>
  );
};

export default CardGrid;
