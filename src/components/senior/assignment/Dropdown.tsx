import { Spinner } from "@components/skeleton";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { fullName } from "@utils";
import React from "react";

interface DropdownProps {
  students: User[];
  assigned: User[];
  setAssigned: React.Dispatch<React.SetStateAction<User[]>>;
  onSave: () => Promise<any>;
}

const Dropdown = (props: DropdownProps) => {
  const { students, assigned, setAssigned } = props;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_, startTransition] = React.useTransition();

  const onSave = () => {
    setLoading(true);
    props.onSave().then(() => setLoading(false));
  };

  const onCheck = (user: User) => {
    startTransition(() => {
      const maybeUser = assigned.find((other) => other.id === user.id);
      if (maybeUser != undefined) {
        setAssigned((prev) => prev.filter((other) => other.id !== user.id));
      } else {
        setAssigned((prev) => [...prev, user]);
      }
    });
  };

  // TODO(nickbar01234) - Handle click outside
  return (
    <div className="relative w-48">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-amber-red px-4 py-1.5"
        onClick={() => setDisplayDropdown(!displayDropdown)}
      >
        <span className="text-amber-red">Assign new student</span>
        <FontAwesomeIcon icon={faCaretDown} className="text-amber-red" />
      </div>
      {displayDropdown && (
        <div className="absolute z-50 mt-2 inline-block w-full rounded border border-amber-red bg-white p-4">
          <div className="flex min-h-[128px] flex-col justify-between gap-y-3">
            <div className="flex max-h-[128px] flex-col gap-y-3 overflow-y-auto">
              {students.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-1.5 text-amber-red"
                >
                  <button
                    className="flex h-4 w-4 items-center justify-center border-2 border-amber-red bg-white"
                    onClick={() => onCheck(user)}
                  >
                    {assigned.find((other) => other.id === user.id) !=
                      undefined && <FontAwesomeIcon icon={faCheck} size="xs" />}
                  </button>
                  <span className="overflow-hidden truncate">
                    {fullName(user)}
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
