import React, { useState } from 'react';
import { Space, Switch } from 'antd';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

const App = ({ setTheme }) => {
  const [isDark, setIsDark] = useState(true); // State to manage the theme

  const handleThemeToggle = (checked) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setIsDark(checked); // Update the state based on the switch position
  };

  return (
    <Space direction="vertical" >
      <Switch
        className="text-black dark:text-white text-center mt-2"
        checkedChildren={<IoMdSunny className='mt-1' />}
        unCheckedChildren={<IoMdMoon />}
        checked={isDark}
        onChange={handleThemeToggle} // Antd uses `onChange` for toggling
      />
    </Space>
  );
};

export default App;
