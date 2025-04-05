import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://rentflow-l80j.onrender.com/properties";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    _id: null,
    title: "",
    description: "",
    price: "",
    images: [],
    imageFiles: [],
    size: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(API_URL);
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProperty({
      _id: null,
      title: "",
      description: "",
      price: "",
      images: [],
      imageFiles: [],
      size: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
    });
    setShowModal(true);
  };

  const openEditModal = (property) => {
    setIsEditing(true);
    setCurrentProperty({ ...property, imageFiles: [] });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCurrentProperty((prev) => ({ ...prev, imageFiles: [...e.target.files] }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      Object.keys(currentProperty).forEach((key) => {
        if (key === "imageFiles") {
          currentProperty.imageFiles.forEach((file) => formData.append("images", file));
        } else if (key !== "_id") {
          formData.append(key, currentProperty[key]);
        }
      });

      if (isEditing) {
        await axios.put(`${API_URL}/${currentProperty._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchProperties();
      closeModal();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(properties.filter((prop) => prop._id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Property Management</h2>
      <button onClick={openAddModal} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        Add Property
      </button>

       <Link
                        to="/userproperties"
                        className="mt-4 inline-block ml-2 bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700"
                      >
                        View Details
                      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p>{property.description}</p>
            <p><strong>Price:</strong> GHS {property.price}</p>
            <p><strong>Size:</strong> {property.size} sqft</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <div className="flex gap-2 mt-2">
              {property.images.map((img, index) => (
                <img key={index} src={img} alt="property" className="w-16 h-16 object-cover" />
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => openEditModal(property)} className="px-3 py-1 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(property._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Property" : "Add Property"}</h3>
            <input
              type="text"
              name="title"
              value={currentProperty.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              value={currentProperty.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="price"
              value={currentProperty.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="size"
              value={currentProperty.size}
              onChange={handleInputChange}
              placeholder="Size (sqft)"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="location"
              value={currentProperty.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="bedrooms"
              value={currentProperty.bedrooms}
              onChange={handleInputChange}
              placeholder="Bedrooms"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="bathrooms"
              value={currentProperty.bathrooms}
              onChange={handleInputChange}
              placeholder="Bathrooms"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border rounded mb-2"
              accept="image/*"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
