"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useAuth } from "@hooks";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };
  const { status, onSignIn } = useAuth();

  return (
    <nav
      className="top-0 z-10 flex h-[60px] w-full flex-row items-center 
                    justify-between border border-dark-tan bg-med-tan"
    >
      <div className="pl-[20px] font-serif text-xl font-medium sm:pl-[40px] md:text-2xl">
        <Link href="/">The Legacy Project</Link>
      </div>

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

        <button onClick={onSignIn}>
          <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
            {status === "authenticated" ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
