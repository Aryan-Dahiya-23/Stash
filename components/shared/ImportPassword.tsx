/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import StashLogoIcon from "../../public/assets/stash-logo.png";
import { useEffect } from "react";

interface ImportPasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setCookie: () => void;
}

export const ImportPassword: React.FC<ImportPasswordProps> = ({
  password,
  setPassword,
  setCookie,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && password.length > 0) {
        setCookie();
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [password, setCookie]);

  const resetWallet = () => {
    Cookies.remove("encryptedData");
    toast("Wallet successfully reset", {
      icon: "✅",
    });
    router.refresh();
    router.push("/");
  };
  return (
    <div className="w-[360px] h-[600px] relative bg-gradient-to-b from-[#0b1524] via-[#182d52] to-[#26467c] rounded-lg p-4 flex flex-col items-center">
      <div className="w-[290px] h-[360px] mt-6 flex flex-col justify-center items-center">
        <Image
          src={StashLogoIcon}
          height={130}
          width={95}
          className="mb-8 mt-6"
          alt="Stash Icon"
        />

        <div className="text-center text-[#DEE0E3] text-[24px] font-semibold">
          Enter your password
        </div>

        <div className="mt-5"></div>

        <input
          type="password"
          className="w-[290px] h-[47px] bg-[#34568B] rounded-xl text-left pl-7 text-[15px] font-SE placeholder-[#CECECE] text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={resetWallet}
          className="mt-4 text-[13px] text-[#DEE0E3] hover:underline focus:outline-none"
        >
          Reset Wallet
        </button>
      </div>

      <button
        onClick={() => setCookie()}
        disabled={password.length === 0}
        className="w-[300px] h-[50px] mt-20 rounded-[15px] bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
      >
        <span className="text-white text-[15px] font-semibold">
          Unlock wallet
        </span>
      </button>
    </div>
  );
};
