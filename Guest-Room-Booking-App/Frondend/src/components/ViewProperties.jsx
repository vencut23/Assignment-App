// src/components/ViewProperties.jsx
import { useState, useEffect } from 'react';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [floorSize, setFloorSize] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [amenities, setAmenities] = useState('');
  const [photos, setPhotos] = useState('');
  
  // Fetch properties on component mount
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

  // Handle clicking the "Manage Property" button
  const handleManageClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  // Handle adding a room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/rooms/property/${selectedProperty._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: roomName,
          floorSize: parseFloat(floorSize),
          numberOfBeds: parseInt(numberOfBeds),
          amenities: amenities.split(',').map(amenity => amenity.trim()),
          photos: photos.split(',').map(photo => photo.trim())
        })
      });

      if (response.ok) {
        // Reset form fields and close modal
        setRoomName('');
        setFloorSize('');
        setNumberOfBeds('');
        setAmenities('');
        setPhotos('');
        setIsModalOpen(false);
        // Fetch updated properties list
        const updatedPropertiesResponse = await fetch('http://localhost:5000/api/properties', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (updatedPropertiesResponse.ok) {
          const updatedProperties = await updatedPropertiesResponse.json();
          setProperties(updatedProperties);
        }
      } else {
        console.error('Error adding room');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p>{property.address}</p>
            </div>
            <button
              onClick={() => handleManageClick(property)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Manage Property
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for managing property */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Manage Property: {selectedProperty.name}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Rooms:</h3>
              <ul>
                {selectedProperty.rooms.map(room => (
                  <li key={room._id} className="border-b py-2">
                    <h4 className="text-md font-semibold">{room.name}</h4>
                    <p>Floor Size: {room.floorSize} sq ft</p>
                    <p>Number of Beds: {room.numberOfBeds}</p>
                    <p>Amenities: {room.amenities.join(', ')}</p>
                    <p>Photos: {room.photos.join(', ')}</p>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleAddRoom} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Add New Room</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Floor Size</label>
                <input
                  type="number"
                  value={floorSize}
                  onChange={(e) => setFloorSize(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Beds</label>
                <input
                  type="number"
                  value={numberOfBeds}
                  onChange={(e) => setNumberOfBeds(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Photos (comma separated URLs)</label>
                <input
                  type="text"
                  value={photos}
                  onChange={(e) => setPhotos(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Room
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProperties;
