interface SpinnerProps {
  height?: number;
  width?: number;
}

const Spinner = ({ height = 24, width = 24 }: SpinnerProps) => {
  // @TODO - Talk to Fa about spinner style
  return (
    <div className={`h-fit p-2`}>
      <svg
        className={`h-${height} w-${width} animate-spin rounded-full border-8 border-gray-300 border-t-dark-teal`}
        viewBox="0 0 24 24"
      />
    </div>
  );
};

export default Spinner;
