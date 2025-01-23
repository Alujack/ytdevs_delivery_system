import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body>
        <AuthProvider>
        <main>{children}</main></AuthProvider>
      </body>
    </html>
    
  );
}
