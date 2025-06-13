"use client";

import "./globals.css";

import localFont from "next/font/local";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Modal from "@/components/modal/Modal";
import { cn } from "@/utils/cn";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const marginClass = pathname === "/" ? "mt-6" : "mt-10";
  return (
    <html className={`${pretendard.variable}`} lang="ko">
      <body
        className={cn(pretendard.className, "flex flex-col justify-center items-center bg-white")}
      >
        <div className={cn("w-full max-w-[71.25rem] mx-auto px-5 max-mb:px-4", marginClass)}>
          <Header />
          <main>{children}</main>
          <div id="modal-root" />
          <Modal />
        </div>
        <Footer />
      </body>
    </html>
  );
}
