import TabButtons from "@components/TabButtons";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <HeaderContainer
      header="Home"
      headerIcon={faHouse}
      showHorizontalLine={false}
    >
      <div className="flex flex-col gap-y-6">
        <TabButtons
          queries={[
            { segment: "home", name: "My Chapter" },
            { segment: "home/resources", name: "resources" },
          ]}
        />
        {children}
      </div>
    </HeaderContainer>
  );
};

export default Layout;
