/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import toast from "react-hot-toast";

interface SeedPhraseProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  isWalletSuccess: boolean;
  setIsWalletSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  privateKey: string;
  setPrivateKey: React.Dispatch<React.SetStateAction<string>>;
}

export const SeedPhrase: React.FC<SeedPhraseProps> = ({
  mnemonic,
  setMnemonic,
  isWalletSuccess,
  setIsWalletSuccess,
  privateKey,
  setPrivateKey,
}) => {
  const router = useRouter();

  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""));
  const pathname = window.location.pathname;

  useEffect(() => {
    setMnemonic(seedWords.join(" "));
  }, [seedWords, setMnemonic]);

  const handleInputChange = (index: number, value: string) => {
    const updatedSeedWords = [...seedWords];
    updatedSeedWords[index] = value;
    setSeedWords(updatedSeedWords);
  };

  const importWalletUsingSeedPhrase = async () => {
    console.log(mnemonic);
    try {
      if (!bip39.validateMnemonic(mnemonic)) {
        toast.error("Invalid Seed Phrase. Please check and try again.", {
          icon: "❌",
        });
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

      toast.success("Wallet imported successfully!", {
        icon: "✅",
      });
      setIsWalletSuccess(true);
    } catch (error) {
      console.error("Error importing wallet:", error);
      toast.error("Failed to import wallet. Please try again.", {
        icon: "❌",
      });
    }
  };

  function generateWallet() {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setSeedWords(newMnemonic.split(" "));
    console.log(`Generated Mnemonic: ${newMnemonic}`);

    const seed = mnemonicToSeedSync(newMnemonic);

    const path = `m/44'/501'/0'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const derivedSeedUint8Array = new Uint8Array(derivedSeed);

    const keypair = nacl.sign.keyPair.fromSeed(derivedSeedUint8Array);

    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
    const publicKey = solanaKeypair.publicKey.toBase58();
    const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");
    setPrivateKey(privateKey);
    toast("Wallet successfully generated", {
      icon: "✅",
    });
  }

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
            disabled={window.location.pathname === "/create"}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      {pathname === "/create" &&
        (mnemonic.length === 11 ? (
          <button
            onClick={generateWallet}
            className="w-[300px] h-[50px] mt-9 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
          >
            <span className="text-white text-[15px] font-semibold">
              Generate
            </span>
          </button>
        ) : (
          <button
            onClick={() => setIsWalletSuccess(true)}
            className="w-[300px] h-[50px] mt-9 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
          >
            <span className="text-white text-[15px] font-semibold">
              Continue
            </span>
          </button>
        ))}

      {pathname === "/import" && (
        <button
          onClick={importWalletUsingSeedPhrase}
          className="w-[300px] h-[50px] mt-9 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
        >
          <span className="text-white text-[15px] font-semibold">Continue</span>
        </button>
      )}
    </>
  );
};
