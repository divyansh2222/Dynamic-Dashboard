"use client";
import { useState, useEffect } from "react";
import { FaHome, FaTable, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // Track screen size

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint (768px)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar (Hidden on Mobile) */}
      {!isMobile && (
        <div
          className={`h-screen bg-blue-100 dark:bg-darkbackground border-r-2 dark:text-white transition-all duration-300 fixed z-40
          ${isExpanded ? "w-64" : "w-20"} md:block hidden`}
        >
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
              <Image
                alt="Logo"
                src="/1714654790075-removebg-preview.png"
                height={40}
                width={40}
              />
              <span className={`ml-2 text-xl font-bold ${isExpanded ? "block" : "hidden"}`}>
                Trisanco
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full hover:bg-red-300 transition-all"
            >
              {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col mt-4 mx-2 space-y-2">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-darkbackground transition-all"
              >
                <item.icon className="text-lg" />
                <span className={`ml-4 transition-all ${isExpanded ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

const menuItems = [
  { label: "Home", href: "/dashboard", icon: FaHome },
  { label: "Table", href: "/table", icon: FaTable },
  { label: "Member", href: "/membercreate", icon: MdPersonAddAlt1 },
  { label: "Request Member", href: "/requestmember", icon: MdPersonAddAlt1 },
  { label: "Current Member", href: "/currentmember", icon: MdPersonAddAlt1 },
];

export default Sidebar;

