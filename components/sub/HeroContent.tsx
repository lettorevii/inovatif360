"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import {
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  CursorArrowRaysIcon
} from "@heroicons/react/24/solid";
import Spline from "@splinetool/react-spline";
import { Typewriter } from "react-simple-typewriter";

// GSAP eklentilerini kaydet
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HeroContent = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ana arka plan animasyonu
      gsap.to(".bg-gradient-animated", {
        backgroundPosition: "200% 200%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Floating particles - daha karmaşık hareket
      gsap.timeline({ repeat: -1 })
        .to(".floating-particle", {
          y: -50,
          x: 30,
          rotation: 180,
          scale: 1.2,
          duration: 4,
          stagger: 0.3,
          ease: "power2.inOut",
        })
        .to(".floating-particle", {
          y: 30,
          x: -20,
          rotation: 360,
          scale: 0.8,
          duration: 3,
          stagger: 0.2,
          ease: "power2.inOut",
        });

      // Orb animasyonu
      gsap.to(orbRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Yazı karakterlerini tek tek animasyonla gösterme
      gsap.fromTo(".letter",
        {
          y: 50,
          opacity: 0,
          rotateX: -90
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );

      // Glow efekti pulse
      gsap.timeline({ repeat: -1 })
        .to(".glow-effect", {
          scale: 1.1,
          opacity: 0.4,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(".glow-effect", {
          scale: 1.3,
          opacity: 0.1,
          duration: 2,
          ease: "power2.inOut",
        });

      // Mouse follower animasyonu
      const handleMouseMove = (e: MouseEvent) => {
        gsap.to(mouseFollowerRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Yazı efektleri
      gsap.timeline({ repeat: -1, delay: 2 })
        .to(".text-glow", {
          textShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(".text-glow", {
          textShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(".text-glow", {
          textShadow: "0 0 60px rgba(59, 130, 246, 0.4)",
          duration: 1.5,
          ease: "power2.inOut",
        });

      // Buton dalga efekti
      gsap.to(".button-wave", {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  // Spline model yüklendiğinde çalışacak fonksiyon - sadece temel ayarlar
  function onLoad(splineApp: any) {
    const obj = splineApp.findObjectByName("Cube");
    if (obj) {
      obj.scale.x = 2;
      obj.scale.y = 2;
      obj.scale.z = 2;
    }

    const cam = splineApp.findObjectByName("Camera");
    if (cam) {
      cam.position.z = 400;
    }
  }

  // Button hover animasyonu
  const handleButtonHover = () => {
    gsap.timeline()
      .to(buttonRef.current, {
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.6)",
        duration: 0.3,
        ease: "power2.out"
      })
      .to(".button-icon", {
        x: 5,
        duration: 0.3,
      }, 0);
  };

  const handleButtonLeave = () => {
    gsap.timeline()
      .to(buttonRef.current, {
        scale: 1,
        boxShadow: "0 10px 20px rgba(147, 51, 234, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      })
      .to(".button-icon", {
        x: 0,
        duration: 0.3,
      }, 0);
  };

  // Yazıyı harflere ayırma fonksiyonu
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Mouse Follower */}
      <div
        ref={mouseFollowerRef}
        className="fixed w-5 h-5 bg-purple-400 rounded-full pointer-events-none z-50 opacity-60 blur-sm"
      />

      {/* Koyu Mor Animated Background */}

      {/* Floating Particles */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full opacity-40"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: ['#a855f7', '#ec4899', '#3b82f6'][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Orbital Background Element */}
      <div
        ref={orbRef}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
      />

      <motion.div
        ref={heroRef}
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-between px-20 mt-40 h-[100vh] w-full z-[20] gap-10 relative"
      >
        {/* Sol taraf: Lorem Yazılar */}
        <div ref={textRef} className="flex flex-col ml-16 gap-5 max-w-[600px] relative">
          {/* Glow Effect */}
          <div className="glow-effect absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-pink-600/15 to-blue-600/20 rounded-3xl blur-2xl -z-10" />

          <motion.div
            variants={slideInFromTop}
            className="welcome-badge group py-[10px] px-[12px] border border-purple-400/40 opacity-[0.9] flex items-center w-fit rounded-full backdrop-blur-md bg-purple-800/20 hover:bg-purple-700/30 transition-all duration-500 cursor-pointer shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.05, borderColor: "#a855f7" }}
          >
            <SparklesIcon className="text-purple-300 mr-3 h-5 w-5 group-hover:animate-spin transition-transform duration-500" />
            <h1 className="Welcome-text text-[14px] font-medium text-purple-100">
              Lorem ipsum dolor sit amet
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white relative"
          >
            <span className="leading-tight text-glow">
              {splitText("Lorem ipsum ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">
                <Typewriter
                  words={["dolor sit", "consectetur", "adipiscing", "elit sed"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>{" "}
              {splitText("amet consectetur")}
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-purple-200 my-5 leading-relaxed font-light"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </motion.p>

          <div className="flex gap-4 mt-8">
            <motion.a
              ref={buttonRef}
              variants={slideInFromLeft(1)}
              className="group relative py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-center text-white cursor-pointer rounded-xl font-semibold shadow-xl shadow-purple-500/30 flex items-center gap-3 overflow-hidden"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button wave effect */}
              <div className="button-wave absolute inset-0 bg-white/20 rounded-full scale-0" />

              <span className="relative z-10">Lorem Ipsum</span>
              <ArrowRightIcon className="button-icon w-5 h-5 relative z-10 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>

            <motion.button
              variants={slideInFromLeft(1.2)}
              className="py-4 px-8 border-2 border-purple-400/40 text-purple-100 rounded-xl font-semibold hover:border-purple-400 hover:text-white transition-all duration-300 flex items-center gap-3 backdrop-blur-md hover:bg-purple-600/20 group relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Dolor Sit
              <div className="absolute inset-0 bg-purple-600/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
            </motion.button>
          </div>


        </div>

        {/* Sağ taraf: Spline - Animasyonsuz */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="flex-1 flex justify-center items-center relative"
        >
          <div
            ref={splineRef}
            className="w-full ml-96 mr-40 max-w-[600px] h-[600px] relative"
          >
            {/* Spline Container - Sadece statik görünüm */}
            <div className="w-full h-full rounded-2xl overflow-hidden backdrop-blur-md bg-purple-800/10 shadow-2xl shadow-purple-500/20 border border-purple-500/20">
              <Spline
                scene="https://prod.spline.design/ZLODGAIRGu5p28Tv/scene.splinecode"
                onLoad={onLoad}
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .bg-gradient-animated {
          animation: gradient-x 8s ease infinite;
        }
        
        .welcome-badge::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(45deg, #a855f7, #ec4899, #3b82f6, #a855f7);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          animation: gradient-x 3s ease infinite;
        }

        .letter {
          transition: all 0.3s ease;
        }

        .letter:hover {
          color: #ec4899;
          transform: translateY(-2px) scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default HeroContent;
