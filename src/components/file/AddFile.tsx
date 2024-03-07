import FileTile from "@components/file/FileTile";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddFile = () => {
  return (
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
  );
};

export default AddFile;
