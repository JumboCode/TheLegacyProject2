import Link from "next/link";
import Image from "next/legacy/image";
import { signOut } from "next-auth/react";

const SidebarItem = ({ label }: { label: string }) => {
  return (
    <div className="text-md w-full p-2 px-4 text-left font-serif duration-150 hover:bg-darker-tan">
      <div className="duration-150 hover:translate-x-1">{label}</div>
    </div>
  );
};

const Sidebar = ({ displayName }: { displayName: string }) => {
  return (
    <div
      className="\ top-0 flex h-screen w-[160px] flex-col justify-start gap-20
                    border-r border-darker-tan bg-med-tan py-12"
    >
      <div className="flex flex-col place-items-center p-4">
        <Link href="/">
          <h1 className="z-10 text-center font-serif text-2xl duration-150 hover:-translate-y-0.5">
            The Legacy Project
          </h1>
        </Link>

        <span className="absolute left-3 top-[48px] aspect-square h-[60px] rotate-45 opacity-60">
          <Image
            src="/landing/pink-flower.png"
            layout="fill"
            objectFit="cover"
            // TODO(nickbar01234) - Write a more descriptive alt
            alt="Pink flower"
          />
        </span>

        <span className="absolute left-[88px] top-[70px] aspect-square h-[60px] opacity-40">
          <Image
            src="/landing/yellow-flower.png"
            layout="fill"
            objectFit="cover"
            // TODO(nickbar01234) - Write a more descriptive alt
            alt="Yellow flower"
          />
        </span>
      </div>

      <div className="flex w-full flex-col border border-darker-tan bg-dark-tan">
        {/* TODO(nickbar01234) - Point this to something... */}
        <Link href="/home">
          <SidebarItem label="Home" />
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <SidebarItem label="Sign Out" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
