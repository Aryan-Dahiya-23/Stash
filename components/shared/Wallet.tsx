import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import SendIcon from "../../public/assets/send-icon.png";
import ReceiveIcon from "../../public/assets/receive-icon.png";
import BuyIcon from "../../public/assets/buy-icon.png";
import SolanaLogoIcon from "../../public/assets/solana-logo.png";

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
  return (
    <div className="min-h-[480px]">
      <div className="w-full h-[55px] text-center text-[#DEE0E3] text-[38px] font-semibold mt-4">
        {solanaLivePrice > 0 ? (
          `$ ${(balance * solanaLivePrice).toFixed(2)}`
        ) : (
          <Skeleton className="h-10 w-[150px] m-auto" />
        )}
      </div>

      <div className="flex justify-center gap-3 mt-1">
        <div className="flex flex-col items-center text-[#6DFE8D] text-[13px] font-semibold mt-[2px]">
          <div>+ $ 343.2</div>
        </div>
        <button className="w-[61px] h-[26px] bg-[#193B45] rounded-[6px] flex justify-center items-center">
          <div className="flex flex-col items-center text-[#6DFE8D] text-[11px] font-semibold">
            <div>+ 14.65%</div>
          </div>
        </button>
      </div>

      <div className="w-[250px] grid grid-cols-3 gap-1 m-auto mb-4">
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

        <div className="flex flex-col items-center">
          <button className="w-[60px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center mt-4 focus:outline-none hover:bg-[#030811] transition duration-200">
            <Image src={BuyIcon} width={38} height={30} alt="Dropdown Icon" />
          </button>
          <span className="text-[#DEE0E3] text-[12px] font-medium mt-2">
            Buy
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
        <img
          src="./assets/tether-icon.png"
          alt="USDT Icon"
          className="w-[36px] h-[36px] ml-4"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            USDT
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            1545.45 USDT
          </span>
        </div>
      </button>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080F]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <img
          src="./assets/jupiter-logo.png"
          alt="Jupiter Icon"
          className="w-[42px] h-[42px] ml-[13px]"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            Jupiter
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            91.45 JUP
          </span>
        </div>
      </button>

      <button className="w-[330px] h-[60px] mt-3 bg-[#03080f]/40 rounded-[15px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <img
          src="./assets/wif_icon.png"
          alt="WIF Icon"
          className="w-[42px] h-[42px] ml-[13px]"
        />
        <div className="flex flex-col justify-start ml-6">
          <span className="text-white text-[15px] font-semibold text-left">
            WIF
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            9134.21 WIF
          </span>
        </div>
      </button>
    </div>
  );
};
