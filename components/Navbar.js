"use client";
import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import SwitchButton from "./SwitchButton";
import Link from "next/link";
function NavBar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const DropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <nav className="flex items-center justify-between dark:text-white dark:bg-darkbackground p-5 border-b ">
      {/* Search Bar */}
      {/* Search Bar */}
      <div className="flex-1 mx-4 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-2/3 px-4 py-1 border bg-blue-100 rounded-2xl focus:outline-none dark:bg-darkbackground focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex mr-60 md:mr-3 items-center space-x-4">
        {/* Messages */}
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Messages"
        >
          <FaMessage />
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Notifications"
        >
          <IoIosNotifications />
        </button>

        {/* Dark Mode Toggle */}

        <SwitchButton setTheme={setTheme} theme={theme} />

        {/* Profile Dropdown */}
        <div className="relative z-20 ">
          <img
            src={session?.user?.image}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => DropdownOpen()}
          />

          {/* Dropdown Menu */}

          {!dropdownOpen && (
            <div className="absolute right-0 pt-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Settings
              </Link>
              <Link
                href={"/login"}
                onClick={() => signOut()}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
