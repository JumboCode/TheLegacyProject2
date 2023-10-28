import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHeaderContainer {
  children: React.ReactNode;
  header: string;
  headerIcon: IconProp;
  showHorizontalLine: boolean;
}

const HeaderContainer = (props: IHeaderContainer) => {
  const { children, header, headerIcon, showHorizontalLine } = props;

  return (
    <div className="h-full w-full px-7 pt-[104px]">
      <div className="flex w-full space-x-4">
        <FontAwesomeIcon className="h-8 w-8" icon={headerIcon} />
        <h1 className="text-2xl text-black">{header}</h1>
      </div>
      {showHorizontalLine && (
        <hr className="mt-6 w-full border-t border-black" />
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default HeaderContainer;
