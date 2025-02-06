"use client";
import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import SwitchButton from "./SwitchButton";
import Link from "next/link";

function NavBar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex items-center justify-between p-4 dark:text-white dark:bg-darkbackground border-b">
      {/* Logo */}
     

      {/* Search Bar */}
      <div className="hidden sm:flex flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-fit  sm:w-2/3 px-4 py-1 border bg-blue-100 rounded-2xl focus:outline-none dark:bg-darkbackground focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
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
        <div className="relative">
          <img
            src={session?.user?.image || "/default-profile.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {!dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
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
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
