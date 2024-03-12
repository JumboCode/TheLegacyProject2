import PathNav from "@components/PathNav";
import SearchableContainer from "@components/SearchableContainer";
import { prisma } from "@server/db/client";
import { fullName } from "@utils";

interface PageProps {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { userId } = params;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      Seniors: true,
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Members", url: "users" },
          { display: fullName(user), url: `users/${user.id}` },
        ]}
      />
    </div>
  );
};

export default Page;
