import { MouseEventHandler } from "react";
import Link from "next/link";

type ButtonProps = {
  text: string;
  color: string;
  hover: string;
  action?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
};

const Button = ({ text, color, hover, action, link }: ButtonProps) => {
  if (link) {
    return (
      <Link href={link ?? "/"}>
        <button
          className={`h-[40px] w-auto ${color} rounded duration-150 ${hover} hover:-translate-y-0.5`}
        >
          <span className="align-center text-md m-[10px]  w-auto tracking-easy text-white">
            {text}
          </span>
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`h-[40px] w-auto ${color} rounded duration-150 ${hover} hover:-translate-y-0.5`}
        onClick={action ?? undefined}
      >
        <span className="align-center text-md m-[10px]  w-auto tracking-easy text-white">
          {text}
        </span>
      </button>
    );
  }
};

export default Button;
