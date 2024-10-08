/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/lib/database";
import Name from "@/lib/database/models/name.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface NameGenerationProps {
  walletAddress: string;
  customName: string;
  setCustomName: React.Dispatch<React.SetStateAction<string>>;
  setNameGeneration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NameGeneration: React.FC<NameGenerationProps> = ({
  walletAddress,
  customName,
  setCustomName,
  setNameGeneration,
}) => {
  const [name, setName] = useState<string>("");

  const mapNameToAddress = async () => {
    if (name.length < 4) {
      toast.error("Minimum length should be aleast 4 characters.");
      return;
    }

    if (name.length > 20) {
      toast.error("Maximum length should only be 20 characters");
      return;
    }

    let isValid = /^[a-zA-Z0-9@]+$/.test(name);

    if (!isValid) {
      toast.error("Only letters and numbers are allowed");
      return;
    }

    if (!name.endsWith("@solana")) {
      toast.error("wallet name should end with @solana");
      return;
    }

    isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/.test(name);

    if (!isValid) {
      toast.error("Name should only contain one @ character");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/name/createName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, walletAddress }),
        }
      );

      if (response.status === 409) {
        toast.error("Wallet name already exists");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error creating name");
        return;
      }

      const data = await response.json();
      toast.success(`Name "${name}" linked to wallet`);
      setCustomName(name);
      setNameGeneration(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to map name to address.");
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && name.length > 0) {
        mapNameToAddress();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [name]);

  return (
    <div className="min-h-[480px]">
      <div className="w-[360px] relative rounded-lg flex flex-col items-center">
        <div className="w-[310px] h-[160px] mt-10 bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center">
          <div className="text-center text-[#DEE0E3] text-[22px] font-semibold mb-6">
            Claim Your Name
          </div>

          <div className="w-[260px] h-[43px] bg-[#3A5D94]/30 rounded-xl flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-full bg-transparent text-left pl-4 pr-10 text-[#ffffff] text-[15px] placeholder-[#CECECE] outline-none"
              placeholder="Example: joe@solana"
            />
          </div>
        </div>

        <div className="w-[310px] text-center text-[#dde0e3] text-[12px] font-medium mt-8">
          <div className="mb-6">
            The username you select will be linked to your wallet address and
            can be used for receiving funds.
          </div>
          <div className="mb-6">
            Changing your username after confirmation will cost $20.
          </div>
          <div className="mb-8 font-semibold">
            Please ensure your selection is final before proceeding.{" "}
          </div>
        </div>

        <button
          onClick={mapNameToAddress}
          className="w-[300px] h-[50px] rounded-[15px]  bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
        >
          <span className="text-white text-[15px] font-semibold">
            Confirm name
          </span>
        </button>
      </div>
    </div>
  );
};
