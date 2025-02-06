"use client";

import NavBar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex  h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className={`flex ${isSidebarOpen ? "w-100" : "w-20"} flex-col  flex-1`}>
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto dark:text-white dark:bg-darkbackground p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
