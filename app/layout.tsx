import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import CursorTrail from "@/components/CursorTrail"; // ← ekledik

const inter = Inter({ subsets: ["latin"] });

// client-only StarsCanvas
const StarsCanvas = dynamic(() => import("@/components/main/StarBackground"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "İnovatif 360",
  description: "İnovatif 360 ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        <CursorTrail />
        {children}
        <Footer />
      </body>
    </html>
  );
}
