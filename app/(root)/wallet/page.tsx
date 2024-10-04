/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import CryptoJS from "crypto-js";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

export default function Home() {
  const router = useRouter();

  const [balance, setBalance] = useState<number>();
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [solanaAmount, setSolanaAmount] = useState<string>("");
  const [successful, setSuccessful] = useState<number>(0);
  const [isTransactionPending, setIsTransactionPending] =
    useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const privateKey = Cookies.get("privateKey") || "";

      if (privateKey) {
        try {
          const secretKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
          const solanaKeypair = Keypair.fromSecretKey(secretKey);
          const publicKey = solanaKeypair.publicKey.toBase58();

          setWallet({ publicKey, privateKey });
          getBalance();
          console.log(publicKey);
        } catch (error) {
          console.error("Invalid private key format", error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  const getBalance = async () => {
    console.log("getting balance");
    if (!wallet || !wallet.publicKey) return;

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey = new PublicKey(wallet.publicKey);
    setBalance((await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL);
    console.log(
      `${(await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL} SOL`
    );
  };

  const sendTransaction = async () => {
    setIsTransactionPending(true);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet?.publicKey ?? ""),
        toPubkey: new PublicKey(receiverAddress),
        lamports: parseFloat(solanaAmount) * LAMPORTS_PER_SOL,
      })
    );

    // Assuming you have the private key as a hex string
    const privateKeyHex = wallet?.privateKey ?? "";
    console.log(privateKeyHex);

    // Step 1: Convert the private key from hex to Uint8Array
    const secretKey = Uint8Array.from(Buffer.from(privateKeyHex, "hex"));
    console.log(secretKey);

    // Step 2: Reconstruct the Solana Keypair using the secret key
    const solanaKeypair = Keypair.fromSecretKey(secretKey);
    console.log(solanaKeypair);

    // You now have the full Solana keypair
    console.log("Public Key:", solanaKeypair.publicKey.toBase58());
    console.log(
      "Private Key:",
      Buffer.from(solanaKeypair.secretKey).toString("hex")
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      solanaKeypair,
    ]);

    setSuccessful(successful + 1);

    setIsTransactionPending(false);
    setReceiverAddress("");
    setSolanaAmount("");
  };

  const logout = () => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    deleteCookie("encryptedData");
    deleteCookie("privateKey");
    deleteCookie("publicKey");
    toast("Successfully Logged Out", {
      icon: "✅",
    });
    router.push("/");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet?.publicKey ?? "");
    toast("Copied!", {
      icon: "📋",
    });
  };

  setTimeout(() => {
    setSuccessful(successful + 1);
  }, 4000);

  useEffect(() => {
    getBalance();
  }, [successful, wallet]);

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  useEffect(() => {
    const decrypted = CryptoJS.AES.decrypt(
      Cookies.get("solanaEncryptedPrivateKey") || "",
      "aryan"
    );
    console.log(`Decrypted data: ${decrypted.toString(CryptoJS.enc.Utf8)}`);
  }, [wallet, successful]);

  return (
    <div className="bg-black text-white p-6 rounded-lg text-center max-w-md mx-auto">
      {showQR ? (
        <div className="relative flex flex-col justify-center items-center space-y-8 mt-24 p-10">
          {/* <button
            onClick={() => setShowQR(false)}
            className="absolute top-0 right-0 mt-2 mr-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
          >
            X
          </button> */}

          <Button
            onClick={() => setShowQR(false)}
            className="top-0 right-0 absolute "
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>

          <QRCode
            className="h-40 w-40 bg-white p-2 rounded-md"
            value={wallet?.publicKey ?? ""}
            size={256}
          />
          <p className="break-all w-full max-w-[75%] text-sm">
            {wallet?.publicKey}
          </p>

          <div className="flex flex-col justify-center items-center  space-y-4">
            <Button className="" onClick={copyAddress}>
              Copy Address
            </Button>
            <p className="text-xs break-all">
              This address can only receive assets on Solana
            </p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-medium text-gray-400 mb-2">
            Wallet Value
          </h2>
          <div className="text-5xl font-bold">
            {balance && balance.toFixed(2) + ` SOL`}
          </div>
          <div className="text-green-400 text-xl flex justify-center items-center mt-2"></div>

          <form className="bg-gray-600 p-6 rounded-lg shadow-lg mt-16">
            <div className="mb-4 flex flex-col space-y-4">
              <Input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Wallet Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Input
                type="text"
                value={solanaAmount}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //   setSolanaAmount(Number(e.target.value))
                // }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSolanaAmount(e.target.value)
                }
                placeholder="Solana Amount"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              disabled={isTransactionPending || receiverAddress === ""}
              onClick={sendTransaction}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isTransactionPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isTransactionPending ? "Sending" : "Send"}
            </Button>
          </form>

          <Button className="w-5/6 mt-10 rounded-md" onClick={logout}>
            Logout
          </Button>

          <Button
            className="w-5/6 mt-10 rounded-md"
            onClick={() => setShowQR(true)}
          >
            Receive
          </Button>
        </>
      )}
    </div>
  );
}

// GVfwCYZQ9eRHMApho8TGJhM2qrzdeoa79esk8qRydvqg   -> public key
// 78fce98e5ef5bb7c63914b1679bd64bd3d72c2c1a05da0a35f72a6552214e92ee6379703121e832db91f75ad4246ebed6717ce8aa0279b8c186dfb2f3f837c1b

// EEYsknnVYZ5C2gMBBrmTbTMqmdhwprdTToe4VhjJu8AR
// f6278b2ecbeeb4ce2a9bb0fa1b904b02f527f73ef0b01545d56598e6bebf6315c4a08596fe4b085df557ba3c2caf682dc5d2532cd089ddcbfb8fc7dffe11058e
