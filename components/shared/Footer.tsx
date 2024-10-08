import Image from "next/image";
import HomeIcon from "../../public/assets/home-page-icon.png";
import ClickedHomeIcon from "../../public/assets/home-page-onclick-icon.png";
import SwapTokenIcon from "../../public/assets/swap-icon.png";
import NFTIcon from "../../public/assets/nft-icon.png";
import ClickedNFTIcon from "../../public/assets/nft-onclick-icon.png";
import VaultIcon from "../../public/assets/vault-icon.png";
import ClickedVaultIcon from "../../public/assets/vault-onclick-icon.png";
import TransactionIcon from "../../public/assets/transaction-icon.png";

interface FooterProps {
  showNFT: boolean;
  setShowNFT: React.Dispatch<React.SetStateAction<boolean>>;
  showVault: boolean;
  setShowVault: React.Dispatch<React.SetStateAction<boolean>>;
  showWallet: boolean;
  setShowWallet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSendTransactionDone: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Footer: React.FC<FooterProps> = ({
  showNFT,
  setShowNFT,
  showVault,
  setShowVault,
  showWallet,
  setShowWallet,
  setIsSendTransaction,
  setIsSendTransactionDone,
  setShowQR,
}) => {
  return (
    <div
      className={`w-[360px] h-[60px] mt-3 bg-[#0A1527] flex justify-center items-center flex-col p-3 `}
    >
      <div className="grid grid-cols-5 gap-2 mt-2 mb-2 w-full">
        <button
          onClick={() => {
            setShowNFT(false);
            setShowVault(false);
            setShowWallet(true);
          }}
          className="flex justify-center items-center w-full"
        >
          <Image
            src={showWallet ? ClickedHomeIcon : HomeIcon}
            height={30}
            width={30}
            alt="Home Icon"
          />
        </button>
        <button
          onClick={() => {
            setShowVault(false);
            setShowWallet(false);
            setIsSendTransaction(false);
            setIsSendTransactionDone(false);
            setShowQR(false);
            setShowNFT(true);
          }}
          className="flex justify-center items-center w-full"
        >
          <Image
            src={showNFT ? ClickedNFTIcon : NFTIcon}
            height={30}
            width={30}
            alt="NFT Icon"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <Image
            src={SwapTokenIcon}
            height={30}
            width={30}
            alt="Swap Token Icon"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <Image
            src={TransactionIcon}
            height={30}
            width={30}
            alt="Transaction Icon"
          />
        </button>
        <button
          onClick={() => {
            setShowWallet(false);
            setShowNFT(false);
            setIsSendTransaction(false);
            setIsSendTransactionDone(false);
            setShowQR(false);
            setShowVault(true);
          }}
          className="flex justify-center items-center w-full"
        >
          <Image
            src={showVault ? ClickedVaultIcon : VaultIcon}
            height={30}
            width={30}
            alt="Vault Icon"
          />
        </button>
      </div>
    </div>
  );
};
