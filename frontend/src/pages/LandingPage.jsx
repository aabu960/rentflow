import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import house2 from "../assets/house2.jpg";
import house3 from "../assets/house3.jpg";
import house4 from "../assets/h6.jpg";
import house5 from "../assets/h4.png";

import Pricing from "../components/landingpages/pricing.jsx";
import Hero from "../Sections/Hero.jsx";

export default function LandingPage() {
  const properties = [
    {
      id: 1,
      name: "Luxury Apartment",
      location: "Downtown, Cityville",
      price: "$1200/month",
      image: house2,
    },
    {
      id: 2,
      name: "Cozy Studio",
      location: "Suburb, Greenville",
      price: "$800/month",
      image:house3 ,
    },
    {
      id: 3,
      name: "Spacious Villa",
      location: "Beachside, Oceanview",
      price: "$2500/month",
      image: house4,
    },
    {
      id: 4,
      name: "Modern Loft",
      location: "Uptown, Metrocity",
      price: "$1800/month",
      image: house5, // New listing with new image
    },
    {
      id: 5,
      name: "Charming Cottage",
      location: "Countryside, Greenfield",
      price: "$950/month",
      image: house3, // New listing with new image
    },
    {
      id: 6,
      name: "Penthouse Suite",
      location: "Skyline, Cityview",
      price: "$3500/month",
      image: house5, // New listing with the same image for illustration
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      <Hero />

      {/* Property Listings Section */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Properties</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-lg font-bold text-blue-600">{property.price}</p>
                <Link
                  to="/userproperties"
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["List Property", "Manage Rentals", "Receive Payments"].map((step, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">Easily {step.toLowerCase()} with our integrated tools.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-6">Have questions? Reach out to us.</p>
          <form className="bg-white p-6 rounded-lg shadow-md">
            <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md mb-4" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md mb-4" />
            <textarea placeholder="Your Message" className="w-full p-3 border rounded-md mb-4" rows="4"></textarea>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} RentFlow. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/support" className="hover:underline">Support</Link>
            <Link to="/faq" className="hover:underline">FAQ</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Follow us on: <span className="font-bold">Facebook | Twitter | LinkedIn</span></p>
        </div>
      </footer>
    </div>
  );
}