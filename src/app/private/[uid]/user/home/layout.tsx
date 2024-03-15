import { prisma } from "@server/db/client";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: React.ReactNode;
  joinChapter: React.ReactNode;
  params: {
    uid: string;
  };
}

const Layout = async ({ children, params, joinChapter }: LayoutProps) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });

  if (user.ChapterID != null) {
    return (
      <HeaderContainer
        header="Home"
        headerIcon={faHouse}
        showHorizontalLine={false}
      >
        {children}
      </HeaderContainer>
    );
  } else {
    return joinChapter;
  }
};

export default Layout;
