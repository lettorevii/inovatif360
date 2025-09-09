// components/ContactHero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";

const ContactHero = () => {
    const splineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!splineRef.current) return;

        // Modelin yumuşak dönme animasyonu
        gsap.to(splineRef.current, {
            rotationY: 360,
            duration: 60,
            repeat: -1,
            ease: "linear",
        });
    }, []);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#030014]">
            {/* Başlık */}
            <motion.h1
                initial={{ opacity: 0, y: -100, scale: 1.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-white text-[5vw] md:text-[8vw] font-extrabold text-center z-30 leading-tight drop-shadow-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                İNOVATİF 360
            </motion.h1>

            {/* 3D Model */}
            <div
                ref={splineRef}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
                <Spline
                    scene="https://prod.spline.design/ZNzc-xG7cDQB8WcK/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            {/* Yazının altına hafif parallax ve glow efektleri */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity, yoyo: true }}
                className="absolute w-[70%] h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 blur-xl opacity-40 bottom-20"
            />
        </section>
    );
};

export default ContactHero;
