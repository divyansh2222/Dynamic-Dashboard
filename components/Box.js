import React from 'react';

const datacompany = [
  {
    name: 'Employee',
    mern: 6,
    fluter: 3,
    ui: 2,
  },
  {
    name: 'Intern',
    mern: 6,
    fluter: 3,
    ui: 2,
  },
  {
    name: 'Upcoming interviews',
    mern: 6,
    fluter: 3,
    ui: 2,
  },
  {
    name: 'Upcoming interviews',
    mern: 6,
    fluter: 3,
    ui: 2,
  },
];

const Box = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-3">
      {datacompany.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 dark:bg-darkbackground border shadow-md rounded-lg p-4 flex flex-col items-start"
        >
          <h1 className="text-lg dark:text-white font-semibold text-gray-700 mb-2">{item.name}</h1>
          <h2 className="text-sm dark:text-white  text-gray-600">
            <span className="font-medium dark:text-white">MERN:</span> {item.mern}
          </h2>
          <h2 className="text-sm dark:text-white  text-gray-600">
            <span className="font-medium dark:text-white">Flutter:</span> {item.fluter}
          </h2>
          <h2 className="text-sm dark:text-white  text-gray-600">
            <span className="font-medium text-center dark:text-white">UI:</span> {item.ui}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Box;

