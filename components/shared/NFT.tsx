import Image from "next/image";
import NFT1 from "../../public/assets/nft1.png";
import NFT2 from "../../public/assets/nft2.png";
import NFT3 from "../../public/assets/nft3.png";
import NFT4 from "../../public/assets/nft4.png";

export const NFT = () => {
  return (
    <div className="min-h-[480px] ">
      <div className=" grid grid-cols-2 gap-4 mt-6">
        <div className="w-[160px] h-[200px] bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center hover:bg-[#030811] transition duration-200">
          <Image
            src={NFT1}
            height={145}
            width={135}
            className="object-cover rounded-lg mb-2"
            alt="NFT 1"
          />
          <span className="text-[#babfc7] text-[14px] font-semibold">
            DeGod #8290
          </span>
        </div>

        <div className="w-[160px] h-[200px] bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center hover:bg-[#030811] transition duration-200">
          <Image
            src={NFT2}
            height={145}
            width={135}
            className="object-cover rounded-lg mb-2"
            alt="NFT 2"
          />

          <span className="text-[#babfc7] text-[14px] font-semibold">
            Azuki #6503
          </span>
        </div>

        <div className="w-[160px] h-[200px] bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center hover:bg-[#030811] transition duration-200">
          <Image
            src={NFT3}
            height={145}
            width={135}
            className="object-cover rounded-lg mb-2"
            alt="NFT 3"
          />
          <span className="text-[#babfc7] text-[14px] font-semibold">
            Clone #11789
          </span>
        </div>

        <div className="w-[160px] h-[200px] bg-[#03080f]/40 rounded-[15px] flex flex-col justify-center items-center hover:bg-[#030811] transition duration-200">
          <Image
            src={NFT4}
            height={145}
            width={135}
            className="object-cover rounded-lg mb-2"
            alt="NFT 4"
          />
          <span className="text-[#babfc7] text-[14px] font-semibold">
            BAYC #3427
          </span>
        </div>
      </div>
    </div>
  );
};
