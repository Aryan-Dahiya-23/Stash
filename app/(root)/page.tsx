import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import stash from "../../public/assets/solana-logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 px-5 py-16">
      <Image src={stash} width={175} height={175} alt="Picture of the Icon" />

      <span className="text-center px-4 text-[16px]">
        To get started, create a new wallet or import an existing one.
      </span>

      <div className="w-full flex flex-col space-y-4 px-4">
        <Button
          asChild
          className="rounded-xl py-6 bg-[#6782B1] text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-[#5c749e]"
        >
          <Link href="/create">Create a wallet</Link>
        </Button>

        <Button
          asChild
          className="rounded-xl py-6 bg-[#0A1527] text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-[#0c192e]"
        >
          <Link href="/import">I already have a wallet</Link>
        </Button>
      </div>
    </div>
  );
}
