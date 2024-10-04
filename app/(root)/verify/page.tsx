/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { Buffer } from "buffer";
import { Password } from "@/components/shared/Password";
import { useRouter } from "next/navigation";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  function isValidMnemonic(mnemonic: string) {
    return bip39.validateMnemonic(mnemonic);
  }

  function isValidPrivateKey(privateKey: string) {
    const hexRegex = /^[0-9A-Fa-f]{128}$/; // Match 128 characters for hex keys
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/; // Match 43-44 characters for base58 keys
    return hexRegex.test(privateKey) || base58Regex.test(privateKey);
  }

  function checkDecryptedData(decryptedData: string) {
    console.log(decryptedData);
    const words = decryptedData.split(" ").map((word) => word.trim());

    if (words.length === 12 && isValidMnemonic(decryptedData)) {
      console.log("This is a valid 12-word mnemonic.");
      return "mnemonic";
    }

    if (isValidPrivateKey(decryptedData)) {
      console.log("This is a valid private key.");
      return "privateKey";
    }

    console.log(
      "The decrypted data is neither a valid mnemonic nor a private key."
    );
    return null;
  }

  const generatePrivateKey = async (mnemonic: string) => {
    try {
      if (!bip39.validateMnemonic(mnemonic)) {
        alert("Invalid mnemonic seed phrase. Please try again.");
        return;
      }

      const seed = await bip39.mnemonicToSeed(mnemonic);

      console.log(seed);

      const derivedSeed = seed.slice(0, 32);
      const derivedSeedUint8Array = new Uint8Array(derivedSeed);
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeedUint8Array);
      console.log(derivedSeed);
      console.log(keypair);

      const solanaKeypair = Keypair.fromSecretKey(
        Uint8Array.from(keypair.secretKey)
      );

      console.log(solanaKeypair);
      const publicKey = solanaKeypair.publicKey.toBase58();
      const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");

      const now = new Date();

      now.setTime(now.getTime() + 30 * 60 * 1000);

      Cookies.set("privateKey", privateKey, {
        expires: now,
        secure: true,
      });

      Cookies.set("publicKey", publicKey, {
        expires: now,
        secure: true,
      });
    } catch (error) {
      console.error("Error importing wallet:", error);
      alert("Failed to import wallet. Please try again.");
    }
  };

  const setCookie = () => {
    const decrypted = CryptoJS.AES.decrypt(
      Cookies.get("encryptedData") || "",
      password
    );

    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    const check = checkDecryptedData(decryptedData);
    if (check === "mnemonic") {
      generatePrivateKey(decryptedData);
    } else if (check === "privateKey") {
      const now = new Date();

      now.setTime(now.getTime() + 30 * 60 * 1000);

      Cookies.set("privateKey", decryptedData, {
        expires: now,
        secure: true,
      });

      const secretKey = Uint8Array.from(Buffer.from(decryptedData, "hex"));
      const solanaKeypair = Keypair.fromSecretKey(secretKey);
      const publicKey = solanaKeypair.publicKey.toBase58();

      Cookies.set("publicKey", publicKey, {
        expires: now,
        secure: true,
      });
    }
    toast("Welcome Back", {
      icon: "👋",
    });
    router.push("/wallet");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Password
        password={password}
        setPassword={setPassword}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
        setCookie={setCookie}
      />
    </div>
  );
}
