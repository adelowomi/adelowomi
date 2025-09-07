/* eslint-disable react/no-unknown-property */
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { HelloIcon, LogoIcon } from "@/icons";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/music", label: "Music" },
    { href: "/event", label: "Event" },
    { href: "/volunteer", label: "Volunteer" },
  ];

  return (
    <div className="flex justify-between items-center px-28 py-4">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center">
          <LogoIcon />
        </Link>
        <ul className="flex justify-between gap-12">
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
      <div>
        <button className="px-6 py-3 rounded-lg button-gradient font-archivo text-primary flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300">
          Say Hello
          <HelloIcon />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
