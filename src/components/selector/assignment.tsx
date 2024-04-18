import Dropdown from "@components/selector/Dropdown";
import { useRouter } from "next/navigation";
import React from "react";

type IdentifiableObject = { id: string };

interface AssignmentProps<T extends IdentifiableObject> {
  header: string;
  editable: boolean;
  display: (ele: T) => React.ReactNode;
  elements: T[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  onSave: () => Promise<any>;
  multipleChoice?: boolean;
  tagColor?: string;
}

const Assignment = <T extends IdentifiableObject>(
  props: AssignmentProps<T>
) => {
  const {
    header,
    editable,
    display,
    elements,
    selected,
    setSelected,
    onSave,
    multipleChoice,
    tagColor,
  } = props;
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {editable && (
        <div className="min-w-[192px]">
          <Dropdown<T>
            header={header}
            elements={elements}
            selected={selected}
            setSelected={setSelected}
            display={display}
            multipleChoice={multipleChoice}
            onSave={async () => {
              await onSave();
              router.refresh();
            }}
            tagColor={tagColor}
          />
        </div>
      )}
      {selected.map((elem) => (
        <div
          key={elem.id}
          className={`flex items-center rounded-3xl px-3 py-1 text-white`}
          style={{
            background: tagColor ?? "#22555A",
          }}
        >
          {display(elem)}
        </div>
      ))}
    </div>
  );
};

export default Assignment;
