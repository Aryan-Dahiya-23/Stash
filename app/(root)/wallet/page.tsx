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
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";
import { Receive } from "@/components/shared/Receive";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Wallet } from "@/components/shared/Wallet";
import { SendToken } from "@/components/shared/SendToken";

interface Wallet {
  publicKey: string;
  privateKey: string;
}

export default function Home() {
  const router = useRouter();

  const [balance, setBalance] = useState<number>(0);
  const [solanaLivePrice, setSolanaLivePrice] = useState<number>(0);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [solanaAmount, setSolanaAmount] = useState<string>("");
  const [successful, setSuccessful] = useState<number>(0);
  const [isSendTransaction, setIsSendTransaction] = useState<boolean>(false);
  const [isTransactionPending, setIsTransactionPending] =
    useState<boolean>(false);
  const [isTransactionDone, setIsSendTransactionDone] =
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
        } catch (error) {
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
    try {
      new PublicKey(wallet?.publicKey ?? "");
    } catch (error) {
      toast.error("Invalid Public Key");
      return;
    }
    if (!parseFloat(solanaAmount)) {
      toast.error("Enter Valid Amount");
      return;
    }
    if (parseFloat(solanaAmount) > balance) {
      toast.error("Not enough balance!");
      return;
    }

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

    const privateKeyHex = wallet?.privateKey ?? "";
    const secretKey = Uint8Array.from(Buffer.from(privateKeyHex, "hex"));
    const solanaKeypair = Keypair.fromSecretKey(secretKey);

    try {
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [solanaKeypair]
      );
      setIsSendTransactionDone(true);
    } catch (error) {
      toast.error("There was something wrong with the transaction. Try again!");
      setIsTransactionPending(false);
    }

    setSuccessful(successful + 1);
    setIsTransactionPending(false);
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
  }, 10000);

  const getPrice = async () => {
    const response = await axios.get(
      "https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000"
    );
    setSolanaLivePrice(response.data.Price);
  };

  useEffect(() => {
    getBalance();
    getPrice();
  }, [successful, wallet]);

  return (
    <div className="h-[600px] relative flex flex-col items-center">
      <Header
        publicKey={wallet ? wallet.publicKey : ""}
        copyAddress={copyAddress}
        logout={logout}
      />
      <div className="w-[360px] border border-[#5f5f5f46] mt-3"></div>

      {showQR ? (
        <Receive
          publicKey={wallet?.publicKey || ""}
          copyAddress={copyAddress}
          showQR={showQR}
          setShowQR={setShowQR}
        />
      ) : isSendTransaction ? (
        <SendToken
          receiverAddress={receiverAddress}
          setReceiverAddress={setReceiverAddress}
          solanaAmount={solanaAmount}
          setSolanaAmount={setSolanaAmount}
          isTransactionPending={isTransactionPending}
          setIsSendTransaction={setIsSendTransaction}
          isTransactionDone={isTransactionDone}
          setIsSendTransactionDone={setIsSendTransactionDone}
          sendTransaction={sendTransaction}
        />
      ) : (
        <Wallet
          balance={balance}
          solanaLivePrice={solanaLivePrice}
          setShowQR={setShowQR}
          setIsSendTransaction={setIsSendTransaction}
        />
      )}

      <Footer />
    </div>
  );
}

// GVfwCYZQ9eRHMApho8TGJhM2qrzdeoa79esk8qRydvqg   -> public key
// 78fce98e5ef5bb7c63914b1679bd64bd3d72c2c1a05da0a35f72a6552214e92ee6379703121e832db91f75ad4246ebed6717ce8aa0279b8c186dfb2f3f837c1b

// EEYsknnVYZ5C2gMBBrmTbTMqmdhwprdTToe4VhjJu8AR
// f6278b2ecbeeb4ce2a9bb0fa1b904b02f527f73ef0b01545d56598e6bebf6315c4a08596fe4b085df557ba3c2caf682dc5d2532cd089ddcbfb8fc7dffe11058e
