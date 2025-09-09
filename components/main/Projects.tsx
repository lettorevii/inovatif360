"use client";
import React, { useRef, useEffect } from "react";
import ProjectCard from "../sub/ProjectCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    { src: "/website.png", title: "Modern Web Design", description: "Responsive and interactive website development" },
    { src: "/website.png", title: "E-commerce Platform", description: "Full-stack online shopping solution" },
    { src: "/website.png", title: "Mobile App Development", description: "Cross-platform mobile applications" },
    { src: "/website.png", title: "Brand Identity", description: "Complete visual identity and branding" },
    { src: "/website.png", title: "Digital Marketing", description: "SEO and social media optimization" },
    { src: "/website.png", title: "UI/UX Design", description: "User-centered design solutions" },
    { src: "/website.png", title: "Web Analytics", description: "Data-driven insights and optimization" },
    { src: "/website.png", title: "Cloud Solutions", description: "Scalable cloud infrastructure" },
    { src: "/website.png", title: "API Development", description: "RESTful and GraphQL APIs" },
    { src: "/website.png", title: "Database Design", description: "Efficient database architecture" },
    { src: "/website.png", title: "DevOps Solutions", description: "Automated deployment and CI/CD" },
    { src: "/website.png", title: "Security Audit", description: "Comprehensive security analysis" },
    { src: "/website.png", title: "Performance Optimization", description: "Speed and efficiency improvements" },
  ];

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Title entrance animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.8,
          rotationY: 180
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Background parallax effect
      gsap.to(backgroundRef.current, {
        backgroundPositionX: "-200px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Main horizontal scroll
      const totalWidth = trackRef.current!.scrollWidth - containerRef.current!.offsetWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Individual card animations
      const cards = trackRef.current!.children;
      Array.from(cards).forEach((card, index) => {
        // Stagger entrance animation
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Floating animation during scroll
        gsap.to(card, {
          y: "random(-20, 20)",
          rotation: "random(-2, 2)",
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });

        // Hover effect enhancement
        const cardElement = card as HTMLElement;

        cardElement.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.1,
            rotationY: 5,
            z: 50,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Progress indicator
      const progressBar = document.createElement("div");
      progressBar.className = "fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 z-50 progress-bar";
      document.body.appendChild(progressBar);

      gsap.to(progressBar, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: () => `+=${totalWidth}`,
          scrub: true,
          onUpdate: (self) => {
            progressBar.style.width = `${self.progress * 100}%`;
          },
          onLeave: () => {
            gsap.to(progressBar, { opacity: 0, duration: 0.5 });
          }
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) progressBar.remove();
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 2px, transparent 2px)",
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <h1
        ref={titleRef}
        className="text-[40px] md:text-[60px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mb-20 z-10 relative title-glow"
      >
        Projelerim
      </h1>

      <div ref={containerRef} className="overflow-hidden relative w-full perspective-1000">
        <div ref={trackRef} className="flex gap-10 justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[500px] project-card transform-gpu"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .project-card {
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-glow {
          text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          position: relative;
        }

        .title-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1));
          border-radius: 10px;
          filter: blur(20px);
          z-index: -1;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.6;
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .particle {
          pointer-events: none;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .project-card {
            width: 350px !important;
          }
        }

        /* Custom scrollbar for horizontal scroll areas */
        ::-webkit-scrollbar {
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #9333ea, #06b6d4);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #0891b2);
        }
      `}</style>
    </section>
  );
};

export default Projects;
