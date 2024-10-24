import React from "react";
import Image from "next/image";
import BackArrowIcon from "../../public/assets/back-arrow-icon.png";
import HideIcon from "../../public/assets/Hide.png";
import { Keypair } from "@solana/web3.js";
import toast from "react-hot-toast";
// import bs58 from "bs58";

interface PrivateKeyProps {
  importSuccess: boolean;
  setImportSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  privateKey: string;
  setPrivateKey: React.Dispatch<React.SetStateAction<string>>;
  recover: boolean;
  setRecover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PrivateKey: React.FC<PrivateKeyProps> = ({
  setImportSuccess,
  privateKey,
  setPrivateKey,
  setRecover,
}) => {
  const importWalletUsingPrivateKey = () => {
    try {
      // const privateKeyArray = Uint8Array.from(Buffer.from(privateKey));
      const privateKeyArray = Uint8Array.from(Buffer.from(privateKey, "hex"));

      const keypair = Keypair.fromSecretKey(privateKeyArray);

      // const privateKeyArray = bs58.decode(privateKey);
      // const keypair = Keypair.fromSecretKey(privateKeyArray);

      if (keypair) {
        setImportSuccess(true);
        toast.success("Wallet imported successfully!", {
          icon: "✅",
        });
      }
    } catch (error) {
      console.error("Invalid private key:", error);
      toast.error("Invalid private key. Please check and try again.", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setRecover(false)}
        className="absolute top-2 left-2 focus:outline-none ml-2 mt-4"
      >
        <Image src={BackArrowIcon} width={30} height={30} alt="Back Arrow" />
      </button>

      <div className="w-[280px] h-[380px] mt-12 flex flex-col justify-center items-center">
        <div className="text-center text-[#DEE0E3] text-[23px] font-semibold mt-10">
          Enter Private Key
        </div>

        <div className="text-center text-[#dde0e3] text-[15px] font-medium mt-4 mb-4">
          Input your private key to securely restore your solana wallet.
        </div>

        <div className="w-[320px] h-[200px] rounded-[15px] flex flex-col items-center justify-center">
          <div className="w-[280px] h-[55px] flex items-center bg-[#34568B] rounded-xl">
            <input
              onChange={(e) => setPrivateKey(e.target.value)}
              type="text"
              className="w-full h-full bg-transparent text-left pl-4 pr-10 text-[#ffffff] text-[15px] placeholder-[#CECECE] outline-none"
              placeholder="Input your private key here"
            />
            <Image
              className="mr-4"
              src={HideIcon}
              width={20}
              height={20}
              alt="Back Arrow"
            />
          </div>

          <button
            onClick={importWalletUsingPrivateKey}
            className="w-[280px] h-[55px] rounded-[15px] bg-[#0a1527d8] flex items-center justify-center transition duration-300 ease-in-out hover:bg-[#0a1527] mt-8"
          >
            <span className="text-white text-[15px] font-semibold text-center">
              Continue
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
