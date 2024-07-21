// src/components/UpdateRoomModal.jsx
import { useState } from 'react';

const UpdateRoomModal = ({ room, onClose }) => {
  const [name, setName] = useState(room.name);
  const [floorSize, setFloorSize] = useState(room.floorSize);
  const [numberOfBeds, setNumberOfBeds] = useState(room.numberOfBeds);
  const [amenities, setAmenities] = useState(room.amenities.join(', '));
  const [photos, setPhotos] = useState(room.photos.join(', '));

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/rooms/${room._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, floorSize, numberOfBeds, amenities: amenities.split(','), photos: photos.split(',') })
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Error updating room');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Room</h2>
        <form onSubmit={handleUpdateRoom}>
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
            <label className="block text-gray-700">Photos (comma separated)</label>
            <input
              type="text"
              value={photos}
              onChange={(e) => setPhotos(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update Room</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomModal;
