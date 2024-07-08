import React, { useState } from "react";
import axios from "axios";

const Login  = () => {
    const [formData, setForm] = useState({
        email: "",
        password: ""
    });

    const [userData, setUserData] = useState(null); // State to hold user data after login

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/users/login", formData);
            console.log("Login successful!", response.data);

            // Update state with user data after successful login
            setUserData(response.data);

            // Optionally, handle successful login (e.g., redirect to another page)
        } catch (error) {
            console.error("Error logging in:", error);
            // Optionally, handle error (e.g., display error message to user)
        }
    };

    return (
        <div>
            <form className="max-w-sm mx-auto py-5" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>

            {/* Display user data after successful login */}
            {userData && (
                <div>
                    <h2>Welcome, {userData.name}!</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Login;
