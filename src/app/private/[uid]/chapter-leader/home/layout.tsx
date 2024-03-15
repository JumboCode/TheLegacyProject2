import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <HeaderContainer header="Home" headerIcon={faHouse} showHorizontalLine>
      {children}
    </HeaderContainer>
  );
};

export default Layout;
