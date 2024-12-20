import Image from "next/image";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Skeleton } from "../ui/skeleton";
import SendIcon from "../../public/assets/send-icon.png";
import ReceiveIcon from "../../public/assets/receive-icon.png";
import BuyIcon from "../../public/assets/buy-icon.png";
import SolanaLogoIcon from "../../public/assets/solana-logo.png";
import TetherIcon from "../../public/assets/tether-icon.png";
import JupiterIcon from "../../public/assets/jupiter-logo.png";
import WifIcon from "../../public/assets/wif_icon.png";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface WalletProps {
  balance: number;
  solanaLivePrice: number;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Wallet: React.FC<WalletProps> = ({
  balance,
  solanaLivePrice,
  setShowQR,
  setIsSendTransaction,
}) => {
  const airdropSolana = () => {
    const walletPublicKey = Cookies.get("publicKey") || "";
    console.log(walletPublicKey);
    const connection = new Connection("https://api.devnet.solana.com");
    const publicKey = new PublicKey(walletPublicKey);

    connection
      .requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)
      .then((signature) => {
        console.log("Airdrop successful! Transaction signature:", signature);
        toast.success("Airdrop successful!");
      })
      .catch((error) => {
        toast.error("Airdrop limit exceed!");
        console.error("Airdrop failed:", error);
      });
  };
  return (
    <div className="min-h-[480px]">
      <div className="w-full h-[55px] text-center text-[#DEE0E3] text-[38px] font-semibold mt-4">
        {solanaLivePrice > 0 ? (
          `$ ${(balance * solanaLivePrice).toFixed(2)}`
        ) : (
          <Skeleton className="h-10 w-[150px] m-auto" />
        )}
      </div>

      <div className="w-[250px] grid grid-cols-3 gap-1 m-auto mb-6 mt-2">
        <div
          onClick={() => setIsSendTransaction(true)}
          className="flex flex-col items-center"
        >
          <button className="w-[60px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center mt-4 focus:outline-none hover:bg-[#030811] transition duration-200">
            <Image src={SendIcon} width={38} height={30} alt="Send Icon" />
          </button>
          <span className="text-[#DEE0E3] text-[12px] font-medium mt-2">
            Send
          </span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowQR(true)}
            className="w-[60px] h-[43px] bg-[#3A5D94]/30  rounded-xl flex justify-center items-center mt-4 focus:outline-none hover:bg-[#030811] transition duration-200"
          >
            <Image
              src={ReceiveIcon}
              width={38}
              height={30}
              alt="Receive Icon"
            />
          </button>
          <span className="text-[#DEE0E3] text-[12px] font-medium mt-2">
            Receive
          </span>
        </div>

        <div className="flex flex-col items-center" onClick={airdropSolana}>
          <button className="w-[60px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center mt-4 focus:outline-none hover:bg-[#030811] transition duration-200">
            <Image src={BuyIcon} width={38} height={30} alt="Dropdown Icon" />
          </button>
          <span className="text-[#DEE0E3] text-[12px] font-medium mt-2">
            Airdrop SOL
          </span>
        </div>
      </div>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080F]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <Image
          src={SolanaLogoIcon}
          className="mr-2"
          width={70}
          height={40}
          alt="Solana Icon"
        />
        <div className="flex flex-col justify-start">
          <span className="text-white text-[15px] font-semibold text-left">
            Solana
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            {solanaLivePrice > 0 ? (
              `${balance.toFixed(5)} SOL`
            ) : (
              <Skeleton className="h-4 w-16" />
            )}
          </span>
        </div>
      </button>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080F]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <Image
          src={TetherIcon}
          className="ml-4"
          height={36}
          width={36}
          alt="Tether Icon"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            USDT
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            0 USDT
          </span>
        </div>
      </button>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080F]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <Image
          src={JupiterIcon}
          className="ml-[13px]"
          height={42}
          width={42}
          alt="Jupiter Icon"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            Jupiter
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            0 JUP
          </span>
        </div>
      </button>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080f]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <Image
          src={WifIcon}
          className="ml-[13px]"
          height={42}
          width={42}
          alt="WIF Icon"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            WIF
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            0 WIF
          </span>
        </div>
      </button>
    </div>
  );
};
