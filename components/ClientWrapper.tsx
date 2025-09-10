'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
const StarsCanvas = dynamic(() => import("@/components/main/StarBackground"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-[#030014] z-[-1]" />
});

const Navbar = dynamic(() => import("@/components/main/Navbar"), {
    ssr: false,
    loading: () => <div className="h-16 bg-transparent" />
});

const Footer = dynamic(() => import("@/components/main/Footer"), {
    ssr: false,
    loading: () => <div className="h-32 bg-transparent" />
});

const CursorTrail = dynamic(() => import("@/components/CursorTrail"), {
    ssr: false,
    loading: () => null
});

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-[#030014]">
                {/* Loading skeleton */}
                <div className="animate-pulse">
                    <div className="h-16 bg-purple-900/20" />
                    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-purple-900/10">
                        {children}
                    </div>
                    <div className="h-32 bg-purple-900/20" />
                </div>
            </div>
        );
    }

    return (
        <>
            <StarsCanvas />
            <Navbar />
            <CursorTrail />
            {children}
            <Footer />
        </>
    );
}
