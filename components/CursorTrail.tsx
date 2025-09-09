"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "../public/rlogo.png";

const CursorTrail = () => {
    const logoRef = useRef<HTMLDivElement | null>(null);
    const trailContainerRef = useRef<HTMLDivElement | null>(null);
    const logoSize = 60; // logo boyutu

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!logoRef.current || !trailContainerRef.current) return;

            // Logoyu fareye taşı
            gsap.to(logoRef.current, {
                x: e.clientX - logoSize / 2,
                y: e.clientY - logoSize / 2,
                duration: 0.1,
                ease: "power2.out",
            });

            // Partikül oluştur (logonun ortasından)
            const trail = document.createElement("div");
            trail.className = "cursor-trail";
            trail.style.position = "fixed";
            trail.style.left = `${e.clientX - logoSize / 2}px`;
            trail.style.top = `${e.clientY - logoSize / 2}px`;
            trail.style.pointerEvents = "none";
            trail.style.zIndex = "9999";

            const img = document.createElement("img");
            img.src = logo.src;
            img.style.width = "30px";
            img.style.height = "30px";
            img.style.borderRadius = "50%";
            img.style.objectFit = "cover";
            trail.appendChild(img);

            trailContainerRef.current.appendChild(trail);

            gsap.fromTo(
                trail,
                { scale: 1, opacity: 1 },
                {
                    scale: 0.2,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => trail.remove(),
                }
            );
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <>
            {/* Logo sürekli fare altında */}
            <div
                ref={logoRef}
                className="fixed w-[60px] h-[60px] rounded-full pointer-events-none z-50"
                style={{
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${logo.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            {/* Partiküller için container */}
            <div
                ref={trailContainerRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
            ></div>
        </>
    );
};

export default CursorTrail;
