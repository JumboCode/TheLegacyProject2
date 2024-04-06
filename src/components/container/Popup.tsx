interface PopupProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Popup = (props: PopupProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-[2px] backdrop-brightness-75">
      <div
        className={`flex h-48 w-[30rem] flex-col gap-y-6 rounded-[16px] bg-dark-teal px-6 py-9 ${
          props.className ?? ""
        }`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
