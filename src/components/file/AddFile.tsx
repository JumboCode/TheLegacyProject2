import FileTile from "@components/file/FileTile";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddFilePopup from "@components/user/AddFile";
import { File as PrismaFile, Prisma } from "@prisma/client";

const AddFile = (files: PrismaFile[]) => {
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
          seniorId={"65d6a19f5b3cabcd18dbe3b1"}
          files={files}
          folder={"1d9z-eV5eTCOdiWP_dhIx5-O5NA82lC1_"}
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
