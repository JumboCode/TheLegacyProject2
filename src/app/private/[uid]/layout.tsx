import { authOptions } from "@api/auth/[...nextauth]/route";
import { RootNavigation } from "@components/navigation";
import UserProvider from "@context/UserProvider";
import { prisma } from "@server/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  try {
    if (session == null) {
      throw new Error();
    }

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
  } catch {
    redirect("/public");
  }
};

export default Layout;
