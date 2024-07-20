// src/components/AddNewProperty.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewProperty = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, address })
      });

      if (response.ok) {
        navigate('/properties/view');
      } else {
        console.error('Error adding property');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleAddProperty} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddNewProperty;
