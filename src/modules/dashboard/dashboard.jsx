import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../api/api_config'; // update path if needed
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        if (err.message.toLowerCase().includes('jwt')) {
          navigate('/signin');
        }
      }
    };

    loadUsers();
  }, [navigate]);

  // signout functionality

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken'); // optional
    localStorage.removeItem('user'); // optional
    navigate('/signin');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="p-3 bg-gray-100 rounded shadow">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
