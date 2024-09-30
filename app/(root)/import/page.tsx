"use client";

import { Keypair } from "@solana/web3.js";
// import * as bip39 from "bip39";
// import nacl from "tweetnacl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const [privateKey, setPrivateKey] = useState<string>("");
  // const [mnemonic, setMnemonic] = useState<string>("");

  const importWallet = () => {
    const secretKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
    const solanaKeypair = Keypair.fromSecretKey(secretKey);
    const publicKey = solanaKeypair.publicKey.toBase58();
    localStorage.setItem("wallet", JSON.stringify({ publicKey, privateKey }));

    document.cookie = `publicKey=${encodeURIComponent(
      publicKey
    )}; path=/; max-age=604800; secure`; // 7 days
    document.cookie = `privateKey=${encodeURIComponent(
      privateKey
    )}; path=/; max-age=604800; secure`; // 7 days

    router.push("/wallet");
  };

  // const importWalletUsingSeedPhrase = async () => {
  //   try {
  //     // Validate the mnemonic phrase
  //     if (!bip39.validateMnemonic(mnemonic)) {
  //       alert("Invalid mnemonic seed phrase. Please try again.");
  //       return;
  //     }

  //     // Convert mnemonic to seed
  //     const seed = await bip39.mnemonicToSeed(mnemonic);

  //     console.log(seed);

  //     // Derive keypair from seed (Solana uses ed25519)
  //     const derivedSeed = seed.slice(0, 32);
  //     const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
  //     console.log(derivedSeed);
  //     console.log(keypair);

  //     // Create Solana Keypair from derived secret key
  //     const solanaKeypair = Keypair.fromSecretKey(
  //       Uint8Array.from(keypair.secretKey)
  //     );

  //     console.log(solanaKeypair);
  //     const publicKey = solanaKeypair.publicKey.toBase58();
  //     const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");

  //     console.log(publicKey);
  //     console.log(privateKey);

  //     // Save wallet info to localStorage
  //     localStorage.setItem("wallet", JSON.stringify({ publicKey, privateKey }));

  //     // Navigate to the wallet page
  //     router.push("/wallet");
  //   } catch (error) {
  //     console.error("Error importing wallet:", error);
  //     alert("Failed to import wallet. Please try again.");
  //   }
  // };

  return (
    <div className="h-full flex flex-row justify-center items-center">
      <form className="w-5/6 bg-gray-600 p-4 rounded-lg shadow-lg mt-16">
        <div className="mb-4 flex flex-col space-y-4">
          <Input
            id="inputField"
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter Your Private Key"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button
          type="button"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={importWallet}
        >
          Import
        </Button>

        {/* <Input
          id="inputField"
          type="text"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
          placeholder="Enter Your Mnemonic Seed Phrase"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          type="button"
          className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={importWalletUsingSeedPhrase}
        >
          Import Wallet
        </Button> */}
      </form>
    </div>
  );
}
