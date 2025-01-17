import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Shimmer from "./Shimmer";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";

const Table = ({ data, setCurrentPage, currentPage, totalPages, loading, fetchData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("select");
  const [currentItem, setCurrentItem] = useState(null);
  const [type, setType] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const toggleEvent = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleModalOpen = (type, item) => {
    setCurrentItem(item);
    setType(type);
    setEditedItem({ ...item });
  };

  const handleModalClose = () => {
    setCurrentItem(null);
    setType(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async () => {
    const id = currentItem._id.trim();
    try {
      const response = await fetch(`https://backend-three-hazel-38.vercel.app/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      if (response.ok){
        toast.success("Item updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        handleModalClose();
        fetchData();
      }
       
       else {
        console.error("Failed to update item:", response.status);
      }
    } catch (error) {
      console.error("Error while updating item:", error);
    }
  };

  const onDelete = async () => {
    const id = currentItem._id.trim();
    try {
      const response = await fetch(`https://backend-three-hazel-38.vercel.app/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Item Deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        handleModalClose();
        fetchData();
      } else {
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting item:", error);
    }
  };

  const filteredData = data.filter((item) => {
    const filterValue = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const filterValue2 = item.number.toLowerCase().includes(searchTerm.toLowerCase());
    const filterStatus =
      selectedValue === "select" ||
      item.status.toLowerCase() === selectedValue.toLowerCase();
    return (filterValue || filterValue2) && filterStatus;
  });

  return (
    <>
      {loading ? (
        <Shimmer />
      ) : (
        data.length > 0 && (
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-3/4 rounded-2xl border-2 p-2 my-4 dark:bg-darkbackground dark:border-white dark:text-white"
                placeholder="Search..."
              ></input>
              <div className="relative w-fit">
                <button
                  onClick={toggleEvent}
                  className="border px-4 py-2 dark:bg-darkbackground bg-blue-100 rounded-lg"
                >
                  {selectedValue}
                </button>
                {isOpen && (
                  <ul className="absolute top-12 right-1 z-10 bg-white dark:bg-darkbackground dark:border dark:border-white shadow-md">
                    <li
                      onClick={() => handleSelection("active")}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-50 dark:hover:text-black"
                    >
                      active
                    </li>
                    <li
                      onClick={() => handleSelection("inactive")}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-50 dark:hover:text-black"
                    >
                      Inactive
                    </li>
                  </ul>
                )}
              </div>
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
                {filteredData.map((item) => (
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
                ))}
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
                          value={editedItem.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Number:</label>
                        <input
                          name="number"
                          className="border px-2 py-1 w-full"
                          value={editedItem.number}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Status:</label>
                        <input
                          name="status"
                          className="border px-2 py-1 w-full"
                          value={editedItem.status}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-slate-700 block mb-2">Position:</label>
                        <input
                          name="position"
                          className="border px-2 py-1 w-full"
                          value={editedItem.position}
                          onChange={handleChange}
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
                        onClick={onDelete}
                        
                      >
                        Yes
                      </button>
                    )}
                    {type === "edit" && (
                      <button
                        className="text-black bg-red-400 py-2 px-4 rounded-md"
                        onClick={onSave}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-evenly items-center">
              <button
                className="bg-red-400 py-2 px-6 rounded-lg shadow-md dark:bg-slate-500"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
              >
                Previous
              </button>
              <span className="font-sans">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-red-400 py-2 px-6 rounded-lg shadow-md dark:bg-slate-500"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Table;
