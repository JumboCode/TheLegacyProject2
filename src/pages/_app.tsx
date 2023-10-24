import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (Component.displayName == "public") {
    return (
      <SessionProvider session={session}>
        <div className="flex h-full w-full flex-col items-center bg-tan">
          <Navbar displayName={Component.displayName} />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <div className="flex h-full w-full flex-col bg-tan md:flex-row">
          <span className="inline md:hidden">
            <Navbar displayName={Component.displayName ?? "private"} />
          </span>
          <span className="hidden md:inline">
            <Sidebar />
          </span>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  }
};

export default MyApp;
