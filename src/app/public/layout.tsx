import Navbar from "@components/Navbar";
import { Footer } from "@components/Layout";
import LandingFooter from "@components/LandingFooter";

interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: IPublicLayout) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Navbar />
        <div className="px-[93px] pb-[105px] pt-[88px]">
          {children} <LandingFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
