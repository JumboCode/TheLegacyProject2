"use client";

import { TileEdit, UserTile } from "@components/TileGrid";
import SearchableContainer from "@components/SearchableContainer";
import { User } from "@prisma/client";
import { useState } from "react";
import { editPosition } from "@api/user/[uid]/edit-position/route.client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "@components/selector";
import { Popup } from "@components/container";
import { useRouter } from "next/navigation";
import { sortedStudents } from "@utils";
import { useApiThrottle } from "@hooks";

type MembersHomePageProps = {
  members: User[];
};

const EBOARD_POSITIONS = [
  "Social Coordinator",
  "Outreach Coordinator",
  "Head of Media",
  "Secretary",
  "Treasurer",
  "Match Coordinator",
].map((position, idx) => ({ id: idx.toString(), position: position }));

const MembersHomePage = ({ members }: MembersHomePageProps) => {
  const [uidToEdit, setUidToEdit] = useState<null | string>(null);
  const [selectedPosition, setSelectedPosition] = useState<
    typeof EBOARD_POSITIONS
  >([]);
  const router = useRouter();

  const resetAssignment = () => {
    setUidToEdit(null);
    setSelectedPosition([]);
  };

  const { fn: throttleEditPosition } = useApiThrottle({
    fn: editPosition,
    callback: () => {
      resetAssignment();
      router.refresh();
    },
  });

  const displayMembers = (elem: User, index: number) => (
    <UserTile
      key={elem.id}
      student={elem}
      link={`/private/chapter-leader/users/${elem.id}`}
      dropdownComponent={
        <TileEdit
          options={[
            {
              name: "Edit role",
              onClick: (e) => {
                e.stopPropagation();
                setUidToEdit(elem.id);
                setSelectedPosition(
                  EBOARD_POSITIONS.filter(
                    (position) => position.position === elem.position
                  )
                );
              },
              icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
              color: "#22555A",
            },
          ]}
        />
      }
    />
  );

  return (
    <div onClick={resetAssignment}>
      <h1 className="font-merriweather pb-6 text-3xl">
        {`Members (${members.length})`}
      </h1>
      {uidToEdit != null && (
        <Popup onClick={(e) => e.stopPropagation()}>
          <div className="text-3xl font-bold text-white">Assign to E-board</div>
          <Dropdown
            header="Select position"
            elements={EBOARD_POSITIONS}
            display={(element) => <>{element.position}</>}
            selected={selectedPosition}
            setSelected={setSelectedPosition}
            onSave={async () =>
              await throttleEditPosition(
                { body: { position: selectedPosition[0]?.position ?? "" } },
                uidToEdit
              )
            }
            multipleChoice={false}
          />
        </Popup>
      )}
      <SearchableContainer
        display={displayMembers}
        elements={sortedStudents(members)}
        emptyNode={
          <h1 className="text-2xl font-light text-[#000022]">
            This chapter has no members.
          </h1>
        }
        search={(member: User, filter: string) =>
          (member.firstName + " " + member.lastName)
            .toLowerCase()
            .includes(filter.toLowerCase())
        }
      />
    </div>
  );
};

export default MembersHomePage;
