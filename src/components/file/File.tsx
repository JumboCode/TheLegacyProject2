import { File } from "@prisma/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { formatFileDate } from "@utils";
import FileTile from "./FileTile";

interface FileProps {
  file: File;
}
const File = ({ file }: FileProps) => {
  const { url, Tags } = file;

  return (
    <FileTile className="bg-dark-teal">
      <Link href={url}>
        <div className="flex flex-col items-start gap-y-2.5 px-4 py-6">
          <FontAwesomeIcon icon={faFile} color="white" size="xl" />
          <h1 className="text-lg text-white">{formatFileDate(file.date)}</h1>
          {Tags.map((tag, idx) => (
            <div
              key={idx}
              className="w-full overflow-hidden truncate rounded-lg bg-[#F5F0EA] py-[3px] pl-2.5 text-sm text-dark-teal"
            >
              {tag}
            </div>
          ))}
        </div>
      </Link>
    </FileTile>
  );
};

export default File;
