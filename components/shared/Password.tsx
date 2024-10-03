/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

interface PasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  verifyPassword: string;
  setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
  setCookie: () => void;
}

export const Password: React.FC<PasswordProps> = ({
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
  setCookie,
}) => {
  return (
    <>
      <div className="w-[310px] h-[380px] mt-3 flex flex-col justify-center items-center">
        <div className="text-center text-[#DEE0E3] text-[24px] font-semibold">
          Create a password
        </div>

        <div className="text-center text-[#dde0e3] text-[15px] font-medium mt-4 mb-8">
          Use this password to securely unlock your wallet on this device.
        </div>

        <input
          type="text"
          className="w-[290px] h-[47px] bg-[#34568B] rounded-xl text-left pl-7 text-[15px] font-SE placeholder-[#CECECE] text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-5"></div>

        <input
          type="text"
          className="w-[290px] h-[47px] bg-[#34568B] rounded-xl text-left pl-7 text-[15px] font-medium placeholder-[#CECECE] text-white"
          placeholder="Confirm password"
        />
      </div>
      <div className="flex items-center mr-[90px]">
        <input type="checkbox" className="w-[12px] h-[12px] mr-2" />
        <span className="text-[#868f9c] text-[12px]">
          I agree to the <span className="text-white">Terms of Service</span>
        </span>
      </div>

      <button
        onClick={() => setCookie()}
        className="w-[300px] h-[50px] mt-4 rounded-[15px]  bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
      >
        <span className="text-white text-[15px] font-semibold">Continue</span>
      </button>
    </>
  );
};
