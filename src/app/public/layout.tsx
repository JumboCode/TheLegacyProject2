import Navbar from "@components/Navbar";

interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: IPublicLayout) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PublicLayout;
