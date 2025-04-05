import React, { useState } from 'react';

const PropertyDetail = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(
    Array.isArray(property?.images) ? property.images[0] : property?.images
  );

  return (
    <div className="container mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => window.history.back()}
        className="bg-gray-300 px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div>
          <img
            src={selectedImage}
            alt="Property"
            className="rounded-lg shadow-md object-cover w-full h-80"
          />
          <div className="flex mt-2 space-x-2 overflow-x-auto">
            {Array.isArray(property?.images) && property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`w-20 h-20 rounded cursor-pointer border ${selectedImage === img ? 'border-blue-500' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Property Information */}
        <div>
          <h1 className="text-3xl font-bold">{property?.title}</h1>
          <p className="mt-2 text-gray-600">{property?.description}</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">GHS {property?.price}</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Property Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Size: {property?.size} sqft</li>
              <li>Location: {property?.location}</li>
              <li>Bedrooms: {property?.bedrooms}</li>
              <li>Bathrooms: {property?.bathrooms}</li>
            </ul>
          </div>
          
          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700">
              Buy Now
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;