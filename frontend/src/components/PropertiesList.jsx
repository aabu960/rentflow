import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5002/properties";

const Properties = () => {
  const [properties, setProperties] = useState([]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCurrentProperty((prev) => ({ ...prev, imageFiles: [...e.target.files] }));
  };

  const handleUpdate = async () => {
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

      await axios.put(`${API_URL}/${currentProperty._id}`, formData, { 
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } 
      });

      fetchProperties();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div>
      <h2>Properties</h2>
      {properties.map((property) => (
        <div key={property._id}>
          <h3>{property.title}</h3>
          <button onClick={() => setCurrentProperty(property)}>Edit</button>
        </div>
      ))}
      <input name="title" value={currentProperty.title} onChange={handleInputChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Properties;
