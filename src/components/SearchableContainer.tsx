"use client";
import SearchBar from "./SearchBar";
import { useState, ReactNode } from "react";
import { CardGrid } from "./container";

interface SearchableContainerProps<T> {
  addElementComponent?: React.ReactNode;
  title?: ReactNode;
  display: (elem: T, index: number) => React.ReactNode;
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
    .map((e, index) => display(e, index));
  return (
    <div>
      {search && (
        <div className="z-10 mb-6 flex flex-row justify-between space-x-3 align-middle">
          <SearchBar setFilter={setFilter} />
        </div>
      )}
      <CardGrid
        tiles={
          addElementComponent
            ? [addElementComponent, ...tilesToDisplay]
            : tilesToDisplay
        }
        title={title}
      />
    </div>
  );
};

export default SearchableContainer;
