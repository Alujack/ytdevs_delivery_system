import Header from "@/components/customerNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="ex flex-col h-screen">
      <Header/>
    <main>{children}</main>
    </div>
  );
}
