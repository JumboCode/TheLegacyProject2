import HeaderContainer from "@components/container/HeaderContainer";
import { faHouseLock } from "@fortawesome/free-solid-svg-icons";

interface IPendingChapters {
  children: React.ReactNode;
}

const PendingChaptersLayout = ({ children }: IPendingChapters) => {
  // @TODO - Figure out what icon to use
  return (
    <HeaderContainer
      header="Pending Chapters"
      headerIcon={faHouseLock}
      showHorizontalLine={true}
    >
      {children}
    </HeaderContainer>
  );
};

export default PendingChaptersLayout;
