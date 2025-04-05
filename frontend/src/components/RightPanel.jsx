import React from "react";
import Dashboadimage from "../assets/dashboard-view.jpg";
import travel1 from "../assets/travel0.jpg";
import travel2 from "../assets/travel2.jpg";

const RightPanel = () => {
  const cards = [
    { signUp: 1, time: "10 min", img: Dashboadimage },
    { signIn: 2, time: "28 min", img: travel1 },
    { MakeBookings: 3, time: "35 min", img: travel2 },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-6 w-full h-full">
      {/* Hero Section Image */}
      <div className="flex justify-center items-center bg-gray-900 text-white py-20">
        <div className="flex flex-col items-center text-center">
          <img
            src={Dashboadimage}
            alt="Platform Dashboard"
            className="rounded-xl shadow-xl mb-6 w-full max-w-3xl"
          />
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Start managing your rentals with ease and efficiency. Our platform makes it simple to list, manage, and grow your business.
          </p>
          <a
            href="#pricing"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <img
                  src={card.img}
                  alt={`Step ${index + 1}`}
                  className="w-16 h-16 rounded-full mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                <p className="text-gray-600 mb-4">{card.time} to complete</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
