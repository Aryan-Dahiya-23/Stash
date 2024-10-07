/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ProfileImageIcon from "../../public/assets/profile-picture.png";
import DropDownIcon from "../../public/assets/drop-down icon.png";
import SettingsIcon from "../../public/assets/settings-icon.png";
import { useEffect, useState } from "react";

interface HeaderProps {
  publicKey: string;
  customName: string;
  setNameGeneration: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  copyAddress: () => void;
  logout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  publicKey,
  customName,
  setNameGeneration,
  setShowQR,
  setIsSendTransaction,
  copyAddress,
  logout,
}) => {
  const refreshHome = () => {
    setNameGeneration(false);
    setShowQR(false);
    setIsSendTransaction(false);
  };
  return (
    <div className="w-full flex justify-center items-center text-[#DEE0E3] text-[14px] mt-6 relative">
      <button
        onClick={refreshHome}
        className="flex justify-center items-center mr-1 focus:outline-none"
      >
        <Image
          src={ProfileImageIcon}
          width={26}
          height={26}
          alt="Profile Image"
        />
      </button>

      <div onClick={copyAddress} className="mx-1 text-sm hover:cursor-pointer">
        {customName.length > 0 ? (
          customName
        ) : publicKey.length > 0 ? (
          `${publicKey.slice(0, 3)}...${publicKey.slice(-3)}`
        ) : (
          <Skeleton className="h-4 w-[70px]" />
        )}
      </div>

      <button
        disabled={customName.length > 0}
        onClick={() => setNameGeneration(true)}
        className="flex justify-center items-center ml-1 focus:outline-none"
      >
        <Image src={DropDownIcon} width={25} height={25} alt="Dropdown Icon" />
      </button>

      <button
        onClick={() => logout()}
        className="absolute left-3 focus:outline-none"
      >
        {/* <Image src={MenuIcon} width={25} height={30} alt="Menu Icon" /> */}
        <LogOut className="h-[30px] w-[25px]" />
      </button>

      <button className="absolute right-3 focus:outline-none">
        <Image src={SettingsIcon} width={28} height={28} alt="Settings Icon" />
      </button>
    </div>
  );
};
