import { HeaderContainer } from "@components/container";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <HeaderContainer showHorizontalLine header="Seniors" headerIcon={faUsers}>
      {props.children}
    </HeaderContainer>
  );
};

export default Layout;
