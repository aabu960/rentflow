import React, { useState, useEffect } from "react";
import axios from "axios";

const ADMIN_API_URL = "http://localhost:5002/properties/admin"; // Endpoint for admin to see all properties
const BASE_API_URL = "http://localhost:5002/properties"; // Base URL for property operations

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    _id: null,
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // Fetch all properties (for admin)
  const fetchProperties = async () => {
    try {
      // This endpoint should return all properties regardless of approval status
      const res = await axios.get(ADMIN_API_URL);
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties fixed: ", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Approve a property (if not approved)
  const handleApprove = async (id) => {
    try {
      await axios.put(`${BASE_API_URL}/${id}/approve`);
      fetchProperties();
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  // Delete a property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${BASE_API_URL}/${id}`);
        setProperties(properties.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  // Open modal for editing an existing property
  const openEditModal = (property) => {
    setIsEditing(true);
    setCurrentProperty(property);
    setShowModal(true);
  };

  // Close the modal and clear state
  const closeModal = () => {
    setShowModal(false);
    setCurrentProperty({
      _id: null,
      title: "",
      description: "",
      price: "",
      image: "",
    });
  };

  // Save updates to a property (admin edit)
  const handleSave = async () => {
    try {
      await axios.put(`${BASE_API_URL}/${currentProperty._id}`, {
        title: currentProperty.title,
        description: currentProperty.description,
        price: currentProperty.price,
        image: currentProperty.image,
      });
      fetchProperties();
      closeModal();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Property Management</h2>
      
      {/* Properties Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-4">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price (GHS)</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Approved</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-t hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-2">{property.title}</td>
                <td className="px-4 py-2">{property.description}</td>
                <td className="px-4 py-2">{property.price}</td>
                <td className="px-4 py-2">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{property.isApproved ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  {!property.isApproved && (
                    <button
                      onClick={() => handleApprove(property._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => openEditModal(property)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Property */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Property</h3>
            <div className="mb-2">
              <label className="block mb-1">Title:</label>
              <input
                type="text"
                name="title"
                value={currentProperty.title}
                onChange={(e) =>
                  setCurrentProperty({ ...currentProperty, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Description:</label>
              <textarea
                name="description"
                value={currentProperty.description}
                onChange={(e) =>
                  setCurrentProperty({ ...currentProperty, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter description"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Price (GHS):</label>
              <input
                type="number"
                name="price"
                value={currentProperty.price}
                onChange={(e) =>
                  setCurrentProperty({ ...currentProperty, price: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter price"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Image URL:</label>
              <input
                type="text"
                name="image"
                value={currentProperty.image}
                onChange={(e) =>
                  setCurrentProperty({ ...currentProperty, image: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
