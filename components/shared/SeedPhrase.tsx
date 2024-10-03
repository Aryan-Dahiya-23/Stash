/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import nacl from "tweetnacl";
import Cookies from "js-cookie";

interface SeedPhraseProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  importSuccess: boolean;
  setImportSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  privateKey: string;
  setPrivateKey: React.Dispatch<React.SetStateAction<string>>;
}

export const SeedPhrase: React.FC<SeedPhraseProps> = ({
  mnemonic,
  setMnemonic,
  importSuccess,
  setImportSuccess,
  privateKey,
  setPrivateKey,
}) => {
  const router = useRouter();

  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""));

  useEffect(() => {
    setMnemonic(seedWords.join(" "));
  }, [seedWords, setMnemonic]);

  const handleInputChange = (index: number, value: string) => {
    const updatedSeedWords = [...seedWords];
    updatedSeedWords[index] = value;
    setSeedWords(updatedSeedWords);
  };

  const importWalletUsingSeedPhrase = async () => {
    try {
      if (!bip39.validateMnemonic(mnemonic)) {
        alert("Invalid mnemonic seed phrase. Please try again.");
        return;
      }

      const seed = await bip39.mnemonicToSeed(mnemonic);
      console.log(seed);

      const derivedSeed = seed.slice(0, 32);
      console.log(derivedSeed);

      const derivedSeedUint8Array = new Uint8Array(derivedSeed);
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeedUint8Array);
      console.log(keypair);

      const solanaKeypair = Keypair.fromSecretKey(
        Uint8Array.from(keypair.secretKey)
      );
      console.log(solanaKeypair);

      const publicKey = solanaKeypair.publicKey.toBase58();
      const newPrivateKey = Buffer.from(solanaKeypair.secretKey).toString(
        "hex"
      );

      setPrivateKey(newPrivateKey);

      console.log(publicKey);
      console.log(privateKey);

      setImportSuccess(true);
    } catch (error) {
      console.error("Error importing wallet:", error);
      alert("Failed to import wallet. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full text-center text-[#dde0e3] text-[25px] font-semibold mb-4 mt-14">
        <div>Import existing wallet</div>
      </div>
      <div className="w-full text-center text-[#dde0e3] text-[14px] font-medium mb-8">
        <div>Make sure you're alone,</div>
        <div>then type your 12-word recovery phrase here</div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mb-4">
        {seedWords.map((word, index) => (
          <input
            key={index}
            type="text"
            className="w-[100px] h-[43px] bg-[#0A1527] rounded-xl text-center text-[#dde0e3] text-[15px] font-bold"
            placeholder={`${index + 1}.`}
            value={word}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <button
        onClick={importWalletUsingSeedPhrase}
        className="w-[300px] h-[50px] mt-9 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
      >
        <span className="text-white text-[15px] font-semibold">Continue</span>
      </button>
    </>
  );
};
