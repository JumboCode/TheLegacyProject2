import Dropdown from "@components/selector/Dropdown";
import { useRouter } from "next/navigation";
import React from "react";

type IdentifiableObject = { id: string };

interface AssignmentProps<T extends IdentifiableObject> {
  editable: boolean;
  display: (ele: T) => React.ReactNode;
  elements: T[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  onSave: () => Promise<any>;
}

const NewAssignment = <T extends IdentifiableObject>(
  props: AssignmentProps<T>
) => {
  const { editable, display, elements, selected, setSelected, onSave } = props;
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {editable && (
        <Dropdown<T>
          header="Assign student"
          elements={elements}
          selected={selected}
          setSelected={setSelected}
          display={display}
          onSave={async () => {
            await onSave();
            router.refresh();
          }}
        />
      )}

      {selected.map((elem) => (
        <div
          key={elem.id}
          className="rounded-3xl bg-amber-red px-4 py-1.5 text-white"
        >
          {display(elem)}
        </div>
      ))}
    </div>
  );
};

export default NewAssignment;
