import { signInUser } from '../../../api/api_config';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signInUser(formData);

      // Store tokens and username in localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('username', formData.username);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'Server error during login.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md text-sm transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 text-xs">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-700 hover:underline font-medium">
            Sign up
          </Link>
        </div>

        <div className="mt-2 text-center text-gray-500 text-xs hover:underline cursor-pointer">
          Forgot password?
        </div>
      </div>
    </div>
  );
};

export default SignIn;