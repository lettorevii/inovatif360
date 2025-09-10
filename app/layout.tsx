import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İnovatif 360 - Dijital Çözümler",
  description: "İnovatif 360 - Modern dijital çözümler ve teknolojiler",
  keywords: "inovatif, dijital, teknoloji, çözümler",
  authors: [{ name: "İnovatif 360" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "İnovatif 360",
    description: "İnovatif 360 - Modern dijital çözümler",
    type: "website",
    locale: "tr_TR",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#030014" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
