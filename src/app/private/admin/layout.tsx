import { ISideBar } from "@components/Sidebar";
import { CollapsibleSidebarContainer } from "@components/container";
import {
  faEnvelope,
  faHome,
  faHouseLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface IAdminLayout {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  const buttons: ISideBar["buttons"] = [
    {
      name: "Home",
      link: `/private/admin/home`,
      icon: faHome,
    },
    {
      name: "Pending",
      link: `/private/admin/pending-chapters`,
      icon: faHouseLock,
    },
    {
      name: "E-list",
      link: `/private/admin/elist`,
      icon: faEnvelope,
    },
    {
      name: "Profile",
      link: `/private/admin/edit-profile`,
      icon: faUser,
    },
  ];

  return (
    <CollapsibleSidebarContainer buttons={buttons}>
      {children}
    </CollapsibleSidebarContainer>
  );
};

export default AdminLayout;
