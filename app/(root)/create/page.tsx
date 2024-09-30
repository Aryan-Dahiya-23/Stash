"use client";

import * as React from "react";
import { Keypair } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [mnemonic, setMnemonic] = useState<string>("");
  // const [wallet, setWallet] = useState<object>(
  //   JSON.parse(localStorage.getItem("wallet") || "{}")
  // );

  const [wallet, setWallet] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const storedWallet = localStorage.getItem("wallet");

      const storedWallet = null;

      if (storedWallet) {
        setWallet(JSON.parse(storedWallet));
      } else {
        // Redirect to login if no wallet is found
        router.push("/login");
      }
    }
  }, [router]);

  function generateWallet() {
    // Generate a new 12-word mnemonic phrase
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    console.log(`Generated Mnemonic: ${mnemonic}`);

    // Convert mnemonic to a seed
    const seed = mnemonicToSeedSync(newMnemonic);

    // Define the derivation path for Solana (BIP44: m/44'/501'/0'/0')
    const path = `m/44'/501'/0'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Generate keypair from the derived seed
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Convert the keypair to Solana-compatible public and private keys
    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
    const publicKey = solanaKeypair.publicKey.toBase58();
    const privateKey = Buffer.from(solanaKeypair.secretKey).toString("hex");
    setWallet({ publicKey, privateKey });

    // localStorage.setItem("wallet", JSON.stringify({ publicKey, privateKey }));
  }

  return (
    <>
      {Object.keys(wallet).length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <Button className="bg-blue-400" onClick={generateWallet}>
            Generate Wallet
          </Button>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4">
            Your Secret Recovery Phrase
          </h1>

          <p className="text-center text-gray-400 mb-6">
            This phrase unlocks your wallet. Do <strong>NOT</strong> share.
            Write it down on a paper and store securely.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            {mnemonic.split(" ").map((word, index) => (
              <div
                key={index}
                className="border border-gray-600 p-2 rounded-lg text-center"
              >
                <span className="text-gray-500">{index + 1}.</span>{" "}
                <span>{word}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox id="save-recovery-phrase" />
            <label
              htmlFor="save-recovery-phrase"
              className="text-gray-400 select-none"
            >
              My Secret Recovery Phrase is <strong>saved</strong>.
            </label>
          </div>
          <Button asChild className="w-full bg-blue-500 text-white">
            <Link href="/wallet">Continue </Link>
          </Button>
        </div>
      )}
    </>
  );
}

// 25X7yq3Eru5Zq2c7uejy1xYV12X3qvHqosthQ3XqA5ZAYtcuPD4Bz7xHW1bEfPELtmHb5owCnudUbYnXoQ993gXV
