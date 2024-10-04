/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import secureLocalStorage from "react-secure-storage";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import nacl from "tweetnacl";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { createCipheriv, randomBytes, scryptSync } from "crypto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImportWallet } from "@/components/shared/ImportWallet";
import { SeedPhrase } from "@/components/shared/SeedPhrase";
import { PrivateKey } from "@/components/shared/PrivateKey";
import { Password } from "@/components/shared/Password";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const [recoverWithSeedPhrase, setRecoverWithSeedPhrase] =
    useState<boolean>(false);
  const [recoverWithPrivateKey, setRecoverWithPrivateKey] =
    useState<boolean>(false);

  const [privateKey, setPrivateKey] = useState<string>("");
  const [mnemonic, setMnemonic] = useState<string>("");
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const setCookie = () => {
    let encryptedData;

    if (mnemonic.length > 0) {
      encryptedData = CryptoJS.AES.encrypt(mnemonic, password).toString();
    } else {
      encryptedData = CryptoJS.AES.encrypt(privateKey, password).toString();
    }

    Cookies.set("encryptedData", encryptedData, {
      expires: 5000,
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

    toast("Welcome Back", {
      icon: "👋",
    });

    router.push("/wallet");
  };

  return (
    <div className="h-[600px] relative p-4 flex flex-col items-center">
      {!recoverWithSeedPhrase && !recoverWithPrivateKey && (
        <ImportWallet
          recoverWithSeedPhrase={recoverWithSeedPhrase}
          setRecoverWithSeedPhrase={setRecoverWithSeedPhrase}
          recoverWithPrivateKey={recoverWithPrivateKey}
          setRecoverWithPrivateKey={setRecoverWithPrivateKey}
        />
      )}

      {recoverWithSeedPhrase && !importSuccess && (
        <SeedPhrase
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
          isWalletSuccess={importSuccess}
          setIsWalletSuccess={setImportSuccess}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
      )}

      {recoverWithPrivateKey && !importSuccess && (
        <PrivateKey
          importSuccess={importSuccess}
          setImportSuccess={setImportSuccess}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
      )}

      {importSuccess && (
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
