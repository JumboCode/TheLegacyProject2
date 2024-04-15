interface FileTileProps {
  children?: React.ReactNode;
  className?: string;
}

const FileTile = ({ children, className = "" }: FileTileProps) => {
  return <div className={`w-48 rounded-lg ${className} h-60`}>{children}</div>;
};

export default FileTile;
