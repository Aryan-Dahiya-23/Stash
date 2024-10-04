import Image from "next/image";
import ProfileImageIcon from "../../public/assets/profile-picture.png";
import DropDownIcon from "../../public/assets/drop-down icon.png";
import MenuIcon from "../../public/assets/menu.png";
import SettingsIcon from "../../public/assets/settings-icon.png";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  publicKey: string;
  copyAddress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ publicKey, copyAddress }) => {
  return (
    <div className="w-full flex justify-center items-center text-[#DEE0E3] text-[14px] mt-6 relative">
      <button className="flex justify-center items-center mr-1 focus:outline-none">
        <Image
          src={ProfileImageIcon}
          width={26}
          height={26}
          alt="Profile Image"
        />
      </button>

      <div
        onClick={copyAddress}
        className="mx-1 text-base hover:cursor-pointer"
      >
        {publicKey ? (
          `${publicKey.slice(0, 3)}...${publicKey.slice(-3)}`
        ) : (
          <Skeleton className="h-4 w-[70px]" />
        )}
      </div>

      <button className="flex justify-center items-center ml-1 focus:outline-none">
        <Image src={DropDownIcon} width={25} height={25} alt="Dropdown Icon" />
      </button>

      <button className="absolute left-3 focus:outline-none">
        <Image src={MenuIcon} width={25} height={30} alt="Menu Icon" />
      </button>

      <button className="absolute right-3 focus:outline-none">
        <Image src={SettingsIcon} width={28} height={28} alt="Settings Icon" />
      </button>
    </div>
  );
};
