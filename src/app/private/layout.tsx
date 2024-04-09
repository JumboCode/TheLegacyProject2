import { RootNavigation } from "@components/navigation";
import UserProvider from "@context/UserProvider";
import { prisma } from "@server/db/client";
import { getServerSessionOrRedirect } from "@server/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSessionOrRedirect();
  const user = await prisma.user.findFirstOrThrow({
    where: { id: session.user?.id },
    include: {
      Chapter: true,
    },
  });

  return (
    <UserProvider user={user}>
      <RootNavigation>{children}</RootNavigation>
    </UserProvider>
  );
};

export default Layout;
