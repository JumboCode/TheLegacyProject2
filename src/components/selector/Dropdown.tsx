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
  multipleChoice?: boolean;
  tagColor?: string;
}

const Dropdown = <T extends IdentifiableObject>(props: DropdownProps<T>) => {
  const { header, display, elements, selected, setSelected, tagColor } = props;
  const multipleChoice = props.multipleChoice ?? true;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_, startTransition] = React.useTransition();

  const onDisplayDropdown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setDisplayDropdown(!displayDropdown);
  };

  const onSave = () => {
    setLoading(true);
    props.onSave().then(() => {
      setLoading(false);
      setDisplayDropdown(false);
    });
  };

  const onCheck = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: T
  ) => {
    e.stopPropagation();
    startTransition(() => {
      if (selected.some((other) => element.id === other.id)) {
        setSelected((prev) => prev.filter((other) => element.id !== other.id));
      } else if (multipleChoice) {
        setSelected((prev) => [...prev, element]);
      } else {
        setSelected([element]);
      }
    });
  };

  // TODO(nickbar01234) - Handle click outside

  const hexColor = tagColor ?? "#22555A";

  return (
    <div className="relative w-full">
      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg border bg-tan px-4 py-1.5`}
        onClick={onDisplayDropdown}
        style={{ borderColor: tagColor ?? "#22555A" }}
      >
        <span style={{ color: hexColor }}>{header}</span>
        <FontAwesomeIcon icon={faCaretDown} style={{ color: hexColor }} />
      </div>
      {displayDropdown && (
        <div
          className="absolute z-50 mt-2 inline-block w-full rounded border bg-tan p-4"
          style={{ borderColor: hexColor }}
        >
          <div className="flex min-h-[128px] flex-col justify-between gap-y-3">
            <div className="flex max-h-[128px] flex-col gap-y-3 overflow-y-auto">
              {elements.map((element, idx) => (
                <div
                  key={idx}
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={(e) => onCheck(e, element)}
                  style={{ color: hexColor }}
                >
                  <button
                    className={`flex h-4 w-4 items-center justify-center border-2 ${
                      !multipleChoice && "rounded-full"
                    }`}
                    style={{ borderColor: hexColor }}
                  >
                    {selected.some((other) => element.id === other.id) &&
                      (multipleChoice ? (
                        <FontAwesomeIcon icon={faCheck} size="xs" />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{ backgroundColor: hexColor }}
                        />
                      ))}
                  </button>
                  <span className="overflow-hidden truncate">
                    {display(element)}
                  </span>
                </div>
              ))}
            </div>
            {loading ? (
              <div className="flex w-full justify-center">
                <Spinner height={12} width={12} />
              </div>
            ) : (
              <button
                className="rounded px-6 py-2.5 text-white"
                onClick={onSave}
                style={{ backgroundColor: hexColor }}
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
