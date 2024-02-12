"use client";
import SearchBar from "./SearchBar";
import { useState, ReactNode } from "react";
import { CardGrid } from "./container";

interface SearchableContainerProps<T> {
  addElementComponent?: React.ReactNode;
  title?: ReactNode;
  display: (elem: T) => React.ReactNode;
  elements: T[];
  search?: ((elem: T, filter: string) => boolean) | null;
}

const SearchableContainer = <T,>({
  addElementComponent,
  title,
  display,
  elements,
  search = null,
}: SearchableContainerProps<T>) => {
  const [filter, setFilter] = useState("");
  const tilesToDisplay = elements
    .filter((e) => {
      if (search === null) return true; // No search method provided
      return search(e, filter);
    })
    .map((e) => display(e));
  return (
    <div>
      {search && (
        <div className="z-10 mb-2 flex flex-row justify-between space-x-3 align-middle">
          <SearchBar setFilter={setFilter} />
        </div>
      )}
      <div className="flex w-full flex-wrap gap-10">
        <CardGrid
          tiles={
            addElementComponent
              ? [addElementComponent, ...tilesToDisplay]
              : tilesToDisplay
          }
          title={title}
        />
      </div>
    </div>
  );
};

export default SearchableContainer;
