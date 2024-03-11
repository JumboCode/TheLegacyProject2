"use client";

import { Senior, User } from "@prisma/client";
import SearchableContainer from "./SearchableContainer";
import { UserTile } from "./TileGrid";
import AddSenior from "./AddSenior";
import { useState } from "react";

type SeniorViewProps = {
  seniors: Senior[];
  students: User[];
};

export const SeniorView = ({ seniors, students }: SeniorViewProps) => {
  const [seniorsState, setSeniorsState] = useState(seniors);
  const [showAddSeniorPopUp, setShowAddSeniorPopUp] = useState(false);
  const [seniorPatch, setSeniorPatch] = useState("");

  return (
    <SearchableContainer<Senior>
      addElementComponent={
        <AddSenior
          key="add-senior"
          seniors={seniorsState}
          students={students}
          setSeniors={setSeniorsState}
          showAddSeniorPopUp={showAddSeniorPopUp}
          setShowAddSeniorPopUp={setShowAddSeniorPopUp}
          seniorPatch={seniorPatch}
          setSeniorPatch={setSeniorPatch}
        />
      }
      elements={seniorsState ? seniorsState : []}
      display={(senior, index) => (
        // TODO(nickbar01234) - Fix link
        <UserTile senior={senior} link="bleh" key={senior.id} />
      )}
      search={(senior, key) =>
        (senior.firstname + " " + senior.lastname)
          .toLowerCase()
          .includes(key.toLowerCase())
      }
    />
  );
};
