"use client";
import { useState } from "react";
import { FaHome, FaTable, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { session } = useSession();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`h-full bg-blue-100 dark:bg-darkbackground border-r-2 dark:text-white transition-all duration-300 
        ${isExpanded ? "w-64" : "w-20"} flex flex-col`}
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
            <span
              className={`ml-2 text-xl font-bold transition-all duration-300 ${isExpanded ? "inline-block" : "hidden"}`}
            >
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
              <span
                className={`ml-4 transition-all duration-300 ${isExpanded ? "inline-block" : "hidden"}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
        <p>Your content goes here and will not be overlapped by the sidebar.</p>
      </div>
    </div>
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
