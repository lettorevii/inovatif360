"use client";
import React, { useRef, useEffect, useState } from "react";
import ProjectCard from "./sub/ProjectCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface Project {
    src: string;
    title: string;
    description: string;
}

interface GSAPWrapperProps {
    projects: Project[];
}

const GSAPWrapper = ({ projects }: GSAPWrapperProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [gsapLoaded, setGsapLoaded] = useState(false);

    // GSAP'ı güvenli şekilde yükle
    useEffect(() => {
        const loadGSAP = async () => {
            try {
                gsap.registerPlugin(ScrollTrigger);
                setGsapLoaded(true);
            } catch (error) {
                console.error('GSAP loading error:', error);
            }
        };

        loadGSAP();

        return () => {
            ScrollTrigger.killAll();
        };
    }, []);

    // Animasyonları başlat
    useEffect(() => {
        if (!gsapLoaded) return;

        const initAnimations = () => {
            const container = containerRef.current;
            const track = trackRef.current;
            const title = titleRef.current;

            if (!container || !track || !title) return;

            try {
                const totalWidth = track.scrollWidth - container.offsetWidth;

                // Title animasyonu
                gsap.fromTo(title,
                    { y: 50, opacity: 0, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Ana kaydırma animasyonu
                gsap.to(track, {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top center",
                        end: () => `+=${totalWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            setIsScrolling(self.isActive && self.progress > 0 && self.progress < 1);
                        },
                    },
                });

                // Kartlar animasyonu
                const cards = gsap.utils.toArray(track.children);
                gsap.fromTo(cards,
                    { y: 100, opacity: 0, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

            } catch (error) {
                console.error('Animation error:', error);
            }
        };

        const timeoutId = setTimeout(initAnimations, 200);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.killAll();
        };
    }, [gsapLoaded]);

    // Hover handlers
    const handleMouseEnter = (index: number, element: HTMLDivElement) => {
        if (!gsapLoaded) return;
        setHoveredIndex(index);

        gsap.to(element, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index: number, element: HTMLDivElement) => {
        if (!gsapLoaded) return;
        setHoveredIndex(null);

        gsap.to(element, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    if (!gsapLoaded) {
        return (
            <section className="py-20">
                <div className="animate-pulse">
                    <div className="h-12 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 rounded w-96 mx-auto mb-20"></div>
                    <div className="overflow-hidden relative w-full">
                        <div className="flex gap-10 justify-center py-8">
                            {projects.slice(0, 5).map((project, index) => (
                                <div key={index} className="flex-shrink-0 w-[500px] h-64 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="absolute top-40 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
            </div>

            <h1
                ref={titleRef}
                className="text-[40px] font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mb-20 z-10 relative cursor-default select-none"
                style={{
                    backgroundSize: "200% 100%",
                    animation: "gradient-x 3s ease infinite"
                }}
            >
                Creative Projects Portfolio
            </h1>

            {/* Scroll indicator */}
            {isScrolling && (
                <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-1 h-20 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full opacity-60"></div>
                        <div className="animate-bounce text-white/60 text-sm">Scroll</div>
                    </div>
                </div>
            )}

            <div
                ref={containerRef}
                className="overflow-hidden relative w-full"
            >
                <div ref={trackRef} className="flex gap-10 justify-center py-8">
                    {projects.map((project, index) => (
                        <div
                            key={`project-${index}`}
                            className="flex-shrink-0 w-[500px] cursor-pointer relative group"
                            onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                            onMouseLeave={(e) => handleMouseLeave(index, e.currentTarget)}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>

                            {/* Index number */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {index + 1}
                            </div>

                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200/50 mt-8 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ease-out"
                    style={{ width: isScrolling ? "100%" : "0%" }}
                ></div>
            </div>

            <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
        </section>
    );
};

export default GSAPWrapper;
