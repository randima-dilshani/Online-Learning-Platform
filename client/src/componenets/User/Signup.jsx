import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SignUpImage from "../../assets/images/signUp.png";

const SignUp = () => {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const [NIC, setNIC] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); 

    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPhonenumber("");
        setNIC("");
        setConfirmPassword("");
        setPassword("");
        setErrors(""); 
      };

      const sendData = async (e) => {
        e.preventDefault();
  
        setErrors("");
    
        if (password !== confirmPassword) {
          setErrors("Passwords do not match");
          return;
        }
    
        let user = {
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          NIC: NIC,
          password: password,
          role: "user", // Set default role to USER
        };
    
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/user/register",
            user
          );
    
          if (response && response.data) {
            alert("Registration Success");
            window.location.href = "/login";
          } else {
            setErrors("Registration failed. Please try again.");
          }
        } catch (err) {
          if (err.response && err.response.data) {
            setErrors(err.response.data.message);
          } else {
            setErrors("Registration failed. Please try again.");
          }
        }
    
        resetForm();
      };
    


  return (
    <>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl h-[550px] bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-violet-50 text-center hidden md:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <div className="flex justify-center items-center">
                <img
                  src={SignUpImage}
                  alt="login"
                  width={"500px"}
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign up
                </h1>
                <p className="text-[12px] text-gray-500 mt-4">
                  Hey enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-sm flex flex-col gap-4">
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                     {errors.userName && (
                      <div className="text-red-500 text-xs">
                        {errors.userName}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-xs">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="phonenumber"
                      placeholder="Enter your phone number"
                      id="phonenumber"
                      value={phoneNumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    {errors.phoneNumber && (
                      <div className="text-red-500 text-xs">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="NIC"
                      placeholder="Enter your NIC"
                      id="NIC"
                      value={NIC}
                      onChange={(e) => setNIC(e.target.value)}
                    />
                    {errors.NIC && (
                      <div className="text-red-500 text-xs">{errors.NIC}</div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Confirm password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors.confirmPassword && (
                        <div className="text-red-500 text-xs">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={sendData}
                  >
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account? &nbsp;
                    <Link to="/login">
                      <span className="text-blue-900 font-semibold">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
