"use client";

interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div
      className="\ mx-8 mt-6 grid grid-cols-2 gap-12 pr-8 sm:grid-cols-3
                    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {children}
    </div>
  );
}
