import UserProvider from "src/context/UserProvider";

interface IPrivateLayout {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: IPrivateLayout) => {
  return <UserProvider>{children}</UserProvider>;
};

export default PrivateLayout;
