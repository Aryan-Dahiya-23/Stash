import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StashIcon from "../../public/assets/stash-logo.png";
import StashText from "../../public/assets/stash-text.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 px-5 py-16">
      <Image src={StashIcon} width={95} height={130} alt="Stash Icon" />
      <Image
        width={160}
        height={20}
        className="mt-7 ml-2"
        src={StashText}
        alt="Stash Text"
      />

      <span className="text-center px-4 text-[16px]">
        To get started, create a new wallet or import an existing one.
      </span>

      <div className="w-full flex flex-col space-y-4 px-4">
        <Button
          asChild
          className="rounded-xl py-6 bg-[#6782B1] text-sm font-semibold text-white transition duration-300 ease-in-out bg-[#0a1527e3] hover:bg-[#0c192ed5]"
        >
          <Link href="/create">Create a wallet</Link>
        </Button>

        <Button
          asChild
          className="rounded-xl py-6 text-sm font-semibold text-white transition duration-300 ease-in-out bg-[#405983] hover:bg-[#5c749e]"
        >
          <Link href="/import">I already have a wallet</Link>
        </Button>
      </div>
    </div>
  );
}
