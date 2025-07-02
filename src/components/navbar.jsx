import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">LOGOBAKERY</div>
        <ul className="flex space-x-6 items-center">
          <li><a href="#" className="hover:text-gray-300">Services</a></li>
          <li><a href="#" className="hover:text-gray-300">Projects</a></li>
          <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li>
            <a href="#" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded-full transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
