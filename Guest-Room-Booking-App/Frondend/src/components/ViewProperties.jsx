// src/components/ViewProperties.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/properties', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const propertiesData = await response.json();
          setProperties(propertiesData);
        } else {
          console.error('Error fetching properties');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id} className="border-b py-2">
            <h3 className="text-lg font-semibold">{property.name}</h3>
            <p>{property.address}</p>
            <button 
              onClick={() => navigate(`/properties/manage/${property._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Manage Property
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProperties;
