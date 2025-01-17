import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { toast } from "react-toastify";
function Form() {
  const [loader, setLoader] = useState(false);
  const [inputData, setInputData] = useState({
    id: uuid4(),
    name: "",
    email: "",
    number: "",
    status:"",
    position: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    number: "",
  });

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!inputData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Number validation

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation as user types
    if (name === "number" && value.length > 10) {
      setErrors({ ...errors, number: "Phone number cannot exceed 10 digits." });
    }
    else if(name ===  "number" && value.length<10){
      setErrors({...errors,number:"provide 10 digit number"})
    }
     else {
      setErrors({ ...errors, [name]: "" });
    }

    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      console.log("Sending data to backend:", inputData);

      const response = await fetch("https://backend-three-hazel-38.vercel.app/api/new-collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
       toast.success("Member created successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
              });
      setInputData({ id: uuid4(), name: "", email: "", number: "",status:"", position: "" });
    } catch (error) {
      console.log("Error occurred:", error.message);
      alert("Email already registered. Please try with another one.");
    }
  };

  const handleClick = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 border border-gray-300 dark:bg-darkbackground bg-blue-50 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputData.name}
            onChange={handleChange}
            className="w-full  p-2 border  border-gray-300 rounded-lg"
            placeholder="Enter your name"
            
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-semibold">
            Number
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            value={inputData.number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your phone number"
           
          />
          {errors.number && <span className="text-red-500 text-sm">{errors.number}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-semibold">
            Status
          </label>
          <input
            
            id="status"
            name="status"
            value={inputData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Status"
           
          />
         
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-semibold">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={inputData.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your position"
           
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            onClick={handleClick}
            className="w-full py-2 px-4 bg-red-400 dark:bg-blue-500 text-white rounded-lg "
          >
            {!loader ? (
              "Submit"
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="ml-[50%] w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
