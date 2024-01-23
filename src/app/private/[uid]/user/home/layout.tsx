import { prisma } from "@server/db/client";
import TabButtons from "@components/TabButtons";
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
        <TabButtons
          queries={[
            { segment: "home", name: "My Chapter" },
            { segment: "home/resources", name: "resources" },
          ]}
        />
        {children}
      </HeaderContainer>
    );
  } else {
    return joinChapter;
  }
};

export default Layout;
