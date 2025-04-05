import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5002/properties"; // Adjust if needed

const UserProperties = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(API_URL);
        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties by location
  useEffect(() => {
    let filtered = properties;
    if (searchLocation) {
      filtered = filtered.filter((prop) =>
        prop.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Sort properties based on the selected option
    if (sortOption === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "size") {
      filtered.sort((a, b) => a.size - b.size);
    }

    setFilteredProperties(filtered);
  }, [searchLocation, sortOption, properties]);

  return (
    <div className="container mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded mb-4">
        Back
      </button>

      {/* Search and Sorting */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        {/* Search by Location */}
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />

        {/* Sorting Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4 mt-4 md:mt-0"
        >
          <option value="">Sort By</option>
          <option value="price">Price (Low to High)</option>
          <option value="size">Size (Small to Large)</option>
        </select>
      </div>

      {/* Display Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={Array.isArray(property.images) ? property.images[0] : property.images}
                alt={property.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-blue-600">GHS {property.price}</p>
              <button
                onClick={() => navigate(`/property/${property.id}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No properties found</p>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
