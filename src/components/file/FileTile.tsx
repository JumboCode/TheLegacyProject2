interface FileTileProps {
  children?: React.ReactNode;
  className?: string;
}

const FileTile = ({ children, className = "" }: FileTileProps) => {
  return <div className={`h-56 w-48 rounded-lg ${className}`}>{children}</div>;
};

export default FileTile;
