import { HeaderContainer } from "@components/container";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <HeaderContainer
      showHorizontalLine
      header="Members"
      headerIcon={faUserGroup}
    >
      {props.children}
    </HeaderContainer>
  );
};

export default Layout;
