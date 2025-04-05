const PropertyCard = ({ property }) => {
    return (
      <div className="border p-4 rounded-lg shadow-lg">
        <img src={property.image} alt="Property" className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-lg font-bold mt-2">{property.title}</h3>
        <p className="text-gray-600">Price: ${property.price}</p>
      </div>
    );
  };
  
  export default PropertyCard;
  