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
import { NameGeneration } from "@/components/shared/NameGeneration";
import { NFT } from "@/components/shared/NFT";
import { Vault } from "@/components/shared/Vault";
import { SwapTokens } from "@/components/shared/SwapTokens";
import bs58 from "bs58";

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
  const [nameGeneration, setNameGeneration] = useState<boolean>(false);
  const [isSendTransaction, setIsSendTransaction] = useState<boolean>(false);
  const [isTransactionPending, setIsTransactionPending] =
    useState<boolean>(false);
  const [isTransactionDone, setIsSendTransactionDone] =
    useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [showNFT, setShowNFT] = useState<boolean>(false);
  const [showVault, setShowVault] = useState<boolean>(false);
  const [showWallet, setShowWallet] = useState<boolean>(true);
  const [swapTokens, setSwapTokens] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const privateKey = Cookies.get("privateKey") || "";

      const getCustomName = async (publicKey: string) => {
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_SERVER_URL
            }/api/name/getCustomName?walletAddress=${encodeURIComponent(
              publicKey
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching custom name:", errorData.error);
            return;
          }

          const wallet = await response.json();

          if (wallet && wallet.customName) {
            console.log("Logging wallet:", wallet);
            setCustomName(wallet.customName);
          } else {
            console.log("Custom name not found for this wallet");
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      };

      if (privateKey) {
        try {
          // const privateKeyArray = bs58.decode(privateKey);
          // const solanaKeypair = Keypair.fromSecretKey(privateKeyArray);
          const secretKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
          const solanaKeypair = Keypair.fromSecretKey(secretKey);
          const publicKey = solanaKeypair.publicKey.toBase58();

          setWallet({ publicKey, privateKey });
          getBalance();
          getCustomName(publicKey);
        } catch (error) {
          router.push("/import");
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

  const isValidPublicKey = (key: string): boolean => {
    try {
      new PublicKey(key);
      return true;
    } catch (error) {
      return false;
    }
  };

  const sendTransaction = async () => {
    try {
      new PublicKey(wallet?.publicKey ?? "");
    } catch (error) {
      toast.error("Invalid Public Key");
      return;
    }

    let newReceiverAddress = "";
    try {
      if (receiverAddress.length > 0 && receiverAddress.endsWith("@solana")) {
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_SERVER_URL
            }/api/name/getWalletAddress?customName=${encodeURIComponent(
              receiverAddress
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 404) {
            toast.error("Invalid wallet address");
          }

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching wallet address:", errorData.error);
            return;
          }

          const wallet = await response.json();

          if (wallet && wallet.walletAddress) {
            console.log("Logging wallet:", wallet);
            setReceiverAddress(wallet.walletAddress);
            newReceiverAddress = wallet.walletAddress;
          } else {
            console.log("Custom name not found for this wallet");
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (!parseFloat(solanaAmount)) {
      toast.error("Enter Valid Amount");
      return;
    }
    if (parseFloat(solanaAmount) > balance) {
      toast.error("Not enough balance!");
      return;
    }

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const transaction = new Transaction();

    const pubkeyToValidate =
      newReceiverAddress.length > 0 ? newReceiverAddress : receiverAddress;

    if (isValidPublicKey(pubkeyToValidate)) {
      setIsTransactionPending(true);
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet?.publicKey ?? ""),
          toPubkey: new PublicKey(pubkeyToValidate),
          lamports: parseFloat(solanaAmount) * LAMPORTS_PER_SOL,
        })
      );
    } else {
      toast.error("Invalid solana address");
      return;
    }

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
    navigator.clipboard.writeText(
      customName.length > 0 ? customName : wallet?.publicKey ?? ""
    );

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
        customName={customName}
        nameGeneration={nameGeneration}
        setNameGeneration={setNameGeneration}
        setIsSendTransaction={setIsSendTransaction}
        setShowQR={setShowQR}
        copyAddress={copyAddress}
        logout={logout}
      />
      <div className="w-[360px] border border-[#5f5f5f46] mt-3"></div>

      {showQR ? (
        <Receive
          publicKey={wallet?.publicKey || ""}
          customName={customName}
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
      ) : nameGeneration ? (
        <NameGeneration
          walletAddress={wallet ? wallet.publicKey : ""}
          customName={customName}
          setCustomName={setCustomName}
          setNameGeneration={setNameGeneration}
        />
      ) : showNFT ? (
        <NFT />
      ) : showVault ? (
        <Vault />
      ) : swapTokens ? (
        <SwapTokens />
      ) : (
        <Wallet
          balance={balance}
          solanaLivePrice={solanaLivePrice}
          setShowQR={setShowQR}
          setIsSendTransaction={setIsSendTransaction}
        />
      )}

      <Footer
        showWallet={showWallet}
        setShowWallet={setShowWallet}
        showNFT={showNFT}
        setShowNFT={setShowNFT}
        showVault={showVault}
        setShowVault={setShowVault}
        setIsSendTransaction={setIsSendTransaction}
        setIsSendTransactionDone={setIsSendTransactionDone}
        setShowQR={setShowQR}
        swapTokens={swapTokens}
        setSwapTokens={setSwapTokens}
        setNameGeneration={setNameGeneration}
      />
    </div>
  );
}

// GVfwCYZQ9eRHMApho8TGJhM2qrzdeoa79esk8qRydvqg   -> public key
// 78fce98e5ef5bb7c63914b1679bd64bd3d72c2c1a05da0a35f72a6552214e92ee6379703121e832db91f75ad4246ebed6717ce8aa0279b8c186dfb2f3f837c1b

// EEYsknnVYZ5C2gMBBrmTbTMqmdhwprdTToe4VhjJu8AR
// f6278b2ecbeeb4ce2a9bb0fa1b904b02f527f73ef0b01545d56598e6bebf6315c4a08596fe4b085df557ba3c2caf682dc5d2532cd089ddcbfb8fc7dffe11058e

// 9JDGCxQjmQ6WRvVELaWsBrWsUjd3KqXYQKDdoo5GyRYW
// dcdb44331409e5180ff61579606bfdec0bfcc33b38bc9f7db00affc884978e137b463beab53d95ffca4d0fa9b3fba20c856e00a61adeed2d02a30615a639a433
