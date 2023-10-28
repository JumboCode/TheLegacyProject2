import Navbar from "@components/Navbar";

interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: IPublicLayout) => {
  return (
    <>
      <Navbar displayName="public" />
      {children}
    </>
  );
};

export default PublicLayout;
