import Image from "next/image";
import NoteIcon from "../../public/assets/note_icon.png";

export const Vault = () => {
  return (
    <div className="min-h-[480px]">
      <div className="w-[330px] h-[30px] bg-[#20375C] mt-5 rounded-[8px] flex justify-center items-center focus:outline-none hover:bg-[#030c1b] transition duration-200">
        <input
          type="text"
          className="w-full h-full bg-transparent text-left pl-4 pr-10 text-[#ffffff] text-[15px] placeholder-[#CECECE] outline-none"
          placeholder="Search"
        />
      </div>

      <div className="mt-[20px] flex items-center justify-between">
        <div className="flex w-full">
          <h3 className="text-left text-[#DEE0E3] text-[18px] font-semibold">
            August
          </h3>
          <Image
            src={NoteIcon}
            height={25}
            width={25}
            className="ml-[235px] mb"
            alt="Notes Icon"
          />
        </div>
      </div>
      <button className="w-[330px] h-[50px] mt-2 bg-[#03080F]/40 rounded-[13px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
        <div className="flex flex-col justify-start ml-4">
          <span className="text-[#DEE0E3] text-[15px] font-semibold text-left">
            Solana Event
          </span>
          <span className="text-[#727171] text-[12px] font-semibold text-left">
            18/08/24
          </span>
        </div>

        <Image
          src={NoteIcon}
          height={25}
          width={25}
          className="ml-auto"
          alt="Notes Icon"
        />
      </button>

      <div className="mt-[15px]">
        <h3 className="text-left text-[#DEE0E3] text-[18px] font-semibold ml-2">
          March
        </h3>
        <button className="w-[330px] h-[50px] mt-2 bg-[#03080F]/40 rounded-[13px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
          <div className="flex flex-col justify-start ml-4">
            <span className="text-[#DEE0E3] text-[15px] font-semibold text-left">
              Private{" "}
            </span>
            <span className="text-[#727171] text-[12px] font-semibold text-left">
              29/03/24
            </span>
          </div>

          <Image
            src={NoteIcon}
            height={25}
            width={25}
            className="ml-auto"
            alt="Notes Icon"
          />
        </button>
      </div>
      <div className="mt-[15px]">
        <h3 className="text-left text-[#DEE0E3] text-[18px] font-semibold ml-2">
          January
        </h3>
        <button className="w-[330px] h-[50px] mt-2 bg-[#03080F]/40 rounded-[13px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
          <div className="flex flex-col justify-start ml-4">
            <span className="text-[#DEE0E3] text-[15px] font-semibold text-left">
              Important info
            </span>
            <span className="text-[#727171] text-[12px] font-semibold text-left">
              30/01/24
            </span>
          </div>
          <Image
            src={NoteIcon}
            height={25}
            width={25}
            className="ml-auto"
            alt="Notes Icon"
          />
        </button>
      </div>
      <div className="mt-[15px]">
        <h3 className="text-left text-[#DEE0E3] text-[18px] font-semibold ml-2">
          December 2023
        </h3>
        <button className="w-[330px] h-[50px] mt-2 bg-[#03080F]/40 rounded-[13px] flex items-center transition duration-300 ease-in-out hover:bg-[#0A1527] p-2">
          <div className="flex flex-col justify-start ml-4">
            <span className="text-[#DEE0E3] text-[15px] font-semibold text-left">
              Colosseum ID & Password
            </span>
            <span className="text-[#727171] text-[12px] font-semibold text-left">
              25/12/23
            </span>
          </div>
          <Image
            src={NoteIcon}
            height={25}
            width={25}
            className="ml-auto"
            alt="Notes Icon"
          />
        </button>
      </div>
    </div>
  );
};
