import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@components/Navbar";
import Sidebar, { ISideBar } from "@components/Sidebar";
import UserProvider from "src/context/UserProvider";
import {
  faCircleUser,
  faHouse,
  faUserGroup,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const BUTTONS: ISideBar["buttons"] = [
  {
    name: "Home",
    icon: faHouse,
    link: "/public/",
  },
  {
    name: "Students",
    icon: faUserGroup,
    link: "",
  },
  {
    name: "Seniors",
    icon: faUsers,
    link: "",
  },
  {
    name: "Pending",
    icon: faUserPlus,
    link: "",
  },
  {
    name: "Profile",
    icon: faCircleUser,
    link: "",
  },
];

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (Component.displayName == "public") {
    return (
      <SessionProvider session={session}>
        <div className="flex h-full w-full flex-col items-center bg-tan">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <UserProvider user={{} as any}>
          <div className="flex flex-col bg-tan md:flex-row">
            <div className="grid grid-cols-12">
              <div className="col-span-2">
                <Sidebar buttons={BUTTONS} />
              </div>
              <div className="col-span-10">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </UserProvider>
      </SessionProvider>
    );
  }
};

export default MyApp;
