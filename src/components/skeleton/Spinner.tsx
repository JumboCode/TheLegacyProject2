interface SpinnerProps {
  height?: number;
  width?: number;
}

const Spinner = ({ height = 20, width = 20 }: SpinnerProps) => {
  // @TODO - Talk to Fa about spinner style
  return (
    <svg
      className={`h-${height} w-${width} animate-spin rounded-full border-8 border-gray-300 border-t-dark-teal`}
      viewBox="0 0 24 24"
    />
  );
};

export default Spinner;
