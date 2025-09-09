"use client";
import React, { useEffect, useRef } from "react";
import lorem from "../../public/logo.jpg";
import amazon from "../../public/amazon.jpg";
import seo from "../../public/seo.jpg";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Encryption = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth / 2;

    gsap.fromTo(
      trackRef.current,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
      }
    );

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 2, y: 100, opacity: 0.3 }, // sayfa yüklenince büyük ve aşağıda
        {
          scale: 1,
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%", // scroll başlayınca
            end: "top 20%", // kaydırınca bitecek nokta
            scrub: true, // scroll ile senkron animasyon
          },
        }
      );
    }
  }, []);

  const logos = [lorem, amazon, seo, lorem, amazon, seo];

  return (
    <section className="py-10 bg-transparent">
      <h2
        ref={titleRef}
        className="text-[40px] font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        Lorem ipsum dolor sit.
      </h2>

      <div className="w-screen overflow-hidden">
        <div ref={trackRef} className="flex gap-14 w-max">
          {logos.concat(logos).map((img, index) => (
            <div
              key={index}
              className="logoItem flex-shrink-0 w-60 h-60 rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Encryption;
