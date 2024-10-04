export const Footer = () => {
  return (
    <div
      className={`w-[360px] h-[60px] mt-3 bg-[#0A1527] flex justify-center items-center flex-col p-3 `}
    >
      <div className="grid grid-cols-5 gap-2 mt-2 mb-2 w-full">
        <button className="flex justify-center items-center w-full">
          <img
            src="./assets/home-page-icon.png"
            alt="Icon 1"
            className="w-[30px] h-[30px]"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <img
            src="./assets/nft-icon.png"
            alt="Icon 2"
            className="w-[30px] h-[30px]"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <img
            src="./assets/swap-icon.png"
            alt="Icon 3"
            className="w-[30px] h-[30px]"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <img
            src="./assets/transaction-icon.png"
            alt="Icon 4"
            className="w-[30px] h-[30px]"
          />
        </button>
        <button className="flex justify-center items-center w-full">
          <img
            src="./assets/vault-icon.png"
            alt="Icon 5"
            className="w-[30px] h-[30px]"
          />
        </button>
      </div>
    </div>
  );
};
