import Image from "next/legacy/image";

export default function Pending() {
  return (
    <main className="flex h-screen w-full flex-col place-items-center justify-center">
      <span className="relative opacity-60">
        <Image
          src="/landing/olive-branch.png"
          height={100}
          width={180}
          // TODO(nickbar01234) - Write a more descriptive alt
          alt="Olive branch"
        />
      </span>

      <div className="py-[10px]">
        <h1 className="pb-2 text-center text-2xl font-medium">
          Oh no! It looks like you don&apos;t have access to the Legacy Project
          yet.
        </h1>
        <h2 className="text-center text-lg">
          Your access to The Legacy Project is pending. Please follow-up with a
          club administrator for more details.
        </h2>
      </div>

      <span className="relative rotate-180 opacity-60">
        <Image
          src="/landing/olive-branch.png"
          height={100}
          width={180}
          // TODO(nickbar01234) - Write a more descriptive alt
          alt="Olive branch"
        />
      </span>
    </main>
  );
}
