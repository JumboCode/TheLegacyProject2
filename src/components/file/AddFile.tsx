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
          seniorId={"65e7815b307c8d1a518df8a8"}
          files={files}
          folder={"13LqDrrWNMXevAd4so-jaBxk_dUDIbend"}
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
