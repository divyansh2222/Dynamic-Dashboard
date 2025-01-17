"use client";
import { useState } from "react";
import { FaHome, FaTable } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    position: "",
  });

  const { session } = useSession();
  return (
    <div
      className={`flex flex-col h-screen bg-blue-100 dark:bg-darkbackground border-r-2 dark:text-white ${
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="text-xl flex flex-row transition-transform duration-300    items-center font-bold">
          <Image
            alt="image"
            src="/1714654790075-removebg-preview.png"
            height={40}
            width={40}
          ></Image>{" "}
          {isExpanded ? "Trisanco" : " "}
        </div>
        {isExpanded ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-red-300"
          >
            <FaAngleDoubleLeft />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full  hover:bg-red-300"
          >
            <FaAngleDoubleRight />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4 mx-4 ">
        <Link
          href="/dashboard"
          className="hover:bg-blue-50 dark:hover:border dark:hover:bg-darkbackground hover:shadow-xl p-4"
        >
          {isExpanded ? (
            <div className="flex items-center gap-6">
              {" "}
              <FaHome /> <p>Home </p>{" "}
            </div>
          ) : (
            <FaHome />
          )}
        </Link>
        {
          <Link
            href="/table"
            className="hover:bg-blue-50 dark:hover:border dark:hover:bg-darkbackground hover:shadow-xl p-4"
          >
            {isExpanded ? (
              <div className="flex items-center gap-6">
                <FaTable /> <p>Table</p>{" "}
              </div>
            ) : (
              <FaTable />
            )}
          </Link>
        }
        <Link
          href="/membercreate"
          className="hover:bg-blue-50 dark:hover:border dark:hover:bg-darkbackground hover:shadow-xl p-4"
        >
          {isExpanded ? (
            <div className="flex items-center gap-6">
              {" "}
              <MdPersonAddAlt1 />
              <p> Member</p>{" "}
            </div>
          ) : (
            <MdPersonAddAlt1 />
          )}
        </Link>
        <Link
          href="/requestmember"
          className="hover:bg-blue-50 dark:hover:border dark:hover:bg-darkbackground hover:shadow-xl p-4"
        >
          {isExpanded ? (
            <div className="flex items-center gap-6">
              {" "}
              <MdPersonAddAlt1 />
              <p> RequestMember</p>{" "}
            </div>
          ) : (
            <MdPersonAddAlt1 />
          )}
        </Link>
        <Link
          href="/currentmember"
          className="hover:bg-blue-50 dark:hover:border dark:hover:bg-darkbackground hover:shadow-xl p-4"
        >
          {isExpanded ? (
            <div className="flex items-center gap-6">
              {" "}
              <MdPersonAddAlt1 />
              <p> CurrentMember</p>{" "}
            </div>
          ) : (
            <MdPersonAddAlt1 />
          )}
        </Link>
      </nav>
    </div>
  );
};

// MenuItem Component
const MenuItem = ({ icon, label, isExpanded }) => (
  <div
    className="flex items-center p-3 space-x-4 hover:bg-gray-700 cursor-pointer"
    title={!isExpanded ? label : ""}
  >
    <div className="text-lg">{icon}</div>
    {isExpanded && <div className="text-sm">{label}</div>}
  </div>
);

export default Sidebar;
