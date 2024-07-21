// src/components/PropertiesPage.jsx
import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const PropertiesPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return navigate('/login');

        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Properties</h2>
        <ul>
          <li className="mb-2">
            <Link to="add" className="hover:underline">Add New Property</Link>
          </li>
          <li>
            <Link to="view" className="hover:underline">View Properties</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/profile')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Profile
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PropertiesPage;
