// src/components/ManageProperty.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddRoomModal from './AddRoomModal';
import UpdateRoomModal from './UpdateRoomModal';

const ManageProperty = () => {
  const { propertyId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [roomToUpdate, setRoomToUpdate] = useState(null);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/rooms/property/${propertyId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const roomsData = await response.json();
        setRooms(roomsData);
      } else {
        console.error('Error fetching rooms');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [propertyId]);

  const handleDeleteRoom = async (roomId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setRooms(rooms.filter(room => room._id !== roomId));
      } else {
        console.error('Error deleting room');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateRoomClick = (room) => {
    setRoomToUpdate(room);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Property</h2>
      <button onClick={() => setShowAddModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Room
      </button>
      <ul>
        {rooms.map(room => (
          <li key={room._id} className="border-b py-2">
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <p>Floor Size: {room.floorSize} sqm</p>
            <p>Beds: {room.numberOfBeds}</p>
            <p>Amenities: {room.amenities.join(', ')}</p>
            <button 
              onClick={() => handleUpdateRoomClick(room)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mr-2"
            >
              Update Room
            </button>
            <button 
              onClick={() => handleDeleteRoom(room._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete Room
            </button>
          </li>
        ))}
      </ul>
      {showAddModal && <AddRoomModal propertyId={propertyId} onClose={() => { setShowAddModal(false); fetchRooms(); }} />}
      {showUpdateModal && roomToUpdate && <UpdateRoomModal room={roomToUpdate} onClose={() => { setShowUpdateModal(false); fetchRooms(); }} />}
    </div>
  );
};

export default ManageProperty;
