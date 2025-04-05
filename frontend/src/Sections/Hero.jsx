import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RightPanel from "../components/RightPanel.jsx";
import Dashboard from "../components/admin-Dashboard.jsx";
import Dashboadimage from "../assets/house1.jpg";

const Hero = () => {
  return (
    <header className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            The Best Way to Manage <span className="text-blue-500">Rental Properties</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Streamline your rental business with automation, insights, and secure payments.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/authenticate"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              to="/pricing"
              className="border border-gray-300 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right Section (Image in the Hero) */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={Dashboadimage}
            alt="Platform Dashboard"
            className="rounded-xl shadow-xl w-full max-w-3xl"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
