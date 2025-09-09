import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Client-only components
const Navbar = dynamic(() => import("@/components/main/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/main/Footer"), { ssr: false });
const CursorTrail = dynamic(() => import("@/components/CursorTrail"), { ssr: false });
const StarsCanvas = dynamic(() => import("@/components/main/StarBackground"), { ssr: false });

export const metadata: Metadata = {
  title: "İnovatif 360",
  description: "İnovatif 360",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
