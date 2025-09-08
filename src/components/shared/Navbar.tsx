/* eslint-disable react/no-unknown-property */
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { HelloIcon, LogoIcon } from "@/icons";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/music", label: "Music" },
    { href: "/event", label: "Event" },
    { href: "/volunteer", label: "Volunteer" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center px-6 sm:px-12 lg:px-28 py-4 relative z-40">
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="flex items-center">
          <LogoIcon />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex justify-between gap-12">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <li
                key={link.href}
                className={`font-normal font-archivo uppercase text-xl ${
                  isActive ? "text-secondary" : "text-primary"
                }`}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop Say Hello Button */}
      <div className="hidden lg:block">
        <button className="px-6 py-3 rounded-lg button-gradient font-archivo text-primary flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300">
          Say Hello
          <HelloIcon />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1 relative z-50 touch-manipulation"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        style={{ pointerEvents: "auto" }}
      >
        <span
          className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm z-[60] border-t border-[#FCFCFC33]">
          <ul className="flex flex-col py-4">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href} className="px-6 py-3">
                  <Link
                    href={link.href}
                    className={`font-normal font-archivo uppercase text-lg ${
                      isActive ? "text-secondary" : "text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="px-6 py-3">
              <button className="w-full px-6 py-3 rounded-lg button-gradient font-archivo text-primary flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300">
                Say Hello
                <HelloIcon />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
