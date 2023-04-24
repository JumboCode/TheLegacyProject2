import { useCallback, useState } from "react";

export interface ISearchBarProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setFilter }: ISearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
      setFilter(e.target.value);
    },
    [setFilter]
  );

  return (
    <input
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-6 text-sm text-gray-900"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}
