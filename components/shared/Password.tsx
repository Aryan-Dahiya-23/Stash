"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import BackArrowIcon from "../../public/assets/back-arrow-icon.png";

interface PasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  verifyPassword: string;
  setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
  wallet: boolean;
  setWallet: React.Dispatch<React.SetStateAction<boolean>>;
  setCookie: () => void;
}

export const Password: React.FC<PasswordProps> = ({
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
  setCookie,
  setWallet,
}) => {
  const router = useRouter();

  const pathname = window.location.pathname;

  const [agreed, setAgreed] = useState<boolean>(false);

  const comparePassword = () => {
    if (password != verifyPassword) {
      toast("Passwords don't match!", {
        icon: "❌",
      });
    } else if (password.length < 5) {
      toast.error("Password should be of minimum 5 characters");
    } else {
      setCookie();
    }
  };

  const resetWallet = () => {
    Cookies.remove("encryptedData");
    toast("Wallet successfully reset", {
      icon: "✅",
    });
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <div className="w-[310px] h-[380px] mt-3 flex flex-col justify-center items-center">
        {pathname === "/import" && (
          <button
            onClick={() => setWallet(false)}
            className="absolute top-2 left-2 focus:outline-none ml-2 mt-4"
          >
            <Image
              src={BackArrowIcon}
              width={30}
              height={30}
              alt="Back Arrow"
            />
          </button>
        )}
        <div className="text-center text-[#DEE0E3] text-[24px] font-semibold">
          {pathname === "/verify" ? "Enter your password" : "Create a password"}
        </div>

        <div className="text-center text-[#dde0e3] text-[15px] font-medium mt-4 mb-8">
          Use this password to securely unlock your wallet on this device.
        </div>

        <input
          type="password"
          className="w-[290px] h-[47px] bg-[#34568B] rounded-xl text-left pl-7 text-[15px] font-SE placeholder-[#CECECE] text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-5"></div>

        <input
          type="password"
          className="w-[290px] h-[47px] bg-[#34568B] rounded-xl text-left pl-7 text-[15px] font-medium placeholder-[#CECECE] text-white"
          placeholder="Confirm password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        {pathname === "/verify" && (
          <Button onClick={resetWallet} variant="link" className="ml-auto mt-2">
            Reset Wallet
          </Button>
        )}
      </div>

      <div className="flex items-center mr-[90px]">
        <input
          type="checkbox"
          className="w-[12px] h-[12px] mr-2"
          onClick={() => setAgreed(!agreed)}
        />
        <span className="text-[#868f9c] text-[12px]">
          I agree to the <span className="text-white">Terms of Service</span>
        </span>
      </div>

      <Button
        onClick={comparePassword}
        disabled={
          password.length === 0 || verifyPassword.length === 0 || !agreed
        }
        className="w-[300px] h-[50px] mt-4 rounded-[15px]  bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
      >
        <span className="text-white text-[15px] font-semibold">Continue</span>
      </Button>
    </>
  );
};
