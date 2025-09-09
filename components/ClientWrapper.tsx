'use client';

import dynamic from 'next/dynamic';

// Dynamic import'lar client component içinde
const Navbar = dynamic(() => import("./main/Navbar"), { ssr: false });
const Footer = dynamic(() => import("./main/Footer"), { ssr: false });
const CursorTrail = dynamic(() => import("./CursorTrail"), { ssr: false });
const StarsCanvas = dynamic(() => import("./main/StarBackground"), { ssr: false });

interface ClientWrapperProps {
    children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    return (
        <>
            <Navbar />
            <StarsCanvas />
            <CursorTrail />
            {children}
            <Footer />
        </>
    );
}
