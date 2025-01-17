"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "@/components/Layout";


const RequestMember = () => {
  const [memberDataa, setMemberDataa] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://backend-three-hazel-38.vercel.app/api/newcollection");
      const { data } = await res.json();
      setMemberDataa(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 



const handlereject = async (event, id) => {
  event.preventDefault();
  try {
    const response = await fetch(`https://backend-three-hazel-38.vercel.app/api/newcollection/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Member Rejected successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      
      setMemberDataa((prev) => prev.filter((item) => item._id !== id));
    } 
    
  } catch (error) {
    console.error("Error while rejecting the item:", error);
  }
};


const handleaccept = async (id) => {
  try {
    const member = memberDataa.find((item) => item._id === id); 

    if (!member) {
      console.error("Member not found");
      return;
    }

    const response = await fetch("https://backend-three-hazel-38.vercel.app/api/acceptedMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member), 
    });

    if (response.ok) {
      toast.success("Member Added  successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setMemberDataa((prev) => prev.filter((item) => item._id !== id));// Remove accepted item from the list
    } 
  } catch (error) {
    console.error("Error occurred while accepting the item:", error);
  }
};


  return (
    <Layout>
      <div className=" mx-auto p-4 border border-gray-300   rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Request Member Data</h2>
        <div className="grid grid-flow-row lg:grid-cols-3 sm:grid-cols-2 gap-12 mt-4 flex-wrap">
        {memberDataa?.length > 0 ? (
          memberDataa.map((item, index) => (
           
            <div key={index} className=" bg-blue-100 shadow-lg dark:bg-darkbackground   dark:border dark:rounded-lg  p-4">
              <h1>Name: {item.name}</h1>
              <h1 className="flex-wrap">Email: {item.email}</h1>
              <h1>Number: {item.number}</h1>
              <h1>Status: {item.status}</h1>
              <h1>Position: {item.position}</h1>
       
              <div className="flex items-center mt-3 justify-between">
                <button className="border rounded-sm dark:bg-red-600 bg-blue-200 py-2 px-4" onClick={(event)=>{handlereject(event,item._id),handleaccept(item._id)}}>accept</button>
                <button  className="border rounded-sm dark:bg-blue-500 bg-red-200 py-2 px-4" onClick={(event)=>handlereject(event,item._id)}>reject</button>
                </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
        </div>
      </div>
    </Layout>
  );
};

export default RequestMember;
