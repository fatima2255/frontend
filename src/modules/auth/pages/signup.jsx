import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../../../api/api_config';


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await signUpUser(formData);
      setFormData({ firstName: '', lastName: '', email: '', username: '', password: '' });
      navigate('/signin');
    } catch (error) {
      setErrorMsg(error.message || 'Server error during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an account</h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                placeholder="Enter your first name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              placeholder="Choose a username"
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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md text-sm transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 text-xs">
          Already have an account?{' '}
          <Link to="/signin" className="text-purple-700 hover:underline font-medium">
            Sign in
          </Link>
        </div>

        <div className="mt-2 text-center text-gray-500 text-xs hover:underline cursor-pointer">
          Forgot password?
        </div>
      </div>
    </div>
  );
};

export default SignUp;