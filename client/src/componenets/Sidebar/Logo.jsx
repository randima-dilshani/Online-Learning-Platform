import React from "react";
import { MdOutlineAddTask } from "react-icons/md";

const Logo = () => {
  return (
    <div className="logo flex justify-center items-center">
      <h1 className="flex gap-1 items-center mt-2 mb-5">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-white ml-1">Admin Management</span>
      </h1>
    </div>
  );
};

export default Logo;
