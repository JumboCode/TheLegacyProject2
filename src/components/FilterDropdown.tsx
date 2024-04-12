import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { fas, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Check(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      {...props}
      className="mr-2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type Named = { name: string | null };

type FilterDropdownProps<T extends Named> = {
  items: T[];
  filterMatch: (a: T, b: string) => boolean;
  display: (a: T) => JSX.Element;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
};

/**
 * @deprecated In favour of Dropdown which implements a more generic version.
 */
export default function FilterDropdown<T extends Named>({
  items,
  filterMatch,
  display,
  selectedItems,
  setSelectedItems,
}: FilterDropdownProps<T>) {
  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredItems = useMemo(
    () => items.filter((i) => filterMatch(i, filterText)),
    [items, filterMatch, filterText]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const onItemSelect = (idx: number, item: T) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i != item));
    }
  };

  return (
    <>
      <div className="bg-red flex w-full flex-col">
        <div
          onChange={onChange}
          className="mb-2 h-[36px] w-full flex-row items-end justify-end rounded-md border-2 border-tan bg-white px-3 text-gray-400 focus:outline-none"
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className="flex h-[32px] flex-row items-center justify-between text-sm text-dark-teal">
            Select student(s)
            <FontAwesomeIcon icon={faCaretDown} className=" text-dark-teal" />
          </div>
        </div>
        {showOptions && (
          <div
            className="relative w-full"
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
          >
            <div className="top-100 absolute z-50 flex max-h-[150px] w-full flex-col overflow-y-auto bg-white">
              {filteredItems.map((item: T, index: number) => (
                <span
                  className="hover:bg-legacy-teal flex  flex-row items-center border border-light-gray py-2
                            pl-2 text-gray-700 hover:cursor-pointer hover:font-bold"
                  onClick={() => {
                    onItemSelect(index, item);
                  }}
                  key={index}
                >
                  {selectedItems.includes(item) && <Check />}
                  {item.name ?? ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="my-2 flex flex-row overflow-x-auto">
        {selectedItems.map((item: T, i: number) => (
          <div key={i}>{display(item)}</div>
        ))}
      </div>
    </>
  );
}
