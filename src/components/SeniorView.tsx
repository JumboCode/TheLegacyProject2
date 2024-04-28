"use client";

import { Senior, User } from "@prisma/client";
import SearchableContainer from "./SearchableContainer";
import { UserTile, TileEdit } from "./TileGrid";
import AddSenior from "./AddSenior";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useApiThrottle } from "@hooks";
import { deleteSenior } from "@api/senior/[id]/route.client";
import { Spinner } from "./skeleton";
import { seniorFullName } from "@utils";

type SeniorViewProps = {
  seniors: Senior[];
  students: User[];
};

export const SeniorView = ({ seniors, students }: SeniorViewProps) => {
  const [seniorsState, setSeniorsState] = useState(seniors);
  const [showAddSeniorPopUp, setShowAddSeniorPopUp] = useState(false);
  const [seniorPatch, setSeniorPatch] = useState("");

  const years = [
    ...new Set(seniors.map((senior) => senior.dateCreated.getFullYear())),
  ]
    .sort()
    .reverse();

  const [yearsClicked, setYearsClicked] = useState<number[]>([]);

  const [deleteSeniorId, setDeleteSeniorId] = React.useState("");

  const { fn: throttleDeleteSenior, fetching } = useApiThrottle({
    fn: deleteSenior,
    callback: (res) => {
      setDeleteSeniorId("");
      if (res.code === "SUCCESS") {
        setSeniorsState((seniors) =>
          seniors.filter((senior) => senior.id !== res.seniorId)
        );
      } else {
        // Caught by error.tsx
        throw new Error("Fail to delete senior");
      }
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-row items-center justify-between">
        <div className="text-2xl">Seniors {`(${seniors.length})`}</div>
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
      </div>
      <SearchableContainer<Senior>
        elements={seniorsState.filter((senior) =>
          yearsClicked.length === 0
            ? true
            : yearsClicked.includes(senior.dateCreated.getFullYear())
        )}
        display={(senior) => {
          const options: Parameters<typeof TileEdit>[0]["options"] = [];

          options.push({
            name: "Edit",
            onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
              setSeniorPatch(senior.id);
              setShowAddSeniorPopUp(true);
            },
            color: "#22555A",
            icon: <FontAwesomeIcon icon={faPencil} />,
          });

          options.push({
            name: "Delete",
            onClick: () => {
              setDeleteSeniorId(senior.id);
              throttleDeleteSenior({ seniorId: senior.id });
            },
            color: "#EF6767",
            icon: <FontAwesomeIcon icon={faTrashCan} />,
          });
          return (
            // TODO(nickbar01234) - Fix link
            <UserTile
              senior={senior}
              link={`/private/chapter-leader/seniors/${senior.id}`}
              key={senior.id}
              dropdownComponent={
                fetching && senior.id === deleteSeniorId ? (
                  <Spinner width={12} height={12} />
                ) : !fetching ? (
                  <TileEdit options={options} />
                ) : null
              }
            />
          );
        }}
        search={(senior, key) =>
          seniorFullName(senior).toLowerCase().includes(key.toLowerCase())
        }
        filterField={
          <div className="mb-6 flex flex-row gap-4">
            {years.map((year, key) => (
              <div
                key={key}
                className={
                  (yearsClicked.includes(year)
                    ? "bg-[#AE583C] text-white"
                    : "text-[#AE583C]") +
                  " cursor-pointer rounded-3xl border-2 border-[#AE583C] px-3 py-1"
                }
                onClick={() =>
                  setYearsClicked((oldYears) => {
                    if (!oldYears.includes(year)) {
                      return [...oldYears, year];
                    }
                    return oldYears.filter((currYear) => currYear !== year);
                  })
                }
              >
                {year}
              </div>
            ))}
          </div>
        }
      />
    </>
  );
};
