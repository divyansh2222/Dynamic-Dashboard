"use client";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/Navbar";
import { MemberProvider } from "./context/MemberContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning='true'>
      <body>
        {/* <MemberProvider> */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionWrapper>
        <ToastContainer />
          {children}
        </SessionWrapper>
        </ThemeProvider>
        {/* </MemberProvider> */}
        
      </body>
    </html>
  );
}

