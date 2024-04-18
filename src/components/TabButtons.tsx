"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

interface Query {
  segment: string;
  name: string;
}

interface TabButtonsProps {
  queries: Query[];
}

const TabButtons = ({ queries }: TabButtonsProps) => {
  const pathName = usePathname() ?? "";
  const urlSegment = useSelectedLayoutSegment();

  return (
    <div style={{ width: "fit-content" }}>
      <div className="flex gap-6">
        {queries.map(({ segment, name }, index) => {
          const isTabSelected =
            pathName.includes(segment) || (urlSegment === null && index === 0);

          const base = pathName.match(
            new RegExp(
              `.*?(?=${queries.map((q) => "/" + q.segment).join("|")}|$)`
            )
          ) as RegExpExecArray;
          const href = `${base[0]}/${segment}`;

          return (
            <div key={name}>
              <Link
                href={href}
                className={`text-xl uppercase ${
                  isTabSelected ? "text-dark-teal" : ""
                }`}
              >
                {name}
              </Link>
              {isTabSelected ? (
                <hr className="w-full border border-solid border-dark-teal" />
              ) : null}
            </div>
          );
        })}
      </div>
      <hr style={{ border: "0.5px solid black", width: "100%" }} />
    </div>
  );
};

export default TabButtons;
