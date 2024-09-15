export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-w-[375px] max-w-sm bg-black">
      <main className="h-full">{children}</main>
    </div>
  );
}
