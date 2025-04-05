import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5002/properties"; // Adjust if needed

const PropertyDetail = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
  const fetchProperty = async () => {
    console.log("Property ID:", id); // Log the ID to verify it's correct
    if (!id) {
      console.error("No property ID found in URL!");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setProperty(res.data);
      setSelectedImage(Array.isArray(res.data.images) ? res.data.images[0] : res.data.images);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  fetchProperty();
}, [id]);


  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded mb-4">
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div>
          <img src={selectedImage} alt="Property" className="rounded-lg shadow-md object-cover w-full h-80" />
          <div className="flex mt-2 space-x-2 overflow-x-auto">
            {Array.isArray(property.images) &&
              property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className={`w-20 h-20 rounded cursor-pointer border ${selectedImage === img ? "border-blue-500" : ""}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Property Information */}
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="mt-2 text-gray-600">{property.description}</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">GHS {property.price}</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Property Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Size: {property.size} sqft</li>
              <li>Location: {property.location}</li>
              <li>Bedrooms: {property.bedrooms}</li>
              <li>Bathrooms: {property.bathrooms}</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
          <button 
            onClick={() => navigate(`/payment/${property._id}`)}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 mb-4"
          >
            Make Payment
          </button>
          <button 
            onClick={() => navigate("/contact-agent")} // Replace with your actual contact route
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
      +233 555555555
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
