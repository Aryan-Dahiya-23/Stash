/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { SeedPhrase } from "@/components/shared/SeedPhrase";
import { Password } from "@/components/shared/Password";
import { Congratulations } from "@/components/shared/Congratulations";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isWalletSuccess, setIsWalletSuccess] = useState<boolean>(false);
  const [congratulations, setCongratulations] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

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

    setCongratulations(true);
    setIsWalletSuccess(false);
  };
  return (
    <div className="h-[600px] relative p-4 flex flex-col items-center">
      {!isWalletSuccess && !congratulations && (
        <SeedPhrase
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
          isWalletSuccess={isWalletSuccess}
          setIsWalletSuccess={setIsWalletSuccess}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          recover={false}
          setRecover={() => {}}
        />
      )}

      {isWalletSuccess && !congratulations && (
        <Password
          password={password}
          setPassword={setPassword}
          verifyPassword={verifyPassword}
          setVerifyPassword={setVerifyPassword}
          setCookie={setCookie}
          wallet={false}
          setWallet={() => {}}
        />
      )}

      {congratulations && <Congratulations />}
    </div>
  );
}
