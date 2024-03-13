"use client";

import { Senior, User } from "@prisma/client";
import SearchableContainer from "./SearchableContainer";
import { UserTile, TileEdit } from "./TileGrid";
import AddSenior from "./AddSenior";
import { useContext, useState } from "react";
import { UserContext } from "@context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
      display={(senior) => {
        const options: Parameters<typeof TileEdit>[0]["options"] = [];

        options.push({
          name: "Edit",
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!setSeniorPatch || !setShowAddSeniorPopUp) {
              return;
            }
            setSeniorPatch(senior.id);
            setShowAddSeniorPopUp(true);
          },
          color: "#22555A",
          icon: <FontAwesomeIcon icon={faPencil} />,
        });

        options.push({
          name: "Delete",
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            fetch(`/api/senior/${senior.id}`, {
              method: "DELETE",
            }).then(() => {
              window.location.reload();
            });
          },
          color: "#EF6767",
          icon: <FontAwesomeIcon icon={faTrashCan} />,
        });
        return (
          // TODO(nickbar01234) - Fix link
          <UserTile
            senior={senior}
            link={`/private/${context.user.id}/chapter-leader/seniors/${senior.id}`}
            key={senior.id}
            dropdownComponent={<TileEdit options={options} />}
          />
        );
      }}
      search={(senior, key) =>
        (senior.firstname + " " + senior.lastname)
          .toLowerCase()
          .includes(key.toLowerCase())
      }
    />
  );
};
