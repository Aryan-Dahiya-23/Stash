/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import toast from "react-hot-toast";
import BackArrowIcon from "../../public/assets/back-arrow-icon.png";
import { Button } from "../ui/button";

interface SeedPhraseProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  isWalletSuccess: boolean;
  setIsWalletSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  privateKey: string;
  setPrivateKey: React.Dispatch<React.SetStateAction<string>>;
  recover: boolean;
  setRecover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SeedPhrase: React.FC<SeedPhraseProps> = ({
  mnemonic,
  setMnemonic,
  isWalletSuccess,
  setIsWalletSuccess,
  privateKey,
  setPrivateKey,
  recover,
  setRecover,
}) => {
  const router = useRouter();

  const [isWalletGenerated, setIsWalletGenerated] = useState<boolean>(false);
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""));
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [router]);

  useEffect(() => {
    setMnemonic(seedWords.join(" "));
  }, [seedWords, setMnemonic]);

  const handleInputChange = (index: number, value: string) => {
    const updatedSeedWords = [...seedWords];
    updatedSeedWords[index] = value;
    setSeedWords(updatedSeedWords);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("Text").trim();
    const words = pasteData.split(/\s+/);
    if (words.length === 12) {
      setSeedWords(words);
    } else {
      console.warn("Please paste exactly 12 words.");
    }
  };

  const generateWallet = async () => {
    try {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      setSeedWords(newMnemonic.split(" "));

      const path = "m/44'/501'/0'/0'";

      const seed = await bip39.mnemonicToSeed(newMnemonic);
      const { key } = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(new Uint8Array(key));

      const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
      const publicKey = solanaKeypair.publicKey.toBase58();
      const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");
      setPrivateKey(privateKey);
      setIsWalletGenerated(true);
      toast("Wallet successfully generated", {
        icon: "✅",
      });
    } catch (error) {
      toast.error("Failed to create wallet. Please try again");
    }
  };

  const importWalletUsingSeedPhrase = async () => {
    try {
      if (!bip39.validateMnemonic(mnemonic)) {
        toast.error("Invalid Seed Phrase. Please check and try again.", {
          icon: "❌",
        });
        return;
      }

      const path = "m/44'/501'/0'/0'";
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const { key } = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(new Uint8Array(key));

      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      setPrivateKey(privateKey);
      setIsWalletSuccess(true);

      toast("Wallet successfully imported", {
        icon: "✅",
      });
    } catch (error) {
      console.error("Error importing wallet:", error);
      toast.error("Failed to import wallet. Please try again.", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <div className="w-full text-center text-[#dde0e3] text-[25px] font-semibold mb-4 mt-14">
        {pathname === "/import" && (
          <button
            onClick={
              pathname === "/import"
                ? () => setRecover(false)
                : () => router.push("/")
            }
            className="absolute top-2 left-2 focus:outline-none ml-2 mt-4"
          >
            <Image
              src={BackArrowIcon}
              width={30}
              height={30}
              alt="Back Arrow"
            />
          </button>
        )}

        {pathname === "/create" && !isWalletGenerated && (
          <button
            onClick={() => router.push("/")}
            className="absolute top-2 left-2 focus:outline-none ml-2 mt-4"
          >
            <Image
              src={BackArrowIcon}
              width={30}
              height={30}
              alt="Back Arrow"
            />
          </button>
        )}

        <div>
          {pathname === "/import"
            ? "Import existing wallet"
            : "Your Secret Recovery Phrase"}
        </div>
      </div>
      <div className="w-full text-center text-[#dde0e3] text-[14px] font-medium mb-8">
        <div>Make sure you're alone,</div>
        <div>
          then {pathname === "/import " ? "type" : "generate"} your 12-word
          recovery phrase here
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mb-4">
        {seedWords.map((word, index) => (
          <input
            key={index}
            type="text"
            className="w-[100px] h-[43px] bg-[#0A1527] rounded-xl text-center text-[#dde0e3] text-[15px] font-bold"
            placeholder={`${index + 1}.`}
            value={word}
            disabled={pathname === "/create"}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={
              pathname === "/import" && index === 0 ? handlePaste : undefined
            }
          />
        ))}
      </div>

      {pathname === "/create" && mnemonic.length > 11 && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(mnemonic);
            toast.success("Copied");
          }}
          className="w-[300px] h-[50px] mt-3 bg-[#405983] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
        >
          <span className="text-white text-[15px] font-semibold">
            Copy seed phrase
          </span>
        </button>
      )}

      {pathname === "/create" &&
        (mnemonic.length === 11 ? (
          <button
            onClick={generateWallet}
            className="w-[300px] h-[50px] mt-4 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#5c749e]"
          >
            <span className="text-white text-[15px] font-semibold">
              Generate
            </span>
          </button>
        ) : (
          <Button
            onClick={() => setIsWalletSuccess(true)}
            className="w-[300px] h-[50px] mt-4 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out bg-[#0a1527e3] hover:bg-[#0c192ed5]"
          >
            <span className="text-white text-[15px] font-semibold">
              Continue
            </span>
          </Button>
        ))}

      {pathname === "/import" && (
        <Button
          onClick={importWalletUsingSeedPhrase}
          className="w-[300px] h-[50px] mt-9 bg-[#6782B1] rounded-[15px] flex justify-center items-center transition duration-300 ease-in-out bg-[#0a1527e3] hover:bg-[#0c192ed5]"
        >
          <span className="text-white text-[15px] font-semibold">Continue</span>
        </Button>
      )}
    </>
  );
};
