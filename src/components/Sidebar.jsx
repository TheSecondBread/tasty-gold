import React, { useState } from "react";

function Sidebar() {
  const [isVisible, setVisible] = useState(false);

  const handleMenu = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button
        onClick={handleMenu}
        className={`fixed top-4 left-4 z-50 flex flex-col justify-between w-8 h-6 ${
          isVisible ? "text-white" : "text-black"
        }`}
      >
        {/* Hamburger Icon */}
        <div
          className={`w-full h-1 rounded transition-all duration-300 ${
            isVisible ? "bg-red-500 rotate-45 translate-y-2" : "bg-black"
          }`}
        ></div>
        <div
          className={`w-full h-1 rounded transition-all duration-300 ${
            isVisible ? "bg-white opacity-0" : "bg-black"
          }`}
        ></div>
        <div
          className={`w-full h-1 rounded transition-all duration-300 ${
            isVisible ? "bg-red-500 -rotate-45 -translate-y-2" : "bg-black"
          }`}
        ></div>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } h-screen w-[250px] shadow-2xl flex flex-col items-center laila-bold text-[20px] bg-[#ffedce] bg-opacity-90 gap-4 fixed top-0 left-0 transition-transform duration-300`}
      >
        <img src="goldfestoffer-original.png" alt="offer" className="mt-10" />
        <a href="/" className="cursor-pointer">
          Home
        </a>
        <a href="/winners-dashboard" className="cursor-pointer">
          Winners
        </a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms And Conditions</a>
      </div>
    </div>
  );
}

export default Sidebar;
