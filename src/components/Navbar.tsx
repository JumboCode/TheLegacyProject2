"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import logoicon from "../../public/landing/newlegacy-logo.svg";
import Image from "next/image";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  const router = useRouter();
  const { data: session } = useSession();
  const legacySignIn = () => signIn("google", { callbackUrl: "/home" });
  const legacyHome = () => router.push("/home");

  const buttonAction = () => {
    session && session.user ? legacyHome : legacySignIn
  }


  return (
    <nav
      className="\ top-0 z-10 flex h-[60px] w-full flex-row items-center 
                    justify-between border border-dark-tan bg-med-tan px-24 py-2 pt-3"
    >
      <Link href="/public" onClick={() => setDropdownVisible(false)}>

        <Image src={logoicon} alt="Legacy Logo" className="w-[200px]" />
      </Link>

      <div className="visible z-10 pr-[20px] sm:pr-[40px]">
        <span onClick={handleMenuClick}>
          {dropdownVisible ? (
            <svg
              className="h-8 w-8 text-darkest-tan md2:hidden"
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
              className="visible h-8 w-8 text-darkest-tan md2:hidden"
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

      <div
        className={
          dropdownVisible
            ? "absolute right-0 top-[60px] z-20 flex flex-col items-center gap-[20px] border-b border-l border-r border-dark-tan bg-med-tan p-[20px] md2:hidden "
            : "align-center hidden flex-row gap-[30px] pr-[40px] md2:flex"
        }
      >
        <Link href="/public/team" onClick={() => setDropdownVisible(false)}>
          <div className="font-merriweather m-auto font-black text-dark-teal duration-150 hover:-translate-y-0.5 sm:text-sm md:text-lg">
            Meet TLP
          </div>
        </Link>

        <Link href="/public/about" onClick={() => setDropdownVisible(false)}>
          <div className="font-merriweather m-auto font-black text-dark-teal duration-150 hover:-translate-y-0.5 sm:text-sm md:text-lg">
            Our Story
          </div>
        </Link>

        <Link
          href="/public/start-chapter"
          onClick={() => setDropdownVisible(false)}
        >
          <div className="font-merriweather m-auto font-black text-dark-teal duration-150 hover:-translate-y-0.5 sm:text-sm md:text-lg">
            Start a Chapter
          </div>
        </Link>

        <button onClick={buttonAction}>
          <div className="font-merriweather m-auto font-black text-dark-teal duration-150 hover:-translate-y-0.5 sm:text-sm md:text-lg">
            {session && session.user ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
