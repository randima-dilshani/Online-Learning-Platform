import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#f3f4f6]">
      {/* Background Image */}
      <div
        className="absolute inset-x-0 bottom-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/nibmsa/image/upload/v1717077569/wave_3_ijefzv.svg')",
          height: "40%", // Set height to 40% of the parent container
          width: "100%", // Set width to 100% of the parent container
          backgroundPosition: "bottom", // Position the background image at the bottom
        }}
      ></div>

      {/* Left Side Background Image */}
      <div
        className="absolute inset-y-0 left-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://your-left-side-image-url.com/left-side-image.jpg')",
          height: "100%", // Set height to 100% of the parent container
          width: "50%", // Set width to 50% of the parent container
          backgroundPosition: "left", // Position the background image at the left
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center px-5 py-12 lg:py-0 mt-20">
        <div className="w-full lg:max-w-lg flex flex-col items-center justify-center gap-5 md:gap-y-10">
          <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
            Manage all your tasks in one place!
          </span>
          <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-900 whitespace-nowrap">
            <span>Task</span>
            <span> Management</span>
          </p>
          <div className="w-full lg:max-w-lg flex flex-col gap-2 md:gap-y-10 text-gray-700 p-8">
            <p className="text-15">
              Task Manager helps you keep track of all your tasks in one place.
              With its intuitive interface and powerful features, you can easily
              manage your daily tasks, set deadlines, and stay organized. Plan,
              organize, and collaborate on any project with task management that
              can be customized for every need.
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative z-10 w-full lg:w-1/3 flex flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/nibmsa/image/upload/v1717078536/Landing_dnvmev.png"
          alt="Task Management"
          height="300%"
          width="280%"
          className="mb-5"
        />
        <Link to="/login">
          <button className="tracking-wide font-semibold bg-blue-900 text-gray-100 py-4 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
