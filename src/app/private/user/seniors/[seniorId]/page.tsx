import PathNav from "@components/PathNav";
import { DisplaySenior } from "@components/senior";
import { prisma } from "@server/db/client";
import { getServerSessionOrRedirect } from "@server/utils";

interface PageProps {
  params: {
    seniorId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getServerSessionOrRedirect();
  const senior = await prisma.senior.findUniqueOrThrow({
    where: {
      id: params.seniorId,
      StudentIDs: {
        has: session.user?.id,
      },
    },
    include: {
      chapter: {
        include: {
          students: true,
        },
      },
      Files: true,
    },
  });

  return (
    <div className="flex flex-col gap-y-6">
      <PathNav
        pathInfo={[
          {
            display: "Seniors",
            url: `seniors`,
          },
          {
            display: `${senior.firstname} ${senior.lastname}`,
            url: `seniors/${senior.id}`,
          },
        ]}
      />
      <DisplaySenior editable={false} canAddFile senior={senior} />
    </div>
  );
};

export default Page;
