import toast from "react-hot-toast";

export const SwapTokens = () => {
  return (
    <div className="min-h-[480px]">
      <div className="w-[310px] h-[300px] mt-12 rounded-[12px] bg-[#274472] flex flex-col items-center justify-center">
        <div className="flex flex-col items-start w-full pl-4">
          <div className="text-[11px] text-[#B9B9B9] mb-2 font-semibold ml-2">
            You're paying
          </div>
          <div className="w-[280px] h-[75px] mb-4 rounded-[12px] bg-[#132441] flex items-center justify-between px-4">
            <button className="flex items-center w-[120px] h-[42px] bg-[#091425] text-white rounded-[12px] font-semibold">
              <img
                src="assets/solana-logo.png"
                alt="SOL Icon"
                className="w-[50px] h-[30px]"
              />
              <span className="text-[#DEE0E3] text-[15px] font-semibold ml-2">
                SOL
              </span>
              <img
                src="assets/drop-down icon.png"
                alt="Dropdown Icon"
                className="w-[25px] h-[25px] ml-[6px]"
              />
            </button>

            <div className="flex flex-col items-end justify-center">
              <span className="text-white text-[20px] font-semibold mr-1 mt-2">
                2.5
              </span>
              <span className="text-[#B9B9B9] text-[11px] mr-1">$412</span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <hr className="w-[112px] border-t-[1px] border-[#B9B9B9]" />
          <div className="mx-2">
            <img
              src="assets/swap-tokens.png"
              alt="Swap Icon"
              className="w-[30px] h-[30px]"
            />
          </div>
          <hr className="w-[112px] border-t-[1px] border-[#B9B9B9]" />
        </div>

        <div className="flex flex-col items-start w-full pl-4">
          <div className="text-[11px] text-[#B9B9B9] mb-2 font-semibold ml-2">
            To Receive
          </div>
          <div className="w-[280px] h-[75px] mb-4 rounded-[12px] bg-[#132441] flex items-center justify-between px-4">
            <button className="flex items-center w-[120px] h-[42px] bg-[#091425] text-white rounded-[12px] font-semibold">
              <img
                src="assets/tether-icon.png"
                alt="USDT Icon"
                className="w-[24px] h-[24px] ml-[10px] mr-3"
              />
              <span className="text-[#DEE0E3] text-[15px] font-semibold">
                USDT
              </span>
              <img
                src="assets/drop-down icon.png"
                alt="Dropdown Icon"
                className="w-[25px] h-[25px] ml-[5px]"
              />
            </button>

            <div className="flex flex-col items-end justify-center">
              <span className="text-white text-[20px] font-semibold mr-1 mt-2">
                $ 412.16
              </span>
              <span className="text-[#B9B9B9] text-[11px] mr-1">$412</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => toast("Coming Soon")}
        className="w-[300px] h-[50px] mt-6 rounded-[15px] bg-[#0A1527] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#0c192e]"
      >
        <span className="text-white text-[15px] font-semibold">Swap</span>
      </button>
    </div>
  );
};
