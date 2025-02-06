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
    <div
      className={`fixed top-0 left-0 h-screen bg-blue-100 dark:bg-darkbackground border-r-2 dark:text-white ${
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-300 z-50`}
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="text-xl flex items-center font-bold">
          <Image
            alt="Logo"
            src="/1714654790075-removebg-preview.png"
            height={40}
            width={40}
          />
          {isExpanded && <span className="ml-2">Trisanco</span>}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-red-300"
        >
          {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4 mx-2">
        {menuItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center p-3 gap-4 hover:bg-blue-50 dark:hover:bg-darkbackground rounded-lg"
          >
            <item.icon className="text-lg" />
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
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
