import { HeaderContainer } from "@components/container";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <HeaderContainer header="Seniors" showHorizontalLine headerIcon={faUsers}>
      {children}
    </HeaderContainer>
  );
};

export default Layout;
