"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  const router = useRouter();
  const { data: session } = useSession();
  const legacySignIn = () => signIn("google", { callbackUrl: "/home" });
  const legacyHome = () => router.push("/home");
  const buttonAction = session && session.user ? legacyHome : legacySignIn;

  return (
    <nav
      className="\ top-0 z-10 z-10 flex h-[60px] w-full flex-row items-center 
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

        <button onClick={buttonAction}>
          <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
            {session && session.user ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import {
//   faHouse,
//   faUsers,
//   faUserGroup,
//   faUserPlus,
//   faCircleUser,
//   IconDefinition,
// } from "@fortawesome/free-solid-svg-icons";

// interface Button {
//   name: string;
//   color: string;
//   icon: IconDefinition;
// }

// const userLinks: Button[] = [
//   {
//     name: "Home",
//     color: "#000000",
//     icon: faHouse,
//   },
//   {
//     name: "Students",
//     color: "#000000",
//     icon: faUserGroup,
//   },
//   {
//     name: "Seniors",
//     color: "#000000",
//     icon: faUsers,
//   },
//   {
//     name: "Pending",
//     color: "#000000",
//     icon: faUserPlus,
//   },
//   {
//     name: "Profile",
//     color: "#000000",
//     icon: faCircleUser,
//   },
// ];

// export default function Navbar() {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const router = useRouter();
//   const { data: session } = useSession();
//   const legacySignIn = () => signIn("google", { callbackUrl: "/home" });
//   const legacyHome = () => router.push("/home");
//   const buttonAction = session && session.user ? legacyHome : legacySignIn;
//   return (
//     <div className="flex items-center justify-between border-b border-gray-400 py-8">
//       <div className="absolute-right justify-end pl-4 font-serif text-xl">
//         <Link href="/">The Legacy Project</Link>
//       </div>
//       <nav>
//         <section className="MOBILE-MENU flex lg:hidden">
//           <div
//             className="HAMBURGER-ICON space-y-2 px-12"
//             onClick={() => setIsNavOpen((prev) => !prev)}
//           >
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//           </div>

//           <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
//             <div
//               className="absolute left-0 top-0 px-8 py-8"
//               onClick={() => setIsNavOpen(false)}
//             >
//               <svg
//                 className="h-8 w-8 text-gray-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </div>
//             {userLinks.map((data) => (
//               <div key={data.name}>{data.name}</div>
//             ))}
//           </div>
//         </section>

//         <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
//           <div className="visible z-10 pr-[20px] sm:pr-[40px]">
//             <div
//               className={
//                 isNavOpen
//                   ? "absolute right-0 top-[60px] z-20 flex flex-col items-center gap-[20px] border-b border-l            border-r border-dark-tan bg-med-tan p-[20px] sm:hidden "
//                   : "align-center hidden flex-row gap-[20px] pr-[40px] sm:flex"
//               }
//             >
//               <Link href="/">
//                 <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
//                   About Us
//                 </div>
//               </Link>

//               <button onClick={buttonAction}>
//                 <div className="m-auto font-serif text-lg font-medium duration-150 hover:-translate-y-0.5">
//                   {session && session.user ? "Home" : "Sign In"}
//                 </div>
//               </button>
//             </div>
//           </div>
//         </ul>
//       </nav>
//       <style>{`
//       .hideMenuNav {
//         display: none;
//       }
//       .showMenuNav {
//         display: block;
//         position: absolute;
//         width: 30%;
//         height: 30vh;
//         top: 0;
//         left: 0;
//         background: white;
//         z-index: 10;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         align-items: center;
//       }
//     `}</style>
//     </div>
//   );
// }
