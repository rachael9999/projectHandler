import Link from "next/link";
import Image from "next/image";
import { Poppins, Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

const textRobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transitiuon items-center gap-x-2 hidden md:flex">
        <Image src={"/logo.svg"} alt={"Logo"} height={30} width={30} />
        <p
          className={cn(
            "text-lg text-neutral-700 pb-1",
            textRobotoFont.className
          )}
        >
          Streamline
        </p>
      </div>
    </Link>
  );
};
