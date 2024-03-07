import Image from "next/legacy/image";

interface FlowerBoxProps {
  children: React.ReactNode;
}

const FlowerBox = ({ children }: FlowerBoxProps) => {
  return (
    <div
      className="\ relative z-10 mt-[40px] flex flex-col content-center overflow-hidden border border-dark-tan
                      bg-med-tan p-[20px] text-center sm:p-[40px] md:mx-[40px]"
    >
      <span className="z-10 flex flex-col gap-[20px]">{children}</span>

      <span className="absolute -left-10 -top-6 aspect-square h-[140px] rotate-45 opacity-60">
        <Image
          src="/landing/pink-flower.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower top left frame"
        />
      </span>
      <span className="absolute -bottom-12 -left-16 aspect-square h-[200px] -rotate-45 opacity-40">
        <Image
          src="/landing/olive-branch.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower bottom left frame"
        />
      </span>
      <span className="absolute -right-14 -top-8 aspect-square h-[200px] -rotate-12 opacity-60">
        <Image
          src="/landing/pink-stem.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower top right frame"
        />
      </span>
      <span className="absolute -bottom-8 -right-12 aspect-square h-[140px] opacity-40">
        <Image
          src="/landing/yellow-flower.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower bottom right frame"
        />
      </span>
    </div>
  );
};

export default FlowerBox;
