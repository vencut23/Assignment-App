// src/components/UserProfile.jsx
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Error fetching user data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
    </div>
  );
};

export default UserProfile;
