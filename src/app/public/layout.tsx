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
        <div className="pb-[105px] pt-[88px] sm:px-[50px] md:px-[93px] xs:px-[30px]">
          {children} <LandingFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
