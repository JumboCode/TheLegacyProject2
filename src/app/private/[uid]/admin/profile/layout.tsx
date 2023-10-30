import { HeaderContainer } from "@components/container/index";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IProfileLayout {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: IProfileLayout) => {
  return (
    <HeaderContainer
      header="Profile"
      headerIcon={faUser}
      showHorizontalLine={true}
    >
      {children}
    </HeaderContainer>
  );
};

export default ProfileLayout;
