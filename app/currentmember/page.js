"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Shimmer from "@/components/Shimmer";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const CurrentMembers = () => {
  const [currentmemberDataa, setcurrentMemberDataa] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerpage] = useState(8);
  const [loading, setloading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const res = await fetch("https://backend-three-hazel-38.vercel.app/api/getmember");
        const { data } = await res.json();
        setTimeout(() => {
          setloading(false);
          setcurrentMemberDataa(data);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = currentmemberDataa.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemPerpage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemPerpage);

  const handleModalOpen = (type, item) => {
    setCurrentItem(item);
    setType(type);
  };

  const handleModalClose = () => {
    setCurrentItem(null);
    setType(null);
  };

  return (
    <Layout>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="overflow-x-auto p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <input
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              className="w-full sm:w-1/2 rounded-lg border-2 p-2 dark:bg-darkbackground dark:border-white dark:text-white"
              placeholder="Search..."
            />
          </div>

          <div className="w-full overflow-hidden rounded-lg shadow-md">
            <table className="w-full bg-blue-100 dark:bg-darkbackground">
              <thead className="bg-blue-200 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Number</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Position</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item._id} className="border-b border-gray-300 dark:border-gray-600">
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">{item.number}</td>
                      <td className="py-3 px-4">{item.status}</td>
                      <td className="py-3 px-4">{item.position}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="text-green-600" onClick={() => handleModalOpen("view", item)}>
                          <FaEye />
                        </button>
                        <button className="text-blue-600" onClick={() => handleModalOpen("edit", item)}>
                          <FaEdit />
                        </button>
                        <button className="text-red-600" onClick={() => handleModalOpen("delete", item)}>
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center sm:justify-between items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-red-400 py-2 px-6 rounded-lg shadow-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(filteredData.length / itemPerpage)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemPerpage)))}
              disabled={currentPage === Math.ceil(filteredData.length / itemPerpage)}
              className="bg-red-400 py-2 px-6 rounded-lg shadow-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CurrentMembers;
