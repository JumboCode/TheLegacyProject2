import { Spinner } from "@components/skeleton";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type IdentifiableObject = { id: string };

interface DropdownProps<T extends IdentifiableObject> {
  header: string;
  display: (ele: T) => React.ReactNode;
  elements: T[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  onSave: () => Promise<any>;
}

const Dropdown = <T extends IdentifiableObject>(props: DropdownProps<T>) => {
  const { header, display, elements, selected, setSelected } = props;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_, startTransition] = React.useTransition();

  const onSave = () => {
    setLoading(true);
    props.onSave().then(() => setLoading(false));
  };

  const onCheck = (element: T) => {
    startTransition(() => {
      if (selected.some((other) => element.id === other.id)) {
        setSelected((prev) => prev.filter((other) => element.id !== other.id));
      } else {
        setSelected((prev) => [...prev, element]);
      }
    });
  };

  // TODO(nickbar01234) - Handle click outside
  return (
    <div className="relative min-w-[192px]">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-amber-red px-4 py-1.5"
        onClick={() => setDisplayDropdown(!displayDropdown)}
      >
        <span className="text-amber-red">{header}</span>
        <FontAwesomeIcon icon={faCaretDown} className="text-amber-red" />
      </div>
      {displayDropdown && (
        <div className="absolute z-50 mt-2 inline-block w-full rounded border border-amber-red bg-white p-4">
          <div className="flex min-h-[128px] flex-col justify-between gap-y-3">
            <div className="flex max-h-[128px] flex-col gap-y-3 overflow-y-auto">
              {elements.map((element, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-amber-red"
                >
                  <button
                    className="flex h-4 w-4 items-center justify-center border-2 border-amber-red bg-white"
                    onClick={() => onCheck(element)}
                  >
                    {selected.some((other) => element.id === other.id) && (
                      <FontAwesomeIcon icon={faCheck} size="xs" />
                    )}
                  </button>
                  <span className="overflow-hidden truncate">
                    {display(element)}
                  </span>
                </div>
              ))}
            </div>
            {loading ? (
              <div className="flex w-full justify-center">
                <Spinner height={8} width={8} />
              </div>
            ) : (
              <button
                className="rounded bg-amber-red px-6 py-2.5 text-white"
                onClick={onSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
