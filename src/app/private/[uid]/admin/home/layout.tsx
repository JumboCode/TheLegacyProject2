import HeaderContainer from "@components/container/HeaderContainer";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface IAdminHomeLayout {
  children: React.ReactNode;
}

const AdminHomeLayout = ({ children }: IAdminHomeLayout) => {
  return (
    <HeaderContainer
      header="Home"
      headerIcon={faHouse}
      showHorizontalLine={false}
    >
      {children}
    </HeaderContainer>
  );
};

export default AdminHomeLayout;
