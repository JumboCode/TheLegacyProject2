"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useAuth } from "@hooks";
import logoicon from "../../public/landing/newlegacy-logo.svg";
import Image from "next/image";

const NAV_ITEMS = [
  {
    name: "About Us",
    href: "/public/about",
  },
  {
    name: "Meet TLP",
    href: "/public/team",
  },
  {
    name: "Start a Chapter",
    href: "/public/start-chapter",
  },
];

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  const { status, onSignIn } = useAuth();
  useEffect(() => {
    const dropdownonResize = () => {
      if (window.innerWidth > 950) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("resize", dropdownonResize);

    return () => {
      window.removeEventListener("resize", dropdownonResize);
    };
  }, []);

  return (
    <nav className="top-0 z-10 flex h-[60px] w-full flex-row items-center justify-between border border-dark-tan bg-med-tan px-[30px]  py-3 sm:px-[50px] md:px-[93px]">
      <Link href="/public" onClick={() => setDropdownVisible(false)}>
        <Image src={logoicon} alt="Legacy Logo" className="w-[200px]" />
      </Link>

      <div className="visible z-10">
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
        {NAV_ITEMS.map(({ name, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setDropdownVisible(false)}
          >
            <div className="m-auto font-bold text-dark-teal duration-150 hover:-translate-y-0.5">
              {name}
            </div>
          </Link>
        ))}

        <button onClick={onSignIn}>
          <div className=" m-auto font-bold text-dark-teal duration-150 hover:-translate-y-0.5">
            {status === "authenticated" ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
