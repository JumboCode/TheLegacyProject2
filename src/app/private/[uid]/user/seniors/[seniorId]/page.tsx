import { DisplaySenior } from "@components/senior";
import { prisma } from "@server/db/client";

interface PageProps {
  params: {
    uid: string;
    seniorId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const senior = await prisma.senior.findUniqueOrThrow({
    where: {
      id: params.seniorId,
      StudentIDs: {
        has: params.uid,
      },
    },
    include: {
      Students: true,
      Files: true,
    },
  });

  return <DisplaySenior editable={false} senior={senior} />;
};

export default Page;
