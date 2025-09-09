"use client";

import React, { useState, useEffect, useRef } from "react";
import { Skill_data } from "@/constants";
import { gsap } from "gsap";
import Spline from "@splinetool/react-spline";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // GSAP animasyonu tooltip değiştiğinde çalışacak
  useEffect(() => {
    if (!tooltipRef.current) return;

    if (hoveredSkill) {
      gsap.to(tooltipRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(tooltipRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [hoveredSkill]);

  return (
    <section
      id="skills"
      className="flex h-screen relative overflow-visible px-10 py-20"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Sol sütun: itemler */}
      <div className="w-1/4 z-20 flex flex-col gap-4">
        {Skill_data.map((skill) => (
          <div
            key={skill.skill_name}
            className="rounded-lg p-4 shadow-lg cursor-pointer hover:bg-purple-700 transition"
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
            }}
            onMouseEnter={() => setHoveredSkill(skill.skill_name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {skill.skill_name}
          </div>
        ))}
      </div>

      {/* Sağda hover gösterimi */}
      <div
        ref={tooltipRef}
        className="absolute bg-white bg-opacity-90 backdrop-blur-md z-50 p-4 rounded-2xl shadow-2xl flex flex-col items-center pointer-events-none transition-all"
        style={{
          top: mousePos.y - 300,
          left: mousePos.x + 5,
          scale: 0.8,
          opacity: 0,
        }}
      >
        {hoveredSkill && (
          <>
            <h3 className="text-lg font-bold mb-4 text-gray-800">{hoveredSkill}</h3>
            <img
              src={
                Skill_data.find((s) => s.skill_name === hoveredSkill)?.Image ||
                "/placeholder.png"
              }
              className="w-[500px] h-[500px] object-cover rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </>
        )}
      </div>

      {/* Sağda Spline sahnesi */}
      <div className="absolute top-0 right-0 w-4/5 h-full z-0">
        <Spline scene="https://prod.spline.design/bCczfZnGVU3QNBff/scene.splinecode" />
      </div>

      {/* Background video */}
      <div className="w-full h-full absolute top-0 left-0 -z-10 opacity-30">
        <video
          className="w-full h-full object-cover"
          preload="false"
          playsInline
          loop
          muted
          autoPlay
          src="/cards-video.webm"
        />
      </div>
    </section>
  );
};

export default Skills;
