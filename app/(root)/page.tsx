import { Button } from "@/components/ui/button";
import Image from "next/image";
import stash from "../../public/assets/newlogo.png";
import { Instrument_Sans } from "@next/font/google";
import Link from "next/link";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <div
      className={` ${instrumentSans.className}  flex flex-col justify-center items-center h-full`}
    >
      <div className="flex flex-col justify-center items-center space-y-4 mt-20">
        <Image
          src={stash}
          alt="Picture of the Icon"
          height={200}
          width={200}
          className="rounded-3xl"
        />
        <p className="text-3xl text-center text-[#e3ff73]">Stash Wallet</p>
      </div>

      <p className="text-lg text-center mt-16">Secure, Seamless, and Yours.</p>

      <div className="flex flex-col space-y-4 mt-16">
        <Button
          asChild
          className="rounded-3xl py-5 px-8 text-[#e3ff73] bg-[#252525] "
        >
          <Link href="/import"> Import Using Seed Phrase</Link>
        </Button>

        <Button
          asChild
          className="rounded-3xl py-5 px-8 bg-[#e3ff73] text-[#252525]"
        >
          <Link href="/create"> Create a New Wallet</Link>
        </Button>
      </div>
    </div>
  );
}
