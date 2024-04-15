import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHeaderContainer {
  children?: React.ReactNode;
  header: string;
  headerIcon: IconProp;
  showHorizontalLine: boolean;
}

const HeaderContainer = (props: IHeaderContainer) => {
  const { children, header, headerIcon, showHorizontalLine } = props;

  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center space-x-4">
        <FontAwesomeIcon className="h-6 w-6" icon={headerIcon} />
        <h1 className="text-xl text-black">{header}</h1>
      </div>
      {showHorizontalLine && (
        <hr className="mt-6 w-full border-t border-black" />
      )}
      <div className="py-6">{children}</div>
    </div>
  );
};

export default HeaderContainer;
