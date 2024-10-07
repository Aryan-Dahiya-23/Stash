/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";

interface ReceiveProps {
  publicKey: string;
  copyAddress: () => void;
  customName: string;
  showQR: boolean;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Receive: React.FC<ReceiveProps> = ({
  publicKey,
  copyAddress,
  customName,
  showQR,
  setShowQR,
}) => {
  const copyWallet = (type: string) => {
    if (type === "walletID") {
      navigator.clipboard.writeText(customName);
    } else {
      navigator.clipboard.writeText(publicKey);
    }
    toast("Copied!", {
      icon: "📋",
    });
  };
  return (
    <div className="w-[310px] relative min-h-[460px] mt-5 bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center">
      <Button
        onClick={() => setShowQR(false)}
        variant="destructive"
        className="absolute h-9 w-9 top-3 right-3 rounded-full"
      >
        X
      </Button>

      <div className="text-center text-[#DEE0E3] text-[20px] font-semibold">
        Receive Address
      </div>

      <QRCode
        className="w-[140px] h-[140px] mt-3 mb-7 bg-white p-2 rounded-md"
        value={publicKey}
        size={256}
      />

      <div className="text-center text-[#DEE0E3]  text-[12px] font-semibold mb-2">
        Your Wallet ID:
      </div>
      <div
        onClick={() => copyWallet("walletID")}
        className="hover:cursor-pointer w-[260px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200"
      >
        <div className="text-center text-[#DEE0E3] text-[15px]">
          {customName}
        </div>
      </div>

      <div className="mt-5"></div>

      <div className="text-center text-[#DEE0E3]  text-[12px] font-semibold mb-2">
        Solana Wallet Address:
      </div>
      <div
        onClick={() => copyWallet("walletAddress")}
        className="w-[260px] h-[43px] hover:cursor-pointer  bg-[#3A5D94]/30 rounded-xl flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200"
      >
        <div className="text-center text-[#DEE0E3] text-[15px]">
          {publicKey.slice(0, 3)}...{publicKey.slice(-3)}
        </div>
      </div>
    </div>
  );
};
