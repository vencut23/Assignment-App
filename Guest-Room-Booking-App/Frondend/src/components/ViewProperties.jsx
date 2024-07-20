// src/components/ViewProperties.jsx
import { useState, useEffect } from 'react';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProperties;
