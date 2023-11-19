import { HeaderContainer } from "@components/container/index";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IEditProfileLayout {
  children: React.ReactNode;
}

const EditProfileLayout = ({ children }: IEditProfileLayout) => {
  return (
    <HeaderContainer
      header="Edit Profile"
      headerIcon={faUser}
      showHorizontalLine={true}
    >
      {children}
    </HeaderContainer>
  );
};

export default EditProfileLayout;
