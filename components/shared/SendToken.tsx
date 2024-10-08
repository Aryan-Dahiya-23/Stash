/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import SolanaLogo from "../../public/assets/solana-logo.png";
import BackArrowIcon from "../../public/assets/back-arrow-icon.png";

interface SendTokenProps {
  receiverAddress: string;
  setReceiverAddress: React.Dispatch<React.SetStateAction<string>>;
  solanaAmount: string;
  setSolanaAmount: React.Dispatch<React.SetStateAction<string>>;
  isTransactionPending: boolean;
  setIsSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionDone: boolean;
  setIsSendTransactionDone: React.Dispatch<React.SetStateAction<boolean>>;
  sendTransaction: () => void;
}

export const SendToken: React.FC<SendTokenProps> = ({
  receiverAddress,
  setReceiverAddress,
  solanaAmount,
  setSolanaAmount,
  isTransactionPending,
  setIsSendTransaction,
  isTransactionDone,
  setIsSendTransactionDone,
  sendTransaction,
}) => {
  const temp = async () => {
    sendTransaction();
  };
  return (
    <div className="min-h-[480px] ">
      <div className="relative w-[310px] h-[320px] mt-10 bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center">
        {/* <Button
          disabled={isTransactionPending}
          onClick={() => {
            setIsSendTransaction(false);
            setIsSendTransactionDone(false);
            setReceiverAddress("");
          }}
          variant="destructive"
          className="absolute h-8 w-8 top-2.5 right-2 rounded-full"
        >
          X
        </Button> */}

        <Image
          onClick={() => {
            if (isTransactionPending) return;
            setIsSendTransaction(false);
            setIsSendTransactionDone(false);
            setReceiverAddress("");
          }}
          className="absolute top-2.5 left-2.5 rounded-full hover:cursor-pointer"
          src={BackArrowIcon}
          width={30}
          height={30}
          alt="Back Arrow"
        />

        {!isTransactionPending && !isTransactionDone && (
          <>
            <div className="text-center text-[#DEE0E3] text-[20px] font-semibold">
              Send SOL (Solana)
            </div>
            <Image
              src={SolanaLogo}
              height={80}
              width={140}
              className="mt-4 mb-7"
              alt="Wallet Icon"
            />
            <div className="w-[260px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200">
              <input
                type="text"
                value={receiverAddress}
                onChange={(e) => {
                  setReceiverAddress(e.target.value);
                }}
                className="w-full h-full bg-transparent text-left pl-4 pr-10 text-[#ffffff] text-[15px] placeholder-[#CECECE] outline-none"
                placeholder="Receiver address / username"
              />
            </div>
            <div className="mt-5"></div>
            <div className="w-[260px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200">
              <input
                type="text"
                value={solanaAmount}
                onChange={(e) => setSolanaAmount(e.target.value)}
                className="w-full h-full bg-transparent text-left pl-4 pr-10 text-[#ffffff] text-[15px] placeholder-[#CECECE] outline-none"
                placeholder="Amount (SOL)"
              />
            </div>
          </>
        )}

        {isTransactionPending && (
          <div className="flex flex-col justify-center items-center space-y-2">
            <Loader2 className="h-16 w-16 text-white animate-spin " />
            <span className="text-lg font-bold">Sending...</span>
          </div>
        )}

        {isTransactionDone && (
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="p-3 bg-green-950 rounded-full">
              <Check className="h-14 w-14 text-green-400  " />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl font-bold">Sent!</span>
              <span className="mt-2">{`Your tokens were successfully sent to`}</span>
              <span className="font-semibold">
                {`${receiverAddress.slice(0, 3)}...${receiverAddress.slice(
                  -3
                )}`}
              </span>
            </div>
          </div>
        )}
      </div>

      {!isTransactionPending && !isTransactionDone && (
        <Button
          disabled={receiverAddress === "" || solanaAmount === ""}
          onClick={() => sendTransaction()}
          className="w-[300px] h-[50px] mt-6 rounded-[15px]  bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
        >
          {isTransactionPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              <span className="text-white text-[15px] font-semibold">
                Sending
              </span>
            </>
          ) : (
            <span className="text-white text-[15px] font-semibold">Send</span>
          )}
        </Button>
      )}
    </div>
  );
};
