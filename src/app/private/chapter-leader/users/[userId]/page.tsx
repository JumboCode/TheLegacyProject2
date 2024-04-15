import PathNav from "@components/PathNav";
import DisplayUserSenior from "@components/user/DisplayUserSeniors";
import { prisma } from "@server/db/client";
import { fullName } from "@utils";

interface Params {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: Params) => {
  const { userId } = params;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      Chapter: {
        include: {
          seniors: true,
        },
      },
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
      <DisplayUserSenior editable={true} currentUser={user} />
    </div>
  );
};

export default Page;
