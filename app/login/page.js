"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true); // Set initial state to `true` for sign-in

  const toggleLogin = () => {
    setIsLogin(!isLogin); // Toggle between sign-in and sign-up
  };

  return (
    <div className="flex h-screen ">
      {/* Left Side: Logo and Text */}
      <div className="flex flex-col dark:bg-darkbackground items-center justify-center w-1/2 bg-gray-100 p-8">
        <img
          src="/1714654790075.jpeg" // Replace with your logo path
          alt="Logo"
          className="w-32 mb-4 "
        />
        <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-white text-center">
          Sign in to continue and explore amazing features.
        </p>
      </div>
         
      {/* Right Side: Form */}
      <div className="flex items-center justify-center dark:bg-slate-800 w-1/2 bg-white p-8">
        <div className="w-full max-w-md shadow-md bg-slate-200 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 dark:text-black">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          {/* Form */}
          <form className="space-y-4">
            {/* Name Input (only for Sign-Up) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Confirm Password (only for Sign-Up) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-4 py-2 mb-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <FaGoogle />
            Sign in with Google
          </button>

          {/* GitHub Sign-In Button */}
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            <FaGithub />
            Sign in with GitHub
          </button>

          {/* Toggle Link */}
          <p className="text-sm text-gray-600 text-center mt-2">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={toggleLogin}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
