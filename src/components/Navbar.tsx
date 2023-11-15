"use client";

import React, { useContext, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { UserContext } from "src/context/UserProvider";

const Navbar = ({ displayName }: { displayName: string }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  const router = useRouter();
  const userContext = useContext(UserContext);
  // const { data: session } = useSession();
  const legacySignIn = () => signIn("google", { callbackUrl: "/home" });
  const legacyHome = () => router.push("/home");
  /*session.user.role -> Admin -> router.push(/private/[uid]/admin/home) */
  const buttonAction =
    userContext.user.role === "ADMIN"
      ? () => router.push("/private/" + userContext.user.id + "/admin/home")
      : userContext.user.role === "CHAPTER_LEADER"
      ? () =>
          router.push(
            "/private/" + userContext.user.id + "/chapter-leader/home"
          )
      : userContext.user.role === "USER"
      ? () => router.push("/private/" + userContext.user.id + "/user/home")
      : legacySignIn;
  // const buttonAction = session && session.user ? legacyHome : legacySignIn;

  return (
    <nav
      className="\ top-0 z-10 z-10 flex h-[60px] w-full flex-row items-center 
                    justify-between border border-dark-tan bg-med-tan"
    >
      {/* Logo */}
      <div className="pl-[20px] font-serif text-xl font-medium sm:pl-[40px] md:text-2xl">
        <Link href="/">The Legacy Project</Link>
      </div>

      {/* Menu Option vs. Menu Close */}
      <div className="visible z-10 pr-[20px] sm:pr-[40px]">
        <span onClick={handleMenuClick}>
          {dropdownVisible ? (
            <svg
              className="h-8 w-8 text-darkest-tan sm:hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="17" y1="6" x2="6" y2="17" />
              <line x1="6" y1="6" x2="17" y2="17" />
            </svg>
          ) : (
            <svg
              className="visible h-8 w-8 text-darkest-tan sm:hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </span>
      </div>

      {/* Navbar Content */}
      <div
        className={
          dropdownVisible
            ? "absolute right-0 top-[60px] z-20 flex flex-col items-center gap-[20px] border-b border-l            border-r border-dark-tan bg-med-tan p-[20px] sm:hidden "
            : "align-center hidden flex-row gap-[20px] pr-[40px] sm:flex"
        }
      >
        <Link href="/">
          <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
            About Us
          </div>
        </Link>

        <button onClick={buttonAction}>
          <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
            {userContext.user.role ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
