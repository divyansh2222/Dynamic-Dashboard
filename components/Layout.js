"use client";

import NavBar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <NavBar  />  

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto dark:text-white dark:bg-darkbackground p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;