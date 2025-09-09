"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const services = [
    "Web Tasarım",
    "UI/UX Tasarım",
    "SEO Optimizasyon",
    "E-Ticaret Çözümleri",
    "Mobil Uygulama",
    "Dijital Pazarlama",
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Logo */}
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/rlogo.png"
            alt="logo"
            width={60}
            height={60}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            İnovatif 360
          </span>
        </a>

        {/* Menü */}
        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200 relative">

            <a href="/" className="cursor-pointer">
              Ana Sayfa
            </a>

            {/* Hizmetler Dropdown (Click ile) */}
            <div className="relative">
              <span
                className="cursor-pointer select-none"
                onClick={toggleDropdown}
              >
                Hizmetler
              </span>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#030014bf] backdrop-blur-md rounded-lg shadow-lg flex flex-col z-50">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href="#"
                      className="px-4 py-2 text-gray-200 hover:bg-purple-700 hover:text-white transition-colors"
                    >
                      {service}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="cursor-pointer">
              Case-Study
            </a>
            <a href="#" className="cursor-pointer">
              İletişim
            </a>
            <a href="#" className="cursor-pointer">
              Hakkımızda
            </a>
          </div>
        </div>

        {/* Sosyal ikonlar */}
        <div className="flex flex-row gap-5">
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
