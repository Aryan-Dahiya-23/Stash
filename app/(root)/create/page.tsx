/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { SeedPhrase } from "@/components/shared/SeedPhrase";
import { Password } from "@/components/shared/Password";

export default function Home() {
  const router = useRouter();

  const [mnemonic, setMnemonic] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isWalletSuccess, setIsWalletSuccess] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  function generateWallet() {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    console.log(`Generated Mnemonic: ${mnemonic}`);

    const seed = mnemonicToSeedSync(newMnemonic);

    const path = `m/44'/501'/0'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const derivedSeedUint8Array = new Uint8Array(derivedSeed);

    const keypair = nacl.sign.keyPair.fromSeed(derivedSeedUint8Array);

    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
    const publicKey = solanaKeypair.publicKey.toBase58();
    const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");
  }

  const setCookie = () => {
    const encryptedData = CryptoJS.AES.encrypt(mnemonic, password).toString();

    Cookies.set("encryptedData", encryptedData, {
      expires: 50000,
      secure: true,
    });

    const now = new Date();

    now.setTime(now.getTime() + 10 * 60 * 1000);

    Cookies.set("privateKey", privateKey, {
      expires: now,
      secure: true,
    });

    const secretKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
    const solanaKeypair = Keypair.fromSecretKey(secretKey);
    const publicKey = solanaKeypair.publicKey.toBase58();

    Cookies.set("publicKey", publicKey, {
      expires: now,
      secure: true,
    });

    toast("Hey, There!", {
      icon: "👋",
    });

    router.push("/wallet");
  };
  return (
    <div className="h-[600px] relative p-4 flex flex-col items-center">
      {!isWalletSuccess && (
        <SeedPhrase
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
          isWalletSuccess={isWalletSuccess}
          setIsWalletSuccess={setIsWalletSuccess}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
      )}

      {isWalletSuccess && (
        <Password
          password={password}
          setPassword={setPassword}
          verifyPassword={verifyPassword}
          setVerifyPassword={setVerifyPassword}
          setCookie={setCookie}
        />
      )}
    </div>
  );
}

// 25X7yq3Eru5Zq2c7uejy1xYV12X3qvHqosthQ3XqA5ZAYtcuPD4Bz7xHW1bEfPELtmHb5owCnudUbYnXoQ993gXV
