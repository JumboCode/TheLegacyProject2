"use client";

import { Senior, User } from "@prisma/client";
import SearchableContainer from "./SearchableContainer";
import { UserTile } from "./TileGrid";
import AddSenior from "./AddSenior";
import { useContext, useState } from "react";
import { UserContext } from "@context/UserProvider";

type SeniorViewProps = {
  seniors: Senior[];
  students: User[];
};

export const SeniorView = ({ seniors, students }: SeniorViewProps) => {
  const context = useContext(UserContext);
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
        <UserTile
          senior={senior}
          link={`/private/${context.user.id}/chapter-leader/seniors/${senior.id}`}
          key={senior.id}
        />
      )}
      search={(senior, key) =>
        (senior.firstname + " " + senior.lastname)
          .toLowerCase()
          .includes(key.toLowerCase())
      }
    />
  );
};
