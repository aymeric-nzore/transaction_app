import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transaction App",
  description: "by @Aymeric",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="night">
      <body
        className={`${poppins}`}
      >
        <Toaster />
        <div className="flex justify-center items-center min-h-screen my-5">
          {children}
        </div>
      </body>
    </html>
  );
}
