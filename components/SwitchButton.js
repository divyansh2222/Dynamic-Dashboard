import React, { useState } from 'react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

const App = ({ setTheme }) => {
  const [isDark, setIsDark] = useState(true); // State to manage the theme

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark); // Toggle the theme state
  };

  return (
    <div
      onClick={handleThemeToggle}
      className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-7 h-7 flex items-center justify-center rounded-full bg-white text-black transition-transform duration-300 transform ${
          isDark ? 'translate-x-1' : 'translate-x-9'
        }`}
      >
        {isDark ? <IoMdMoon className="text-gray-800" /> : <IoMdSunny className="text-yellow-500" />}
      </div>
    </div>
  );
};

export default App;
