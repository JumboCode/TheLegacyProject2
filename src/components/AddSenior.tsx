import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/legacy/image";
import cn from "classnames";
import FilterDropdown from "@components/FilterDropdown";
import { Senior, User } from "@prisma/client";

type AddSeniorProps = {
  seniors: Senior[];
  students: User[];
  setSeniors: Dispatch<SetStateAction<Senior[]>>;
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
  seniorPatch: string;
  setSeniorPatch: Dispatch<SetStateAction<string>>;
};

type AddSeniorTileProps = {
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
  setSeniorPatch: Dispatch<SetStateAction<string>>;
};

export const AddSeniorTile = ({
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
  setSeniorPatch,
}: AddSeniorTileProps) => {
  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
    setSeniorPatch("");
  };

  return (
    <button onClick={handlePopUp}>
      <div className="relative flex aspect-square w-auto flex-col items-center rounded bg-white font-medium drop-shadow-md hover:bg-off-white">
        <div className="flex h-1/2 flex-col justify-end">
          <Image
            className="object-scale-down"
            src={"/profile/addprofile_icon.png"}
            alt="Add profile image"
            height={75}
            width={75}
          />
        </div>
        <div className="relative flex h-1/2 w-full flex-col p-2 text-center text-lg font-medium">
          <span className="text-neutral-800 break-words px-2">
            Add New Senior
          </span>
        </div>
      </div>
    </button>
  );
};

const StudentSelector = ({
  students,
  selectedStudents,
  setSelectedStudents,
}: {
  students: User[];
  selectedStudents: User[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  return (
    <div>
      <div className="text-neutral-600 mb-1 h-[34px] w-full font-sans text-lg">
        Students
      </div>
      <FilterDropdown<User>
        items={students}
        filterMatch={(usr, term) => (usr.name ?? "").indexOf(term) != -1}
        display={(usr: User) => (
          <div className="m-1 whitespace-nowrap rounded bg-tan px-3 py-1">
            {usr.name}
          </div>
        )}
        selectedItems={selectedStudents}
        setSelectedItems={setSelectedStudents}
      />
    </div>
  );
};

type SeniorData = {
  name: string;
  location: string;
  description: string;
};

const AddSenior = ({
  seniors,
  students,
  setSeniors,
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
  seniorPatch,
  setSeniorPatch,
}: AddSeniorProps) => {
  const emptySenior: SeniorData = { name: "", location: "", description: "" };
  const [seniorData, setSeniorData] = useState<SeniorData>(emptySenior);
  const [selectedStudents, setSelectedStudents] = useState<User[]>([]);

  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
  };

  const handleConfirm = () => {
    handlePopUp();
    setConfirm(false);
    setError(false);
  };

  const updateSeniorStudents = async (seniorID: string) => {
    let currRes = await fetch("/api/senior/" + seniorID + "/students", {
      method: "GET",
      body: null,
    });

    if (currRes.status != 200) {
      return currRes;
    }

    const oldStudentsData = await currRes.json();
    const oldStudents = oldStudentsData["students"] as User[];

    const removedStudents = oldStudents.filter(
      (usr) => !selectedStudents.includes(usr, 0)
    );
    const newStudents = selectedStudents.filter(
      (usr) => !oldStudents.includes(usr, 0)
    );

    removedStudents.map(async (usr) => {
      // remove this Senior from Student
      currRes = await fetch("/api/student/" + usr.id, {
        method: "PATCH",
        body: JSON.stringify({
          SeniorIDs: usr.SeniorIDs.filter((id) => id != seniorID),
        }),
      });

      if (currRes.status != 200) {
        return currRes;
      }
      console.log("Removed " + usr.name + " from senior " + seniorID);
    });

    newStudents.map(async (usr) => {
      // add this Senior from Student
      currRes = await fetch("/api/student/" + usr.id, {
        method: "PATCH",
        body: JSON.stringify({
          SeniorIDs: [...usr.SeniorIDs, seniorID],
        }),
      });

      if (currRes.status != 200) {
        return currRes;
      }
      console.log("Added " + usr.name + " to senior " + seniorID);
    });

    return currRes;
  };

  const patchAddSenior = async () => {
    // put accumulated students into senior model data
    const seniorModel = {
      ...seniorData,
      StudentIDs: selectedStudents.map((usr) => usr.id),
    };

    // PATCH existing senior model in database
    let currRes = await fetch("/api/senior/" + seniorPatch, {
      method: "PATCH",
      body: JSON.stringify(seniorModel),
    });
    const newerSeniorObj = await currRes.json();

    if (currRes.status === 200) {
      // PATCH students models previously and newly associated with senior model
      currRes = await updateSeniorStudents(seniorPatch);

      if (currRes.status === 200) {
        setConfirm(true);
        const newSeniors = seniors.filter((i) => i.id !== newerSeniorObj.id);
        setSeniors([...newSeniors, newerSeniorObj]);
      }
    }
    // check after both API calls
    if (currRes.status != 200) {
      console.log(
        currRes.text().then((text) => {
          console.log(text);
        })
      );
      setError(true);
    }

    setSeniorData(emptySenior);
    setSeniorPatch(""); // empty string used as falsey value to indicate update or patch
  };

  const postAddSenior = async () => {
    // put accumulated students into senior model data
    const seniorModel = {
      ...seniorData,
      StudentIDs: selectedStudents.map((usr) => {
        console.log(usr.id);
        return usr.id;
      }),
    };

    // POST new senior model to database
    let currRes = await fetch("/api/seniors/add", {
      method: "POST",
      body: JSON.stringify(seniorModel),
    });
    const newSeniorObj = await currRes.json();

    if (currRes.status === 200) {
      // PATCH students models previously and newly associated with senior model
      currRes = await updateSeniorStudents(newSeniorObj.id);

      if (currRes.status === 200) {
        setConfirm(true);
        setSeniors([...seniors, newSeniorObj]);
      }
    }
    // check after both API calls
    if (currRes.status != 200) {
      console.log(
        currRes.text().then((text) => {
          console.log(text);
        })
      );
      setError(true);
    }

    setSeniorData(emptySenior);
    setSelectedStudents([]);
  };

  return (
    <>
      {showAddSeniorPopUp && (
        <div
          className="\ absolute left-0 top-0 z-50 flex h-screen w-screen flex-row items-center justify-center
                        text-left backdrop-blur-[2px] backdrop-brightness-75 md:w-full"
        >
          <div
            className={cn(
              "min-h-1/4 sticky flex flex-col justify-between rounded-lg bg-white p-10",
              confirm || error
                ? "top-[12.5%] w-2/5"
                : "top-[5%] sm:w-4/5 md:w-1/2"
            )}
          >
            {!confirm && !error ? (
              <>
                <div>
                  <div className="mb-8 font-serif text-3xl sm:text-center md:text-left">
                    {seniorPatch ? "Update" : "Add New"} Senior
                  </div>

                  <div className="text-neutral-600 mb-1 h-[34px] w-full font-sans text-lg">
                    {" "}
                    Name{" "}
                  </div>
                  <input
                    className="mb-5 h-[46px] w-full rounded border-2 border-solid border-tan px-3"
                    type="text"
                    value={seniorData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSeniorData({ ...seniorData, name: e.target.value })
                    }
                  />

                  <StudentSelector
                    students={students}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                  />

                  <div className="text-neutral-600 mb-1 h-[34px]  w-full font-sans text-lg">
                    {" "}
                    Location{" "}
                  </div>
                  <input
                    className="mb-5 h-[46px] w-full rounded border-2 border-solid border-tan px-3"
                    type="text"
                    value={seniorData.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSeniorData({ ...seniorData, location: e.target.value })
                    }
                  />

                  <div className="text-neutral-600 mb-1 h-[34px] w-full text-lg">
                    {" "}
                    Description{" "}
                  </div>
                  <textarea
                    className="mb-4 h-1/2 min-h-[46px] w-full rounded border-2 border-solid border-tan bg-off-white p-[12px] text-start text-base"
                    placeholder=""
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setSeniorData({
                        ...seniorData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex w-full flex-row justify-center">
                  <button
                    className="\ mx-2 my-4 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md
                                hover:bg-offer-white"
                    onClick={handlePopUp}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-legacy-teal \ mx-2 my-4 w-full max-w-[10rem] rounded p-3 text-lg font-normal text-white drop-shadow-md
                                hover:bg-dark-teal"
                    onClick={seniorPatch ? patchAddSenior : postAddSenior}
                  >
                    {seniorPatch ? "Update" : "Create"}
                  </button>
                </div>
              </>
            ) : (
              <>
                {confirm ? (
                  <div className="flex flex-col items-center">
                    <div className="mb-8 text-center font-serif text-3xl">
                      {seniorPatch ? "Updated" : "Added"} successfully!
                    </div>
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md hover:bg-offer-white"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center break-words">
                    <div className="mb-8 text-center font-serif text-xl">
                      There was an error adding your senior. Please reach out to
                      your club administrator for help.
                    </div>
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md hover:bg-offer-white"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <AddSeniorTile
        showAddSeniorPopUp={showAddSeniorPopUp}
        setShowAddSeniorPopUp={setShowAddSeniorPopUp}
        setSeniorPatch={setSeniorPatch}
      />
    </>
  );
};

export default AddSenior;
