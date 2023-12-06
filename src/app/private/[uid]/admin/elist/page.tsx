import CSVSaveButton from "@components/CSVSaveButton";
import { HeaderContainer } from "@components/container";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Email } from "@prisma/client";
import { prisma } from "@server/db/client";

const ElistPage = async () => {
  const elistData = await prisma.email.findMany();

  const chunkArray = (arr: Email[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  const columns = chunkArray(elistData, 20);

  return (
    <HeaderContainer
      header="E-list"
      headerIcon={faEnvelope}
      showHorizontalLine={true}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="mb-5 text-xl font-bold">Total ({elistData.length})</div>
        <CSVSaveButton
          csvContent={
            "data:text/csv;charset=utf-8," +
            [["Email"], ...elistData.map((elistEmail) => [elistEmail.email])]
              .map((row) => row.join(","))
              .join("\n")
          }
        />
      </div>
      <div className="mb-10 grid grid-cols-3 gap-y-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex}>
            {column.map((elistEmail, index) => (
              <div key={index} className="mb-1 underline">
                {elistEmail.email}
              </div>
            ))}
          </div>
        ))}
      </div>
    </HeaderContainer>
  );
};

export default ElistPage;
