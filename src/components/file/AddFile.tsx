"use client";

import FileTile from "@components/file/FileTile";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddFilePopup from "@components/user/AddFile";
import { File as PrismaFile } from "@prisma/client";

const AddFile = ({
  seniorId,
  seniorFolder,
  files,
}: {
  seniorId: string;
  seniorFolder: string;
  files: PrismaFile[];
}) => {
  const [showAddFilePopUp, setShowAddFilePopUp] = useState<boolean>(false);

  const handlePopUp = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  return (
    <div>
      {showAddFilePopUp ? (
        <AddFilePopup
          showAddFilePopUp={showAddFilePopUp}
          setShowAddFilePopUp={setShowAddFilePopUp}
          seniorId={seniorId}
          files={files}
          folder={seniorFolder}
        />
      ) : null}
      <button onClick={handlePopUp}>
        <FileTile className="border-2 border-dark-teal">
          <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2.5">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              className="text-dark-teal"
              size="xl"
            />
            <h1 className="text-lg text-dark-teal">New File</h1>
          </div>
        </FileTile>
      </button>
    </div>
  );
};

export default AddFile;
