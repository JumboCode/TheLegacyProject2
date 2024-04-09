import { ISideBar } from "@components/Sidebar";
import { CollapsibleSidebarContainer } from "@components/container";
import { faHome, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayout) => {
  const buttons: ISideBar["buttons"] = [
    {
      name: "Home",
      link: `/private/chapter-leader/home`,
      icon: faHome,
    },
    {
      name: "Members",
      link: `/private/chapter-leader/users`,
      icon: faUserGroup,
    },
    // @TODO(nickbar01234) - Fix icon
    {
      name: "Seniors",
      link: `/private/chapter-leader/seniors`,
      icon: faUserGroup,
    },
    {
      name: "Profile",
      link: `/private/chapter-leader/edit-profile`,
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
