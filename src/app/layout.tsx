import type { Metadata } from "next";

import { Geist } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import RootWrapper from "@/components/home/rootWrapper";
import { ToastContainer } from "react-toastify";

const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiger Classes",
  description: "Modern student management system for educational institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${geist.variable} font-geist`}>
        <body className="flex flex-col min-h-screen">
          <RootWrapper>
            {children}
          </RootWrapper>
          <ToastContainer theme="light" position="top-center" />
        </body>
      </html>
    </>
  );
};