/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackArrowIcon from "../../public/assets/back-arrow-icon.png";
import SeedPhraseIcon from "../../public/assets/seed-phrase-icon.png";
import PrivateKeyIcon from "../../public/assets/private-key-icon.png";

interface ImportWalletProps {
  recoverWithSeedPhrase: boolean;
  setRecoverWithSeedPhrase: React.Dispatch<React.SetStateAction<boolean>>;
  recoverWithPrivateKey: boolean;
  setRecoverWithPrivateKey: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImportWallet: React.FC<ImportWalletProps> = ({
  recoverWithSeedPhrase,
  setRecoverWithSeedPhrase,
  recoverWithPrivateKey,
  setRecoverWithPrivateKey,
}) => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push("/")}
        className="absolute top-2 left-2 focus:outline-none ml-2 mt-4"
      >
        <Image src={BackArrowIcon} width={30} height={30} alt="Back Arrow" />
      </button>

      <div className="w-[280px] h-[380px] mt-12 flex flex-col justify-center items-center">
        <div className="text-center text-[#DEE0E3] text-[24px] font-semibold mt-7">
          Import Wallet
        </div>

        <div className="text-center text-[#dde0e3] text-[15px] font-medium mt-4 mb-6">
          Retrieve your existing wallet using your 12-word seed phrase or
          private key.
        </div>

        <div className="w-[320px] h-[200px] mt-4 rounded-[15px] bg-[#34568B] flex flex-col items-center justify-center">
          <button
            onClick={() => setRecoverWithSeedPhrase(true)}
            className="w-[280px] h-[55px] mb-4 rounded-[15px] bg-[#0a1527d8] flex items-center transition duration-300 ease-in-out hover:bg-[#0a1527]"
          >
            <Image
              className="ml-4 mr-2"
              src={SeedPhraseIcon}
              width={22}
              height={22}
              alt="Seed Phrase Icon"
            />

            <span className="text-white text-[12px] font-semibold text-center ml-3">
              Restore with 12-Word Seed Phrase
            </span>
          </button>

          <button
            onClick={() => setRecoverWithPrivateKey(true)}
            className="w-[280px] h-[55px] rounded-[15px] bg-[#0a1527d8] flex items-center transition duration-300 ease-in-out hover:bg-[#0a1527]"
          >
            <Image
              className="ml-4 mr-2"
              src={PrivateKeyIcon}
              width={22}
              height={22}
              alt="Private Key Icon"
            />
            <span className="text-white text-[12px] font-semibold text-center ml-6">
              Restore with Private Key
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
