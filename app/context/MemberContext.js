// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the Context
// const MemberContext = createContext();

// // Provider Component
// export const MemberProvider = ({ children }) => {
//   const [formData, setFormData] = useState(() => {
//     // Initialize state from localStorage
//     const savedData = localStorage.getItem("memberData");
//     return savedData ? JSON.parse(savedData) : { name: "", email: "", number: "", position: "" };
//   });

//   useEffect(() => {
//     // Sync state with localStorage
//     // localStorage.setItem("memberData", JSON.stringify(formData));
//   }, [formData]);
// console.log(formData)
//   return (
//     <MemberContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </MemberContext.Provider>
//   );
// };

// // Custom hook to use the MemberContext
// export const useMemberContext = () => useContext(MemberContext);
