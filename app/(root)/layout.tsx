import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[600px] w-[360px]  rounded-lg bg-gradient-to-b from-[#0b1524] via-[#182d52] to-[#26467c]">
      <Toaster />
      <main className="flex-1">{children}</main>
    </div>
  );
}
