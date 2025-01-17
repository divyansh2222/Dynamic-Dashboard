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
  const [itemPerpage, setItemPerPage] = useState(8); // Number of items per page
  const [loading, setloading] = useState(false);

  const totalData = currentmemberDataa.length; // Total number of items
  const totalPage = Math.ceil(totalData / itemPerpage); // Total pages required
  const [currentItem, setCurrentItem] = useState(null);
  const [type, setType] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = currentmemberDataa.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemPerpage; // Starting index for the current page
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemPerpage
  );

  const handleModalOpen = (type, item) => {
    setCurrentItem(item);
    setType(type);
  };

  const handleModalClose = () => {
    setCurrentItem(null);
    setType(null);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://backend-three-hazel-38.vercel.app/api/updatemember/${currentItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentItem),
        }
      );

      if (response.ok) {
         toast.success("Member updated successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                });
        fetchData();
        handleModalClose();
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => { 
    console.log(currentItem._id)
    try {
      const response = await fetch(
        `https://backend-three-hazel-38.vercel.app/api/deleteMember/${currentItem._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Member Deleted successfully!", {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: true,
               });
        fetchData();
        handleModalClose();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Layout>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="overflow-x-auto relative">
          <div className="flex justify-between items-center">
            <input
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              className="w-3/4 rounded-2xl border-2 p-2 my-4 dark:bg-darkbackground dark:border-white dark:text-white"
              placeholder="Search..."
            />
          </div>

          <table className="w-full mx-auto shadow-md dark:shadow-none dark:rounded-lg bg-blue-100 dark:border dark:bg-darkbackground">
  <thead>
    <tr className="bg-blue-200 dark:bg-gray-700">
      <th scope="col" className="py-2 px-4 text-left">Name</th>
      <th scope="col" className="py-2 px-4 text-left">Number</th>
      <th scope="col" className="py-2 px-4 text-left">Status</th>
      <th scope="col" className="py-2 px-4 text-left">Position</th>
      <th scope="col" className="py-2 px-4 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedData.length > 0 ? (
      paginatedData.map((item) => (
        <tr key={item._id} className="border-b border-gray-300 dark:border-gray-600">
          <td className="py-4 px-4">{item.name}</td>
          <td className="py-4 px-4">{item.number}</td>
          <td className="py-4 px-4">{item.status}</td>
          <td className="py-4 px-4">{item.position}</td>
          <td className="py-4 px-4 flex items-center gap-4">
            <button className="text-green-600" onClick={() => handleModalOpen("view", item)}>
              <FaEye />
            </button>
            <button className="text-blue-600" onClick={() => handleModalOpen("edit", item)}>
              <FaEdit />
            </button>
            <button onClick={() => handleModalOpen("delete", item)}>
              <MdDelete className="text-red-600" />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="py-4 text-center text-gray-500">
          No data available.
        </td>
      </tr>
    )}
  </tbody>
</table>


          {type && currentItem && (
              <div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center">
                <div className="bg-blue-100 w-[400px] p-4 rounded-lg shadow-md">
                  {type === "view" && (
                    <>
                      <h1 className="text-black text-xl my-3 font-bold">View Details</h1>
                      <h3 className="text-slate-700">Name: {currentItem.name}</h3>
                      <h3 className="text-slate-700">Number: {currentItem.number}</h3>
                      <h3 className="text-slate-700">Status: {currentItem.status || "Active"}</h3>
                      <h3 className="text-slate-700">Position: {currentItem.position}</h3>
                    </>
                  )}
                  {type === "edit" && (
                    <>
                      <h1 className="text-black text-xl my-3 font-bold">Edit Details</h1>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Name:</label>
                        <input
                          name="name"
                          className="border px-2 py-1 w-full"
                          value={currentItem.name}
                          onChange={(e) =>
                        setCurrentItem({ ...currentItem, name: e.target.value })
                      }
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Number:</label>
                        <input
                          name="number"
                          className="border px-2 py-1 w-full"
                          value={currentItem.number}
                          onChange={(e) =>
                        setCurrentItem({ ...currentItem, number: e.target.value })
                      }
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Status:</label>
                        <input
                          name="status"
                          className="border px-2 py-1 w-full"
                          value={currentItem.status}
                          onChange={(e) =>
                        setCurrentItem({ ...currentItem, status: e.target.value })
                      }
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Position:</label>
                        <input
                          name="position"
                          className="border px-2 py-1 w-full"
                          value={currentItem.position}
                          onChange={(e) =>
                        setCurrentItem({ ...currentItem, position: e.target.value })
                      }
                        />
                      </div>
                    </>
                  )}
                  {type === "delete" && (
                    <>
                      <h1 className="text-black text-xl my-3 font-bold">Delete Details</h1>
                      <h2 className="text-black">Are you sure you want to delete this item?</h2>
                    </>
                  )}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="text-neutral-900 py-2 px-4 rounded-md bg-red-400"
                      onClick={handleModalClose}
                    >
                      {type === "delete" ? "No" : "Close"}
                    </button>
                    {type === "delete" && (
                      <button
                        className="text-white py-2 px-4 rounded-md bg-red-500"
                        onClick={handleDelete}
                      >
                        Yes
                      </button>
                    )}
                    {type === "edit" && (
                      <button
                        className="text-black bg-red-400 py-2 px-4 rounded-md"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Pagination */}
          <div className="mt-6 flex justify-evenly items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-red-400 py-2 px-6 rounded-lg shadow-md"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPage))
              }
              disabled={currentPage === totalPage}
              className="bg-red-400 py-2 px-6 rounded-lg shadow-md"
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
