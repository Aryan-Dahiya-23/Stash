"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import GreenTickIcon from "../../public/assets/green_tick.png";

export const Congratulations = () => {
  const router = useRouter();

  const done = () => {
    if (window.location.pathname === "/create") {
      toast("Hey, There!", {
        icon: "👋",
      });
    } else {
      toast("Welcome Back", {
        icon: "👋",
      });
    }
    router.push("/wallet");
  };

  return (
    <div className="w-[360px] h-[600px] relative bg-gradient-to-b from-[#0b1524] via-[#182d52] to-[#26467c] rounded-lg p-4 flex flex-col items-center">
      <Image
        src={GreenTickIcon}
        height={100}
        width={100}
        alt="Green Tick Icon"
      />

      <div className="w-full text-center text-[#dde0e3] text-[25px] font-semibold mb-4 mt-8">
        <div>Congratulations!</div>
      </div>

      <div className="w-[290px] text-center text-[#dde0e3] text-[14px] font-medium mt-4">
        <div className="mb-5">Your wallet is now protected</div>
        <div className="mb-5">
          Stash cannot help recover your wallet if the seed phrase is lost.
        </div>
        <div className="mb-5">
          You can always find your seed phrase by navigating to
          <span className="font-semibold">{` Settings > Security & Privacy.`}</span>
        </div>
      </div>

      <button
        onClick={done}
        className="w-[300px] h-[50px] mt-9 bg-[#0A1527] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#03080f]/40"
      >
        <span className="text-white text-[15px] font-semibold">Continue</span>
      </button>
    </div>
  );
};
