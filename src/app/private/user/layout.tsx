import { ISideBar } from "@components/Sidebar";
import { CollapsibleSidebarContainer } from "@components/container";
import { faHome, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "src/context/UserProvider";

interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayout) => {
  const buttons: ISideBar["buttons"] = [
    {
      name: "Home",
      link: `/private/user/home`,
      icon: faHome,
    },
    {
      name: "Seniors",
      link: `/private/user/seniors`,
      icon: faUsers,
    },
    {
      name: "Profile",
      link: `/private/user/edit-profile`,
      icon: faUser,
    },
  ];

  return (
    <CollapsibleSidebarContainer buttons={buttons}>
      {children}
    </CollapsibleSidebarContainer>
  );
};

export default UserLayout;
