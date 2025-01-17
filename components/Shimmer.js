import React from "react";

const Shimmer = () => {
  return (
    <div className="overflow-x-auto animate-pulse">
      {/* Input shimmer */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-3/4 h-10 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        <div className="w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Table shimmer */}
      <table className="w-full mx-auto shadow-md dark:shadow-none dark:rounded-lg bg-gray-300 dark:bg-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-600">
            {["Name", "Number", "Status", "Position"].map((header) => (
              <th key={header} className="py-2 px-4 text-left">
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 dark:border-gray-600"
              >
                {Array(4)
                  .fill(null)
                  .map((_, idx) => (
                    <td key={idx} className="py-4 px-4 text-left">
                      <div className="h-4 rounded-md w-2/3 bg-gray-200"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination shimmer */}
      <div className="mt-6 flex justify-evenly items-center">
        <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Shimmer;
