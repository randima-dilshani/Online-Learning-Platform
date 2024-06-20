import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/images/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const loginData = {
      email,
      password,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", loginData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        // Store user information including user ID
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
        alert("Login Successful");
        const userRole = response.data.user.role;
        console.log(`User role: ${userRole}`);
        if (userRole === "admin") {
          window.location.href = "/admindashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Password or Email is incorrect.");
    }
  
    resetForm();
  };
  
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl h-[550px] bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-violet-50 text-center hidden md:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src={LoginImage} alt="login" width={"500px"} draggable={false} />
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">Sign In</h1>
              <p className="text-[12px] text-gray-500 mt-4">
                Hey there! Sign in and start managing your system
              </p>
            </div>
            <div className="w-full flex-1 mt-12">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs flex flex-col gap-4">
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500 text-xs">{error}</div>}
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don&apos;t have an account? &nbsp;
                  <Link to="/signup">
                    <span className="text-blue-900 font-semibold">Sign Up</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
